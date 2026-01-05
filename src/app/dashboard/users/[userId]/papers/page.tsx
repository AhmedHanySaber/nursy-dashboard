import { NursePapersCards } from "../../_component/nurse-papers-card"
import { PageTitle } from "@/components/common/page-title"
import { Metadata } from "next"

import { notFound } from "next/navigation"
import { getUser } from "../../_helpers/actions"
import { UpdatePapersModal } from "@/app/dashboard/papers/_components/change-papers-status-modal"

type Props = {
  params: Promise<{ userId: string }>
}

export const metadata: Metadata = {
  title: "Nurse Papers - Dashboard",
  description: "Nurse Papers Page"
}

export default async function ViewUserDetailsPage({ params }: Props) {
  const { userId } = await params

  const user = await getUser(+userId)

  const title = (
    <span className='flex gap-2 items-center'>
      Nurse Papers -
      <b>
        {user.email} #{user.id}
      </b>
    </span>
  )

  if (user.type !== "Nurse") return notFound()

  return (
    <div className='space-y-2'>
      <PageTitle title={title} />
      <NursePapersCards nurseId={user.id} />
    </div>
  )
}
