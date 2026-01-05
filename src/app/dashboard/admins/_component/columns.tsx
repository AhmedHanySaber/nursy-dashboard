import { diffForHumans } from "@/lib/helpers"
import routes from "@/lib/routes"

import { Admin } from "@/types/models"
import { ColumnDef } from "@tanstack/react-table"
import { UpdateAdminModal } from "./update-modal"
import { DeleteModal } from "@/components/common/delete-modal"
import { deleteAdmin } from "../_helpers/actions"

export const AdminColumns: ColumnDef<Admin>[] = [
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
      const admin = row.original
      return (
        <div className='flex gap-2'>
          <UpdateAdminModal admin={admin} />
          <DeleteModal deletedId={admin.id} forceAction={deleteAdmin} />
        </div>
      )
    }
  }
]
