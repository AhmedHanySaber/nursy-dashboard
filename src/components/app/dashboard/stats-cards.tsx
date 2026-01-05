import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatisticsResponse } from "@/types/stats"
import { Skeleton } from "@/components/ui/skeleton"
import { DashboardDateFilter } from "./filters"
import { formatToEGP } from "@/lib/helpers"

type StatsCardsProps = {
  stats: StatisticsResponse
}

export function StatsCards({ stats }: StatsCardsProps) {
  const items = [
    { label: "Patients", value: stats.countPatients },
    { label: "Nurses", value: stats.countNurses },
    { label: "Custodians", value: stats.countCustodians },
    { label: "Pending Approvals", value: stats.registerationsNeedsApproval },
    { label: "Total Orders", value: stats.totalOrders },
    { label: "Revenue", value: formatToEGP(String(stats.totalRevenue)) },
    { label: "Avg Order Value", value: formatToEGP(String(stats.avgOrderValue)) },
    { label: "Nurses Income", value: formatToEGP(String(stats.totalNursesIncome)) },
    { label: "Top Client", value: stats.highestVolumeClient ? stats.highestVolumeClient.username : "N/A" },
    { label: "Top Nurse", value: stats.highestVolumeNurse ? stats.highestVolumeNurse.username || "N/A" : "N/A" },
    { label: "Top Nurse by Orders", value: stats.topNurseByOrders ? stats.topNurseByOrders.username : "N/A" },
    { label: "Popular Service", value: stats.mostPopularService ? `Service #${stats.mostPopularService.serviceId}` : "N/A" }
  ]

  return (
    <div>
      <div className='flex items-center justify-between mb-4'>
        <h3 className='font-semibold text-xl'>Statistics</h3>
        <DashboardDateFilter />
      </div>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        {items.map((item) => (
          <Card key={item.label}>
            <CardHeader>
              <CardTitle className='text-sm font-medium'>{item.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-2xl font-bold'>{item.value || "N/A"}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export function StatsCardsSkeleton() {
  const items = new Array(8).fill(null)

  return (
    <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
      {items.map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <CardTitle className='text-sm font-medium'>
              <Skeleton className='h-4 w-24' />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className='h-8 w-16' />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
