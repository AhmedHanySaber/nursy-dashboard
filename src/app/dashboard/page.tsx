import { DashboardStats } from "@/components/app/dashboard/display-stats"
import { TSearchParams } from "@/types/default"
import { Metadata } from "next"

type Props = {
  searchParams: TSearchParams
}

export const metadata: Metadata = {
  title: "Nursy - Dashboard",
  description: "This is the dashboard home page"
}

export default async function DashboardPage({ searchParams }: Props) {
  const sp = await searchParams
  return <DashboardStats sp={sp} />
}
