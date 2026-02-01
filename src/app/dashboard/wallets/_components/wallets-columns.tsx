import { ColumnDef } from "@tanstack/react-table"
import { UserWallet, User } from "@/types/models"
import { formatToEGP } from "@/lib/helpers"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

export type WalletData = UserWallet & {
  user?: User
}

export const WalletColumns: ColumnDef<WalletData>[] = [
  {
    accessorKey: "user.username",
    header: "Nurse Name",
    cell: ({ row }) => {
      const user = row.original.user
      return <span className="font-medium">{user?.username || "N/A"}</span>
    }
  },
  {
    accessorKey: "user.email",
    header: "Email",
    cell: ({ row }) => {
      return <span>{row.original.user?.email || "N/A"}</span>
    }
  },
  {
    accessorKey: "balance",
    header: "Balance",
    cell: ({ row }) => {
      const balance = row.original.balance || 0
      return (
        <span className="font-semibold text-green-600">
          {formatToEGP(balance.toString())}
        </span>
      )
    }
  },
  {
    accessorKey: "debit",
    header: "Debit",
    cell: ({ row }) => {
      const debit = row.original.debit || 0
      return (
        <span className="font-semibold text-red-600">
          -{formatToEGP(debit.toString())}
        </span>
      )
    }
  },
  {
    accessorKey: "net",
    header: "Net Balance",
    cell: ({ row }) => {
      const net = (row.original.balance || 0) - (row.original.debit || 0)
      return (
        <span className={`font-bold ${net >= 0 ? "text-green-600" : "text-red-600"}`}>
          {formatToEGP(net.toString())}
        </span>
      )
    }
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const userId = row.original.userId
      return (
        <Link href={`/dashboard/users/${userId}/wallet`}>
          <Button variant="outline" size="sm" icon={Eye}>
            View Details
          </Button>
        </Link>
      )
    }
  }
]
