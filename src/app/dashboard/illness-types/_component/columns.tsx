import { diffForHumans } from "@/lib/helpers"

import { IllnessType } from "@/types/models"
import { ColumnDef } from "@tanstack/react-table"
import { UpdateIllnessTypeModal } from "./update-modal"

export const IllnessTypeColumns: ColumnDef<IllnessType>[] = [
  {
    accessorKey: "id",
    header: "ID"
  },
  {
    accessorKey: "name",
    header: "Name"
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
      const illness = row.original
      return (
        <div className='flex gap-2'>
          <UpdateIllnessTypeModal illness={illness} />
        </div>
      )
    }
  }
]
