"use client"

import queryKeys from "@/lib/query-keys"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { handleError, showResponse } from "@/lib/helpers"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { adminSchemas, serviceSchema } from "@/schema/models"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Plus } from "lucide-react"
import { CheckboxField, PasswordField, TextField, TextareaField } from "@/components/common/form/form"
import { createService } from "../_helpers/actions"

type TMut = {
  data: z.infer<typeof serviceSchema.create>
  file?: File
}

export const CreateServiceModal = () => {
  const [open, setOpen] = useState(false)

  const form = useForm({
    resolver: zodResolver(serviceSchema.create)
  })

  const qc = useQueryClient()

  const mutation = useMutation({
    mutationFn: ({ data }: TMut) => createService(data),
    onSuccess: (data) =>
      showResponse(data, () => {
        if (data.status > 299) return
        qc.invalidateQueries({ queryKey: queryKeys.services.index() })
        form.reset()
        setOpen(false)
      }),
    onError: (error: Error) => handleError(error)
  })

  const handleAction = (data: z.infer<typeof serviceSchema.create>) => {
    mutation.mutate({
      data
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button icon={Plus}>Create Service</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new service</DialogTitle>
          <DialogDescription>Create service that will be displayed to users</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleAction)} className='space-y-4'>
            <TextField name='name' label='Name' control={form.control} />
            <TextField name='salary' label='Salary' control={form.control} type='number' />
            <TextField name='hourlyFees' label='Hourly Fees' control={form.control} type='number' />
            <TextareaField name='description' label='Description' control={form.control} />
            <CheckboxField name='status' label='Active' control={form.control} />
            <Button loading={mutation.isPending}>Create Service</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
