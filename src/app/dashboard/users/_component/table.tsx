"use client"

import { useUsers } from "../_helpers/hooks"

import { SimplePagination } from "@/components/common/simple-pagination"
import { TableSkeleton } from "@/components/common/skeletons/table"
import { UserColumns } from "./columns"
import { DisplayError } from "@/components/common/error"
import { DataTable } from "@/components/common/data-table"
import { TObject } from "@/types/default"

type Props = {
  searchParams: TObject
}

export const UsersTable = ({ searchParams }: Props) => {
  const { users, isUsersError, isUsersLoading, usersError } = useUsers(searchParams)

  if (isUsersLoading) return <TableSkeleton />
  if (isUsersError) return <DisplayError error={usersError} />
  if (!users) return <p>No admins found.</p>

  return (
    <div>
      <DataTable columns={UserColumns} data={users?.data} />
      <SimplePagination hasNextPage={users?.pagination.hasNextPage} hasPrevPage={users?.pagination.hasPrevPage} />
    </div>
  )
}
