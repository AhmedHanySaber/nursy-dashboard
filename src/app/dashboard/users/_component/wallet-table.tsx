"use client"

import { useNurseWalletHistory } from "../_helpers/hooks"

import { SimplePagination } from "@/components/common/simple-pagination"
import { TableSkeleton } from "@/components/common/skeletons/table"
import { DisplayError } from "@/components/common/error"
import { DataTable } from "@/components/common/data-table"
import { TObject } from "@/types/default"
import { WalletHistoryColumns } from "./wallet-columns"

type Props = {
  userId: number
  searchParams: TObject
}

export const WalletHistoryTable = ({ userId, searchParams }: Props) => {
  const { walletHistory, isWalletHistoryError, isWalletHistoryLoading, walletHistoryError } = useNurseWalletHistory(userId, searchParams)

  if (isWalletHistoryLoading) return <TableSkeleton />
  if (isWalletHistoryError) return <DisplayError error={walletHistoryError} />
  if (!walletHistory) return <p>No admins found.</p>

  return (
    <div>
      <DataTable columns={WalletHistoryColumns} data={walletHistory?.data} />
      <SimplePagination hasNextPage={walletHistory?.pagination.hasNextPage} hasPrevPage={walletHistory?.pagination.hasPrevPage} />
    </div>
  )
}
