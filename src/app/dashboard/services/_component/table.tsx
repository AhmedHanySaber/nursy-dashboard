"use client"

import { useServices } from "../_helpers/hooks"

import { SimplePagination } from "@/components/common/simple-pagination"
import { TableSkeleton } from "@/components/common/skeletons/table"
import { ServiceColumns } from "./columns"
import { DisplayError } from "@/components/common/error"
import { DataTable } from "@/components/common/data-table"
import { TObject } from "@/types/default"

type Props = {
  searchParams: TObject
}

export const ServicesTable = ({ searchParams }: Props) => {
  const { services, isServicesError, isServicesLoading, servicesError } = useServices(searchParams)

  if (isServicesLoading) return <TableSkeleton />
  if (isServicesError) return <DisplayError error={servicesError} />
  if (!services) return <p>No services found.</p>

  return (
    <div>
      <DataTable columns={ServiceColumns} data={services?.data} />
      <SimplePagination hasNextPage={services?.pagination.hasNextPage} hasPrevPage={services?.pagination.hasPrevPage} />
    </div>
  )
}
