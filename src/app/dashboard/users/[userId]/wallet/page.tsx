import { PageTitle } from "@/components/common/page-title"
import { Metadata } from "next"
import { getUser, getUserWallet } from "../../_helpers/actions"
import { WalletHistoryTable } from "../../_component/wallet-table"
import { TSearchParams } from "@/types/default"
import { UserWalletCard } from "../../_component/wallet-card"
import { notFound } from "next/navigation"
import { UpdateUserWallet } from "../../_component/update-wallet-modal"

type Props = {
  params: Promise<{ userId: string }>
  searchParams: TSearchParams
}

export const metadata: Metadata = {
  title: "Nurse Wallet - Dashboard",
  description: "Nurse Wallet  Page"
}

export default async function ViewNurseWalletPage({ searchParams, params }: Props) {
  const { userId } = await params
  const sp = await searchParams

  const user = await getUser(+userId)
  const wallet = await getUserWallet(+userId)

  if (!user) return notFound()
  if (!wallet) return notFound()

  console.log({ user, wallet })

  const title = (
    <span className='flex gap-2 items-center'>
      Nurse Wallet -
      <b>
        {user.email} #{user.id}
      </b>
    </span>
  )

  return (
    <div className='space-y-2'>
      <PageTitle title={title}>
        <UpdateUserWallet userId={user.id} />
      </PageTitle>
      <WalletHistoryTable userId={user.id} searchParams={sp} />
      <UserWalletCard wallet={wallet} />
    </div>
  )
}
