import { LinkBtn } from "@/components/common/link-button"
import { cn } from "@/lib/helpers"
import routes from "@/lib/routes"
import { TUserType } from "@/types/default"
import { CheckCheck, DollarSign, Layers, ShoppingCart } from "lucide-react"

type Props = {
  userId: number
  type: TUserType
}

export const UserActionsButtons = ({ userId, type }: Props) => {
  const grids = type === "Nurse" ? "grid-cols-4" : "grid-cols-2"

  return (
    <div className={cn("grid gap-2", grids)}>
      <LinkBtn className='w-full' href={routes.users.viewOrders(userId)} variant='info' icon={ShoppingCart}>
        Orders
      </LinkBtn>
      <LinkBtn className='w-full' href={routes.users.viewPayments(userId)} variant='success' icon={CheckCheck}>
        Payments
      </LinkBtn>
      {type === "Nurse" && (
        <>
          <LinkBtn className='w-full' href='' variant='warning' icon={Layers}>
            Papers
          </LinkBtn>
          <LinkBtn className='w-full' href='' variant='indigo' icon={DollarSign}>
            Wallet
          </LinkBtn>
        </>
      )}
    </div>
  )
}
