"use client"

import { useWallets } from "../_helpers/hooks"
import { TObject } from "@/types/default"
import { SimplePagination } from "@/components/common/simple-pagination"
import { TableSkeleton } from "@/components/common/skeletons/table"
import { DisplayError } from "@/components/common/error"
import { DataTable } from "@/components/common/data-table"
import { WalletColumns } from "./wallets-columns"

type Props = {
  searchParams: TObject
}

export const NurseWalletsTable = ({ searchParams }: Props) => {
  const { wallets, isWalletsLoading, isWalletsError, walletsError } = useWallets(searchParams)

  if (isWalletsLoading) return <TableSkeleton />
  if (isWalletsError) return <DisplayError error={walletsError} />
  if (!wallets?.data?.length) return <p>No nurse wallets found.</p>

  return (
    <div>
      <DataTable columns={WalletColumns} data={wallets.data} />
      <SimplePagination
        hasNextPage={wallets.pagination?.hasNextPage}
        hasPrevPage={wallets.pagination?.hasPrevPage}
      />
    </div>
  )
}
