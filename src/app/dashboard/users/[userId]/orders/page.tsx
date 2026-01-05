import { PageTitle } from "@/components/common/page-title"
import { TSearchParams } from "@/types/default"
import { UserOrdersTable } from "./_components/table"
import { getUser } from "../../_helpers/actions"
import { notFound } from "next/navigation"

type Props = {
  params: Promise<{ userId: string }>
  searchParams: TSearchParams
}

export default async function UserOrders({ params, searchParams }: Props) {
  const { userId } = await params

  const user = await getUser(Number(userId))
  const sp = await searchParams

  if (!user) return notFound()

  const title = (
    <span className='flex gap-2 items-center'>
      User -
      <b>
        {user.email} #{user.id}
      </b>
    </span>
  )

  return (
    <div>
      <PageTitle title={title} />
      <UserOrdersTable userId={Number(userId)} searchParams={sp} />
    </div>
  )
}
