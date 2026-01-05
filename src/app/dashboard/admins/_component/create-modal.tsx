"use client"

import queryKeys from "@/lib/query-keys"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { handleError, showResponse } from "@/lib/helpers"
import { createAdmin } from "../_helpers/actions"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { adminSchemas } from "@/schema/models"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Plus } from "lucide-react"
import { PasswordField, TextField } from "@/components/common/form/form"

type TMut = {
  data: z.infer<typeof adminSchemas.create>
  file?: File
}

export const CreateAdminModal = () => {
  const [open, setOpen] = useState(false)

  const form = useForm({
    resolver: zodResolver(adminSchemas.create)
  })

  const qc = useQueryClient()

  const mutation = useMutation({
    mutationFn: ({ data }: TMut) => createAdmin(data),
    onSuccess: (data) =>
      showResponse(data, () => {
        if (data.status > 299) return
        qc.invalidateQueries({ queryKey: queryKeys.admins.index() })
        form.reset()
        setOpen(false)
      }),
    onError: (error: Error) => handleError(error)
  })

  const handleAction = (data: z.infer<typeof adminSchemas.create>) => {
    mutation.mutate({
      data
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button icon={Plus}>Create Admin</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new Admin</DialogTitle>
          <DialogDescription>Create admin that can open dashboard and interacts with available actions</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleAction)} className='space-y-4'>
            <TextField name='username' label='Username' control={form.control} />
            <TextField name='email' label='E-mail Address' control={form.control} type='email' />
            <PasswordField name='password' label='Password' control={form.control} />
            <Button loading={mutation.isPending}>Create Admin</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
