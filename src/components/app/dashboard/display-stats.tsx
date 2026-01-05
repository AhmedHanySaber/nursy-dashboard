"use client"

import { TObject } from "@/types/default"
import { StatsCards, StatsCardsSkeleton } from "./stats-cards"
import { useStats } from "@/hooks/use-stats"
import { OrdersByStatusTable, OrdersByStatusTableSkeleton } from "./stats-table"

type Props = {
  sp: TObject
}

export const DashboardStats = ({ sp }: Props) => {
  const { data, isLoading, error } = useStats(sp)

  if (isLoading)
    return (
      <div className='space-y-4'>
        <StatsCardsSkeleton />
        <OrdersByStatusTableSkeleton />
      </div>
    )
  if (error) return <div className='text-red-500'>Error: {error.message}</div>
  if (!data) return "loading..."

  return (
    <div className='space-y-4'>
      <StatsCards stats={data} />
      <OrdersByStatusTable stats={data} />
    </div>
  )
}
