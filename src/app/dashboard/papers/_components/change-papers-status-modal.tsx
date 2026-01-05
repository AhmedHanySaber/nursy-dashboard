"use client"

import queryKeys from "@/lib/query-keys"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"

import { handleError, showResponse } from "@/lib/helpers"
import { changeNursePapersStatus } from "../_helpers/actions"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TUserDataStatus } from "@/types/default"
import { Edit, SaveIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

type Props = {
  status: TUserDataStatus
  userId: number
}

export const UpdatePapersModal = ({ userId, status }: Props) => {
  const [open, setOpen] = useState(false)
  const [newStatus, setNewStatus] = useState<TUserDataStatus>(status)

  const qc = useQueryClient()

  const mutation = useMutation({
    mutationFn: ({ status }: { status: TUserDataStatus }) => changeNursePapersStatus(userId, status),
    onSuccess: (data) =>
      showResponse(data, () => {
        if (data.status > 299) return
        qc.invalidateQueries({ queryKey: queryKeys.users.pending() })
        setOpen(false)
      }),
    onError: (error: Error) => handleError(error)
  })

  const handleAction = () => {
    mutation.mutate({
      status: newStatus
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button icon={Edit} size='icon' variant='indigo' />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Nurse Papers Status</DialogTitle>
          <DialogDescription>You can change nurse papers status so she can be able to continue use the application.</DialogDescription>
        </DialogHeader>

        <Select onValueChange={(value: TUserDataStatus) => setNewStatus(value)} defaultValue={status}>
          <SelectTrigger className='w-full'>
            <SelectValue placeholder='New Status' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='Approved'>Approved</SelectItem>
            <SelectItem value='Rejected'>Rejected</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={handleAction} loading={mutation.isPending} className='w-full' icon={SaveIcon}>
          Change Status
        </Button>
      </DialogContent>
    </Dialog>
  )
}
