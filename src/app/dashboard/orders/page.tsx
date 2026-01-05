import { TSearchParams } from "@/types/default"
import { PageTitle } from "@/components/common/page-title"
import { OrdersTable } from "./_components/table"
import { OrdersPageFilters } from "./_components/filters"

type Props = {
  searchParams: TSearchParams
}

export const metadata = {
  title: "Orders - Dashboard",
  description: "Orders Management Page"
}

export default async function UsersPage({ searchParams }: Props) {
  const sp = await searchParams

  return (
    <div>
      <PageTitle title='Orders' />
      <OrdersPageFilters sp={sp} />
      <OrdersTable searchParams={sp} />
    </div>
  )
}
