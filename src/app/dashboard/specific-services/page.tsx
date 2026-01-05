import { TSearchParams } from "@/types/default"
import { SpecificServicesTable } from "./_component/table"
import { PageTitle } from "@/components/common/page-title"
import { CreateSpecificServiceModal } from "./_component/create-modal"
import { SearchBar } from "@/components/common/search"

type Props = {
  searchParams: TSearchParams
}

export const metadata = {
  title: "Specific Services - Dashboard",
  description: "Specific Services Management Page"
}

export default async function SpecificServicesPage({ searchParams }: Props) {
  const sp = await searchParams

  return (
    <div>
      <PageTitle title='Specific Services'>
        <CreateSpecificServiceModal />
      </PageTitle>
      <SearchBar />
      <SpecificServicesTable searchParams={sp} />
    </div>
  )
}
