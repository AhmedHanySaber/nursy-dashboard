"use client"

import { useAdmins } from "../_helpers/hooks"

import { SimplePagination } from "@/components/common/simple-pagination"
import { TableSkeleton } from "@/components/common/skeletons/table"
import { AdminColumns } from "./columns"
import { DisplayError } from "@/components/common/error"
import { DataTable } from "@/components/common/data-table"
import { TObject } from "@/types/default"

type Props = {
  searchParams: TObject
}

export const AdminsTable = ({ searchParams }: Props) => {
  const { admins, isAdminsError, isAdminsLoading, adminsError } = useAdmins(searchParams)

  if (isAdminsLoading) return <TableSkeleton />
  if (isAdminsError) return <DisplayError error={adminsError} />
  if (!admins) return <p>No admins found.</p>

  return (
    <div>
      <DataTable columns={AdminColumns} data={admins?.data} />
      <SimplePagination hasNextPage={admins?.pagination.hasNextPage} hasPrevPage={admins?.pagination.hasPrevPage} />
    </div>
  )
}
