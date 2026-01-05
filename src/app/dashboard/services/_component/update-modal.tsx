"use client"

import queryKeys from "@/lib/query-keys"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { handleError, showResponse } from "@/lib/helpers"
import { serviceSchema } from "@/schema/models"
import { updateService } from "../_helpers/actions"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CheckboxField, TextField, TextareaField } from "@/components/common/form/form"
import { Service } from "@/types/models"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Edit } from "lucide-react"

type TMut = {
  data: z.infer<typeof serviceSchema.create>
}

export const UpdateServiceModal = ({ service }: { service: Service }) => {
  const [open, setOpen] = useState(false)

  const qc = useQueryClient()
  const form = useForm({
    resolver: zodResolver(serviceSchema.create),
    defaultValues: service
  })

  const mutation = useMutation({
    mutationFn: ({ data }: TMut) => updateService(service.id, data),
    onSuccess: (data) =>
      showResponse(data, () => {
        if (data.status > 299) return
        qc.invalidateQueries({ queryKey: queryKeys.services.index() })
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
        <Button icon={Edit} variant='outline' size='icon' />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Service Detials</DialogTitle>
          <DialogDescription>You can update name, description and the pricing details of this service.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleAction)} className='space-y-4'>
            <TextField name='name' label='Name' control={form.control} />
            <TextField name='salary' label='Salary' control={form.control} type='number' />
            <TextField name='hourlyFees' label='Hourly Fees' control={form.control} type='number' />
            <TextareaField name='description' label='Description' control={form.control} />
            <CheckboxField name='status' label='Active' control={form.control} />
            <Button loading={mutation.isPending}>Update Service</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
