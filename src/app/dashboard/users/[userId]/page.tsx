import { PageTitle } from "@/components/common/page-title"
import { Metadata } from "next"
import { getUser, getUserCounts } from "../_helpers/actions"
import { UserCard } from "../_component/card-details"
import { UserCountsCard } from "../_component/count-details"
import { UserActionsButtons } from "../_component/actions-card"
import { UserWalletCard } from "../_component/wallet-card"

type Props = {
  params: Promise<{ userId: string }>
}

export const metadata: Metadata = {
  title: "User Details - Dashboard",
  description: "User Details Page"
}

export default async function ViewUserDetailsPage({ params }: Props) {
  const { userId } = await params

  const user = await getUser(+userId)
  const counts = await getUserCounts(+userId)

  console.log({ counts })

  const title = (
    <span className='flex gap-2 items-center'>
      User -
      <b>
        {user.email} #{user.id}
      </b>
    </span>
  )

  return (
    <div className='space-y-2'>
      <PageTitle title={title}>
        <UserActionsButtons userId={user.id} type={user.type} />
      </PageTitle>
      <div className='grid grid-cols-3 gap-2'>
        <div className='col-span-2'>
          <UserCard user={user} />
        </div>
        <div className='space-y-2'>
          {user.type === "Nurse" && user.wallet && <UserWalletCard wallet={user.wallet} />}
          <UserCountsCard counts={counts} />
        </div>
      </div>
    </div>
  )
}
