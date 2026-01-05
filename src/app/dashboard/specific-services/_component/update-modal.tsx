"use client"

import queryKeys from "@/lib/query-keys"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useServices } from "../../services/_helpers/hooks"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { handleError, showResponse } from "@/lib/helpers"
import { specificServiceSchema } from "@/schema/models"
import { updateSpecificService } from "../_helpers/actions"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CheckboxField, TextField, TextareaField } from "@/components/common/form/form"
import { SpecificService } from "@/types/models"
import { SearchableData } from "@/components/common/form/searchable-data"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Edit } from "lucide-react"

type TMut = {
  data: z.infer<typeof specificServiceSchema.create>
}

export const UpdateSpecificServiceModal = ({ service }: { service: SpecificService }) => {
  const [open, setOpen] = useState(false)
  const [searchServices, setSearchServices] = useState("")

  const { services, isServicesError, isServicesLoading, isServicesRefetching, servicesError } = useServices({ search: searchServices })

  const qc = useQueryClient()
  const form = useForm({
    resolver: zodResolver(specificServiceSchema.create),
    defaultValues: service
  })

  const mutation = useMutation({
    mutationFn: ({ data }: TMut) => updateSpecificService(service.id, data),
    onSuccess: (data) =>
      showResponse(data, () => {
        if (data.status > 299) return
        qc.invalidateQueries({ queryKey: queryKeys.specificServices.index() })
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
        <Button icon={Edit} variant='outline' size='icon' />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Specific Service Detials</DialogTitle>
          <DialogDescription>You can update name, description and the pricing details of this service.</DialogDescription>
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
                defaultSelectedId={service.serviceId.toString()}
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
            <Button loading={mutation.isPending}>Update Specific Service</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
