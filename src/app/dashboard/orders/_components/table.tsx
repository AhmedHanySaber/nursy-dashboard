"use client"

import { useOrders } from "../_helpers/hooks"

import { OrdersColumns } from "./columns"
import { SimplePagination } from "@/components/common/simple-pagination"
import { TableSkeleton } from "@/components/common/skeletons/table"
import { DisplayError } from "@/components/common/error"
import { DataTable } from "@/components/common/data-table"
import { TObject } from "@/types/default"

type Props = {
  searchParams: TObject
}

export const OrdersTable = ({ searchParams }: Props) => {
  const { orders, isOrdersError, isOrdersLoading, ordersError } = useOrders(searchParams)

  if (isOrdersLoading) return <TableSkeleton />
  if (isOrdersError) return <DisplayError error={ordersError} />
  if (!orders) return <p>No admins found.</p>

  return (
    <div>
      <DataTable columns={OrdersColumns} data={orders?.data} />
      <SimplePagination hasNextPage={orders?.pagination?.hasNextPage} hasPrevPage={orders?.pagination?.hasPrevPage} />
    </div>
  )
}
