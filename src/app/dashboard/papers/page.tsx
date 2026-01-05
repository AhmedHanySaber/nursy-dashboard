import { TSearchParams } from "@/types/default"
import { PendingNursesTable } from "./_components/table"
import { PageTitle } from "@/components/common/page-title"
import { PendingNursesTableFilters } from "./_components/filters"

type Props = {
  searchParams: TSearchParams
}

export const metadata = {
  title: "Pending Nurses - Dashboard",
  description: "Pending Nurses Management Page"
}

export default async function PendingNursesPage({ searchParams }: Props) {
  const sp = await searchParams

  return (
    <div>
      <PageTitle title='Pending Nurses Papers' />
      <PendingNursesTableFilters />
      <PendingNursesTable searchParams={sp} />
    </div>
  )
}
