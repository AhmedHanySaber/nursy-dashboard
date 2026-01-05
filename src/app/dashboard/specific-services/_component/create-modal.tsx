"use client"

import queryKeys from "@/lib/query-keys"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { handleError, showResponse } from "@/lib/helpers"
import { specificServiceSchema } from "@/schema/models"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Plus } from "lucide-react"
import { CheckboxField, TextField, TextareaField } from "@/components/common/form/form"
import { createSpecificService } from "../_helpers/actions"
import { SearchableData } from "@/components/common/form/searchable-data"
import { useServices } from "../../services/_helpers/hooks"

type TMut = {
  data: z.infer<typeof specificServiceSchema.create>
  file?: File
}

export const CreateSpecificServiceModal = () => {
  const [open, setOpen] = useState(false)
  const [searchServices, setSearchServices] = useState("")

  const { services, isServicesError, isServicesLoading, isServicesRefetching, servicesError } = useServices({ search: searchServices })

  const form = useForm({
    resolver: zodResolver(specificServiceSchema.create)
  })

  const qc = useQueryClient()

  const mutation = useMutation({
    mutationFn: ({ data }: TMut) => createSpecificService(data),
    onSuccess: (data) =>
      showResponse(data, () => {
        if (data.status > 299) return
        qc.invalidateQueries({ queryKey: queryKeys.specificServices.index() })
        form.reset()
        setOpen(false)
      }),
    onError: (error: Error) => handleError(error)
  })

  const handleAction = (data: z.infer<typeof specificServiceSchema.create>) => {
    mutation.mutate({
      data
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button icon={Plus}>Create Specific Service</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new Specific Service</DialogTitle>
          <DialogDescription>Create Specific Service that will be displayed to users</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleAction)} className='space-y-4'>
            <TextField name='name' label='Name' control={form.control} />
            <TextField name='price' label='price' control={form.control} type='number' />
            <TextareaField name='description' label='Description' control={form.control} />
            {!services?.data ? (
              <p className='text-sm text-muted-foreground'>Loading services...</p>
            ) : (
              <SearchableData
                label='Service'
                formItem='serviceId'
                form={form}
                search={searchServices}
                setSearch={setSearchServices}
                loading={isServicesLoading || isServicesRefetching}
                error={form.formState.errors?.serviceId?.message}
                data={services?.data.map((item) => ({
                  id: item.id,
                  label: item.name
                }))}
              />
            )}
            <CheckboxField name='status' label='Active' control={form.control} />
            <Button loading={mutation.isPending}>Create</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
