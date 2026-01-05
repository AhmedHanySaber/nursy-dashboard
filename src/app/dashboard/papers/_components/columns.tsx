import { diffForHumans } from "@/lib/helpers"

import { DeleteModal } from "@/components/common/delete-modal"
import { ColumnDef } from "@tanstack/react-table"
import { User } from "@/types/models"
import { LinkBtn } from "@/components/common/link-button"
import { Eye, ShoppingCart } from "lucide-react"
import routes from "@/lib/routes"
import { Badge } from "@/components/ui/badge"
import { getUserDataStatusColor } from "@/lib/badges"
import { UpdatePapersModal } from "./change-papers-status-modal"

export const PendingNursesColumns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID"
  },
  {
    accessorKey: "username",
    header: "Username"
  },
  {
    accessorKey: "email",
    header: "Email"
  },
  {
    accessorKey: "type",
    header: "Type"
  },
  {
    accessorKey: "papers",
    header: "Papers Status",
    cell: ({ row }) => <Badge variant={getUserDataStatusColor(row.original.userData?.status)}>{row.original.userData?.status}</Badge>
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
      const user = row.original
      return (
        <div className='flex gap-2'>
          <UpdatePapersModal userId={user.id} status={user.userData?.status!} />
        </div>
      )
    }
  }
]
