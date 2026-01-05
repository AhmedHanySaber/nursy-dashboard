import { diffForHumans } from "@/lib/helpers"

import { ColumnDef } from "@tanstack/react-table"
import { Order } from "@/types/models"
import { Badge } from "@/components/ui/badge"
import { getOrderStatusColor } from "@/lib/badges"
import Link from "next/link"
import routes from "@/lib/routes"
import { LinkBtn } from "@/components/common/link-button"
import { Eye } from "lucide-react"

export const UserOrdersColumns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "ID"
  },
  {
    accessorKey: "nurse.username",
    header: "Nurse",
    cell: ({ row }) => (
      <>
        {row.original.nurse ? (
          <Link className='text-blue-500 hover:underline' href={routes.users.view(row.original?.nurse?.id)}>
            {row.original.nurse?.username}#{row.original.nurse?.id}
          </Link>
        ) : (
          <p className='text-red-500'>Not Assigned</p>
        )}
      </>
    )
  },
  {
    accessorKey: "employmentType",
    header: "Employment Type"
  },
  {
    accessorKey: "gender",
    header: "Gender"
  },
  {
    accessorKey: "type",
    header: "Type"
  },
  {
    accessorKey: "paymentType",
    header: "Payment Type"
  },
  {
    accessorKey: "payment",
    header: "Payment",
    cell: ({ row }) => (row.original.payment ? <Badge>{row.original.payment?.status}</Badge> : "Not Initiated")
  },
  {
    accessorKey: "illnessType.name",
    header: "Illness Type",
    cell: ({ row }) => row.original.illnessType?.name || "N/A"
  },
  {
    accessorKey: "specificService.name",
    header: "Specific Service",
    cell: ({ row }) => row.getValue("specificService.name") || "N/A"
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <Badge variant={getOrderStatusColor(row.original.status)}>{row.getValue("status")}</Badge>
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => diffForHumans(row.getValue("createdAt"))
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ row }) => diffForHumans(row.getValue("updatedAt"))
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className='flex gap-2'>
          <LinkBtn href={routes.orders.view(row.original.id)} icon={Eye} variant='outline' size='icon' />
        </div>
      )
    }
  }
]
