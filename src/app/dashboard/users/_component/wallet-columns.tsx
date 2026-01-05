import { diffForHumans, formatToEGP } from "@/lib/helpers"

import { WalletHistory } from "@/types/models"
import { ColumnDef } from "@tanstack/react-table"

export const WalletHistoryColumns: ColumnDef<WalletHistory>[] = [
  {
    accessorKey: "id",
    header: "ID"
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => `${formatToEGP(row.getValue("amount"))}`
  },
  {
    accessorKey: "fromUser",
    header: "From User",
    cell: ({ row }) => (row.original?.fromUser ? `${row.original.fromUser.email} #${row.original.fromUser.id}` : "N/A")
  },
  {
    accessorKey: "byAdmin",
    header: "By Admin",
    cell: ({ row }) => (row.original?.byAdmin ? `${row.original.byAdmin.email} #${row.original.byAdmin.id}` : "N/A")
  },
  {
    accessorKey: "description",
    header: "Notes"
  },
  {
    accessorKey: "type",
    header: "Type"
  },
  {
    accessorKey: "createdAt",
    header: "Issued At",
    cell: ({ row }) => diffForHumans(row.getValue("createdAt"))
  }
]
