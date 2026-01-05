import { TSearchParams } from "@/types/default"
import { UsersTable } from "./_component/table"
import { PageTitle } from "@/components/common/page-title"
import { SearchBar } from "@/components/common/search"
import { UsersTableFilters } from "./_component/filters"

type Props = {
  searchParams: TSearchParams
}

export const metadata = {
  title: "Users - Dashboard",
  description: "Users Management Page"
}

export default async function UsersPage({ searchParams }: Props) {
  const sp = await searchParams

  return (
    <div>
      <PageTitle title={sp.type + "s" || "Users"} />
      <UsersTableFilters />
      <UsersTable searchParams={sp} />
    </div>
  )
}
