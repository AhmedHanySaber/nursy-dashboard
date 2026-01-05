import { cn, diffForHumans, formatToEGP } from "@/lib/helpers"
import routes from "@/lib/routes"

import { Admin, Service } from "@/types/models"
import { ColumnDef } from "@tanstack/react-table"
import { UpdateServiceModal } from "./update-modal"
import { DeleteModal } from "@/components/common/delete-modal"
import { Badge } from "@/components/ui/badge"

export const ServiceColumns: ColumnDef<Service>[] = [
  {
    accessorKey: "id",
    header: "ID"
  },
  {
    accessorKey: "name",
    header: "Name"
  },
  {
    accessorKey: "salary",
    header: "Salary",
    cell: ({ row }) => <p className='text-green-700 font-semibold'>{formatToEGP(row.getValue("salary"))}</p>
  },
  {
    accessorKey: "hourlyFees",
    header: "Hourly Fees",
    cell: ({ row }) => <p className='text-green-700 font-semibold'>{formatToEGP(row.getValue("hourlyFees"))}</p>
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <Badge variant={row.original.status ? "success" : "destructive"}>{row.original.status ? "Active" : "Disabled"}</Badge>
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
      const service = row.original
      return (
        <div className='flex gap-2'>
          <UpdateServiceModal service={service} />
        </div>
      )
    }
  }
]
