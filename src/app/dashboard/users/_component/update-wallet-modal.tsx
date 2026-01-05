"use client"

import queryKeys from "@/lib/query-keys"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { handleError, showResponse } from "@/lib/helpers"
import { updateNurseWallet } from "../_helpers/actions"
import { walletSchema } from "@/schema/models"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { SelectField, TextField, TextareaField } from "@/components/common/form/form"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { DollarSign, Plus } from "lucide-react"

type TMut = {
  data: z.infer<typeof walletSchema.create>
  file?: File
}

export const UpdateUserWallet = ({ userId }: { userId: number }) => {
  const [open, setOpen] = useState(false)

  const form = useForm({
    resolver: zodResolver(walletSchema.create)
  })

  const qc = useQueryClient()

  const mutation = useMutation({
    mutationFn: ({ data }: TMut) => updateNurseWallet(userId, data),
    onSuccess: (data) =>
      showResponse(data, () => {
        if (data.status > 299) return
        qc.invalidateQueries({ queryKey: queryKeys.users.index() })
        qc.invalidateQueries({ queryKey: queryKeys.users.userWalletHistory(userId) })
        qc.invalidateQueries({ queryKey: queryKeys.users.userWallet(userId) })
        form.reset()
        setOpen(false)
      }),
    onError: (error: Error) => handleError(error)
  })

  const handleAction = (data: z.infer<typeof walletSchema.create>) => {
    mutation.mutate({
      data
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button icon={DollarSign}>Update Wallet</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add credits or debit to a nurse</DialogTitle>
          <DialogDescription>You can control nurse's wallet from here.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleAction)} className='space-y-4'>
            <TextField name='amount' label='Amount' type='number' control={form.control} />
            <TextareaField name='description' label='Notes' control={form.control} />
            <SelectField
              name='type'
              label='Type'
              control={form.control}
              options={[
                { label: "Credit", value: "Credit" },
                { label: "Debit", value: "Debit" }
              ]}
            />
            <Button loading={mutation.isPending}>Save</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
