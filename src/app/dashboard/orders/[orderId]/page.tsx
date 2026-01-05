import { TSearchParams } from "@/types/default"
import { ViewOrderCard } from "../_components/view"

import { getUserOrder } from "../../users/_helpers/actions"
import { notFound } from "next/navigation"
import { getOrder } from "../_helpers/actions"

type Props = {
  params: Promise<{
    userId: string
    orderId: string
  }>
}

export default async function ViewOrderPage({ params }: Props) {
  const p = await params
  const order = await getOrder(+p.orderId)
  if (!order) return notFound()

  return (
    <div>
      <ViewOrderCard order={order} />
    </div>
  )
}
