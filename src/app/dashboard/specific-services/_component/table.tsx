"use client"

import { useSpecificServices } from "../_helpers/hooks"

import { SimplePagination } from "@/components/common/simple-pagination"
import { TableSkeleton } from "@/components/common/skeletons/table"
import { SpecificServiceColumns } from "./columns"
import { DisplayError } from "@/components/common/error"
import { DataTable } from "@/components/common/data-table"
import { TObject } from "@/types/default"

type Props = {
  searchParams: TObject
}

export const SpecificServicesTable = ({ searchParams }: Props) => {
  const { specificServices, isSpecificServicesError, isSpecificServicesLoading, specificServicesError } = useSpecificServices(searchParams)

  if (isSpecificServicesLoading) return <TableSkeleton />
  if (isSpecificServicesError) return <DisplayError error={specificServicesError} />
  if (!specificServices) return <p>No services found.</p>

  return (
    <div>
      <DataTable columns={SpecificServiceColumns} data={specificServices?.data} />
      <SimplePagination hasNextPage={specificServices?.pagination.hasNextPage} hasPrevPage={specificServices?.pagination.hasPrevPage} />
    </div>
  )
}
