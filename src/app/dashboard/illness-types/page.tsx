import { TSearchParams } from "@/types/default"
import { IllnessTypesTable } from "./_component/table"
import { PageTitle } from "@/components/common/page-title"
import { CreateIllnessTypeModal } from "./_component/create-modal"
import { SearchBar } from "@/components/common/search"

type Props = {
  searchParams: TSearchParams
}

export const metadata = {
  title: "Illness Types - Dashboard",
  description: "Illness Types Management Page"
}

export default async function IllnessTypesPage({ searchParams }: Props) {
  const sp = await searchParams

  return (
    <div>
      <PageTitle title='Illness Types'>
        <CreateIllnessTypeModal />
      </PageTitle>
      <SearchBar />
      <IllnessTypesTable searchParams={sp} />
    </div>
  )
}
