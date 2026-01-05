"use client"

import { useUserOrders } from "../../../_helpers/hooks"

import { UserOrdersColumns } from "./columns"
import { SimplePagination } from "@/components/common/simple-pagination"
import { TableSkeleton } from "@/components/common/skeletons/table"
import { DisplayError } from "@/components/common/error"
import { DataTable } from "@/components/common/data-table"
import { TObject } from "@/types/default"

type Props = {
  userId: number
  searchParams: TObject
}

export const UserOrdersTable = ({ userId, searchParams }: Props) => {
  const { userOrders, isUserOrdersError, isUserOrdersLoading, userOrdersError } = useUserOrders(userId, searchParams)

  if (isUserOrdersLoading) return <TableSkeleton />
  if (isUserOrdersError) return <DisplayError error={userOrdersError} />
  if (!userOrders) return <p>No admins found.</p>

  return (
    <div>
      <DataTable columns={UserOrdersColumns} data={userOrders?.data} />
      <SimplePagination hasNextPage={userOrders?.pagination?.hasNextPage} hasPrevPage={userOrders?.pagination?.hasPrevPage} />
    </div>
  )
}
