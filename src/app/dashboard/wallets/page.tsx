import { PageTitle } from "@/components/common/page-title"
import { SearchBar } from "@/components/common/search"
import { Metadata } from "next"
import { TSearchParams } from "@/types/default"
import { NurseWalletsTable } from "./_components/wallets-table"
import { NurseWalletFilters } from "./_components/wallets-filters"

type Props = {
  searchParams: TSearchParams
}

export const metadata: Metadata = {
  title: "Nurse Wallets - Dashboard",
  description: "Manage all nurse wallets"
}

export default async function NurseWalletsPage({ searchParams }: Props) {
  const sp = await searchParams

  return (
    <div>
      <PageTitle title="Nurse Wallets Management" />
      <NurseWalletFilters />
      <NurseWalletsTable searchParams={sp} />
    </div>
  )
}
