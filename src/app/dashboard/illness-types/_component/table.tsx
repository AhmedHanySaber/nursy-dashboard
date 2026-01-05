"use client"

import { useIllnessTypes } from "../_helpers/hooks"

import { SimplePagination } from "@/components/common/simple-pagination"
import { TableSkeleton } from "@/components/common/skeletons/table"
import { IllnessTypeColumns } from "./columns"
import { DisplayError } from "@/components/common/error"
import { DataTable } from "@/components/common/data-table"
import { TObject } from "@/types/default"

type Props = {
  searchParams: TObject
}

export const IllnessTypesTable = ({ searchParams }: Props) => {
  const { illnessTypes, isIllnessTypesError, isIllnessTypesLoading, illnessTypesError } = useIllnessTypes(searchParams)

  if (isIllnessTypesLoading) return <TableSkeleton />
  if (isIllnessTypesError) return <DisplayError error={illnessTypesError} />
  if (!illnessTypes) return <p>No IllnessT ypes found.</p>

  return (
    <div>
      <DataTable columns={IllnessTypeColumns} data={illnessTypes?.data} />
      <SimplePagination hasNextPage={illnessTypes?.pagination.hasNextPage} hasPrevPage={illnessTypes?.pagination.hasPrevPage} />
    </div>
  )
}
