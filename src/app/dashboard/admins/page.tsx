import { TSearchParams } from "@/types/default"
import { AdminsTable } from "./_component/table"
import { PageTitle } from "@/components/common/page-title"
import { CreateAdminModal } from "./_component/create-modal"
import { SearchBar } from "@/components/common/search"

type Props = {
  searchParams: TSearchParams
}

export const metadata = {
  title: "Admins - Dashboard",
  description: "Admins Management Page"
}

export default async function AdminsPage({ searchParams }: Props) {
  const sp = await searchParams

  return (
    <div>
      <PageTitle title='Admins'>
        <CreateAdminModal />
      </PageTitle>
      <SearchBar />
      <AdminsTable searchParams={sp} />
    </div>
  )
}
