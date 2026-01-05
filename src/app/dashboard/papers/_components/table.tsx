"use client"

import { usePendingNurses } from "../_helpers/hooks"

import { PendingNursesColumns } from "./columns"
import { SimplePagination } from "@/components/common/simple-pagination"
import { TableSkeleton } from "@/components/common/skeletons/table"
import { DisplayError } from "@/components/common/error"
import { DataTable } from "@/components/common/data-table"
import { TObject } from "@/types/default"

type Props = {
  searchParams: TObject
}

export const PendingNursesTable = ({ searchParams }: Props) => {
  const { pendingNurses, isPendingNursesError, isPendingNursesLoading, pendingNursesError } = usePendingNurses(searchParams)

  if (isPendingNursesLoading) return <TableSkeleton />
  if (isPendingNursesError) return <DisplayError error={pendingNursesError} />
  if (!pendingNurses) return <p>No admins found.</p>

  return (
    <div>
      <DataTable columns={PendingNursesColumns} data={pendingNurses?.data} />
      <SimplePagination hasNextPage={pendingNurses?.pagination.hasNextPage} hasPrevPage={pendingNurses?.pagination.hasPrevPage} />
    </div>
  )
}
