"use client"

import queryKeys from "@/lib/query-keys"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { handleError, showResponse } from "@/lib/helpers"
import { createIllnessType } from "../_helpers/actions"
import { illnessTypeSchema } from "@/schema/models"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Plus } from "lucide-react"
import { TextField, TextareaField } from "@/components/common/form/form"

type TMut = {
  data: z.infer<typeof illnessTypeSchema.create>
  file?: File
}

export const CreateIllnessTypeModal = () => {
  const [open, setOpen] = useState(false)

  const form = useForm({
    resolver: zodResolver(illnessTypeSchema.create)
  })

  const qc = useQueryClient()

  const mutation = useMutation({
    mutationFn: ({ data }: TMut) => createIllnessType(data),
    onSuccess: (data) =>
      showResponse(data, () => {
        if (data.status > 299) return
        qc.invalidateQueries({ queryKey: queryKeys.illnessTypes.index() })
        form.reset()
        setOpen(false)
      }),
    onError: (error: Error) => handleError(error)
  })

  const handleAction = (data: z.infer<typeof illnessTypeSchema.create>) => {
    mutation.mutate({
      data
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button icon={Plus}>Create Illness Type</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new Illness Type</DialogTitle>
          <DialogDescription>Create Illness Type that will be displayed to users</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleAction)} className='space-y-4'>
            <TextField name='name' label='Name' control={form.control} />
            <TextareaField name='description' label='Description' control={form.control} />

            <Button loading={mutation.isPending}>Create</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
