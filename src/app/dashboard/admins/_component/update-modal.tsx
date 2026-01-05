"use client"

import queryKeys from "@/lib/query-keys"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { handleError, showResponse } from "@/lib/helpers"
import { adminSchemas } from "@/schema/models"
import { updateAdmin } from "../_helpers/actions"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { TextField } from "@/components/common/form/form"
import { Button } from "@/components/ui/button"
import { Admin } from "@/types/models"
import { Form } from "@/components/ui/form"
import { Edit, Plus } from "lucide-react"

type TMut = {
  data: z.infer<typeof adminSchemas.update>
}

export const UpdateAdminModal = ({ admin }: { admin: Admin }) => {
  const [open, setOpen] = useState(false)

  const qc = useQueryClient()

  const form = useForm({
    resolver: zodResolver(adminSchemas.update),
    defaultValues: {
      username: admin.username,
      email: admin.email
    }
  })

  const mutation = useMutation({
    mutationFn: ({ data }: TMut) => updateAdmin(admin.id, data),
    onSuccess: (data) =>
      showResponse(data, () => {
        if (data.status > 299) return
        qc.invalidateQueries({ queryKey: queryKeys.admins.index() })
        setOpen(false)
      }),
    onError: (error: Error) => handleError(error)
  })

  const handleAction = (data: z.infer<typeof adminSchemas.update>) => {
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
          <DialogTitle>Update Admin Details</DialogTitle>
          <DialogDescription>You can update admins by changing their email or username only.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleAction)} className='space-y-4'>
            <TextField name='username' label='Username' control={form.control} />
            <TextField name='email' label='E-mail Address' control={form.control} type='email' />
            <Button loading={mutation.isPending}>Save Admin</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
