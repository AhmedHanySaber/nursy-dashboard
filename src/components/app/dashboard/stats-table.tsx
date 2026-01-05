import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import { StatisticsResponse } from "@/types/stats"

type OrdersTableProps = {
  stats: StatisticsResponse
}

export function OrdersByStatusTable({ stats }: OrdersTableProps) {
  return (
    <div>
      <div className='mb-4'>
        <h3 className='font-semibold text-xl'>Statistics</h3>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Status</TableHead>
            <TableHead>Count</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stats.ordersByStatus.length === 0 ? (
            <p className='flex items-center justify-center p-8 text-lg font-semibold'>No Data Were found.</p>
          ) : (
            <>
              {stats.ordersByStatus.map((s) => (
                <TableRow key={s.status}>
                  <TableCell>{s.status}</TableCell>
                  <TableCell>{s._count.id}</TableCell>
                </TableRow>
              ))}
            </>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export function OrdersByStatusTableSkeleton() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Status</TableHead>
          <TableHead>Count</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...Array(3)].map((_, i) => (
          <TableRow key={i}>
            <TableCell>
              <Skeleton className='h-4 w-20' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-4 w-10' />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
