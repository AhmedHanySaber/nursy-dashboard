import { TSearchParams } from "@/types/default"
import { ServicesTable } from "./_component/table"
import { PageTitle } from "@/components/common/page-title"
import { CreateServiceModal } from "./_component/create-modal"
import { SearchBar } from "@/components/common/search"

type Props = {
  searchParams: TSearchParams
}

export const metadata = {
  title: "Services - Dashboard",
  description: "Services Management Page"
}

export default async function ServicesPage({ searchParams }: Props) {
  const sp = await searchParams

  return (
    <div>
      <PageTitle title='Services'>
        <CreateServiceModal />
      </PageTitle>
      <SearchBar />
      <ServicesTable searchParams={sp} />
    </div>
  )
}
