"use client"

import queryKeys from "@/lib/query-keys"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useServices } from "../../services/_helpers/hooks"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { handleError, showResponse } from "@/lib/helpers"
import { illnessTypeSchema } from "@/schema/models"
import { updateIllnessType } from "../_helpers/actions"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CheckboxField, TextField, TextareaField } from "@/components/common/form/form"
import { IllnessType, SpecificService } from "@/types/models"
import { SearchableData } from "@/components/common/form/searchable-data"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Edit } from "lucide-react"

type TMut = {
  data: z.infer<typeof illnessTypeSchema.create>
}

export const UpdateIllnessTypeModal = ({ illness }: { illness: IllnessType }) => {
  const [open, setOpen] = useState(false)

  const qc = useQueryClient()
  const form = useForm({
    resolver: zodResolver(illnessTypeSchema.create),
    defaultValues: illness
  })

  const mutation = useMutation({
    mutationFn: ({ data }: TMut) => updateIllnessType(illness.id, data),
    onSuccess: (data) =>
      showResponse(data, () => {
        if (data.status > 299) return
        qc.invalidateQueries({ queryKey: queryKeys.illnessTypes.index() })
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
        <Button icon={Edit} variant='outline' size='icon' />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Illness Type Detials</DialogTitle>
          <DialogDescription>You can update name, description of this illness.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleAction)} className='space-y-4'>
            <TextField name='name' label='Name' control={form.control} />
            <TextareaField name='description' label='Description' control={form.control} />

            <Button loading={mutation.isPending}>Update</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
