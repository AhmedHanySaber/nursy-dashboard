"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SearchBar } from "@/components/common/search"
import { Input } from "@/components/ui/input"
import { TObject } from "@/types/default"
import { SearchIcon } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { build } from "search-params"
import { useRouter } from "next/navigation"
import routes from "@/lib/routes"

type Props = {
  sp: TObject
}

export const OrdersPageFilters = ({ sp }: Props) => {
  const router = useRouter()

  const [search, setSearch] = useState(sp.search ?? "")
  const [orderBy, setOrderBy] = useState(sp.orderBy ?? "createdAt")
  const [sortedBy, setSortedBy] = useState(sp.orderType ?? "desc")
  const [status, setStatus] = useState(sp.status ?? "all")

  const submitFilters = () => {
    const query = build({
      search,
      status,
      orderBy,
      orderType: sortedBy
    })
    router.push(`?${query}`)
  }

  const clearFilters = () => {
    router.push(routes.orders.index)
  }

  return (
    <div className='flex flex-wrap items-end gap-2 mb-4'>
      <div className={"relative"}>
        <SearchIcon className='absolute xl:left-4 left-4 top-1/2 -translate-y-1/2 text-gray-500' size={17} />
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search' className='xl:pl-10 pl-8 py-4' />
      </div>
      <div>
        <Select onValueChange={(value) => setOrderBy(value)} defaultValue={orderBy}>
          <SelectTrigger className='w-full'>
            <SelectValue placeholder='Order By' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='createdAt'>Creation Time</SelectItem>
            <SelectItem value='updatedAt'>Last Update</SelectItem>
            <SelectItem value='id'>ID</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Select onValueChange={(value) => setSortedBy(value)} defaultValue={sortedBy}>
          <SelectTrigger className='w-full'>
            <SelectValue placeholder='Order Type' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='desc'>Descending</SelectItem>
            <SelectItem value='asc'>Ascending</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Select onValueChange={(value) => setStatus(value)} defaultValue={status}>
          <SelectTrigger className='w-full'>
            <SelectValue placeholder='Order Type' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All</SelectItem>
            <SelectItem value='Pending'>Pending</SelectItem>
            <SelectItem value='Completed'>Completed</SelectItem>
            <SelectItem value='Stale'>Stale</SelectItem>
            <SelectItem value='Accepted'>Accepted</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button onClick={submitFilters} size='lg'>
        Apply Filters
      </Button>
      <Button onClick={clearFilters} variant='outline' size='lg'>
        Clear Filters
      </Button>
    </div>
  )
}
