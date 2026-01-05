import { diffForHumans } from "@/lib/helpers"

import { DeleteModal } from "@/components/common/delete-modal"
import { ColumnDef } from "@tanstack/react-table"
import { User } from "@/types/models"
import { LinkBtn } from "@/components/common/link-button"
import { CircleDollarSign, Eye, FileIcon, Paperclip, ShoppingCart } from "lucide-react"
import routes from "@/lib/routes"
import { UpdateUserWallet } from "./update-wallet-modal"

export const UserColumns: ColumnDef<User>[] = [
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
          <LinkBtn href={routes.users.viewOrders(user.id)} icon={ShoppingCart} size='icon' variant='outlineInfo' />
          <LinkBtn href={routes.users.view(user.id)} icon={Eye} size='icon' variant='outline' />

          {user.type == "Nurse" && (
            <>
              <LinkBtn href={routes.users.viewPapers(user.id)} icon={FileIcon} size='icon' variant='outline' />
              <LinkBtn href={routes.users.viewWallet(user.id)} icon={CircleDollarSign} variant='outline'>
                View Wallet
              </LinkBtn>
              <UpdateUserWallet userId={user.id} />
            </>
          )}
        </div>
      )
    }
  }
]
