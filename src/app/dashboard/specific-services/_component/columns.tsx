import { diffForHumans, formatToEGP } from "@/lib/helpers"

import { SpecificService } from "@/types/models"
import { ColumnDef } from "@tanstack/react-table"
import { UpdateSpecificServiceModal } from "./update-modal"
import { Badge } from "@/components/ui/badge"

export const SpecificServiceColumns: ColumnDef<SpecificService>[] = [
  {
    accessorKey: "id",
    header: "ID"
  },
  {
    accessorKey: "name",
    header: "Name"
  },
  {
    accessorKey: "price",
    header: "price",
    cell: ({ row }) => <p className='text-green-700 font-semibold'>{formatToEGP(row.getValue("price"))}</p>
  },
  {
    accessorKey: "service.name",
    header: "Service",
    cell: ({ row }) => <p>{row.original.service?.name}</p>
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
          <UpdateSpecificServiceModal service={service} />
        </div>
      )
    }
  }
]
