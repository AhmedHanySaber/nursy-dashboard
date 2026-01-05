"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

import { format } from "date-fns"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { build } from "search-params"

type DateFilterProps = {
  onChange?: (range: { startDate: Date | null; endDate: Date | null }) => void
}

export function DashboardDateFilter({ onChange }: DateFilterProps) {
  const router = useRouter()
  const sp = useSearchParams()

  const [startDate, setStartDate] = useState<Date | null>(sp.get("startDate") ? new Date(sp.get("startDate") as string) : null)
  const [endDate, setEndDate] = useState<Date | null>(sp.get("endDate") ? new Date(sp.get("endDate") as string) : null)

  const submitFilter = () => {
    const query = build({
      startDate: startDate ? format(startDate, "yyyy-MM-dd") : undefined,
      endDate: endDate ? format(endDate, "yyyy-MM-dd") : undefined
    })
    router.push(`?${query}`)
  }

  const clearFilters = () => {
    setStartDate(null)
    setEndDate(null)
    router.push(`/dashboard`)
  }

  return (
    <div className='flex items-center gap-2'>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant='outline'>{startDate ? format(startDate, "PPP") : "Pick Start Date"}</Button>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar
            mode='single'
            selected={startDate ?? undefined}
            onSelect={(date) => {
              setStartDate(date ?? null)
              if (onChange) onChange({ startDate: date ?? null, endDate })
            }}
          />
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant='outline'>{endDate ? format(endDate, "PPP") : "Pick End Date"}</Button>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar
            mode='single'
            selected={endDate ?? undefined}
            onSelect={(date) => {
              setEndDate(date ?? null)
              if (onChange) onChange({ startDate, endDate: date ?? null })
            }}
          />
        </PopoverContent>
      </Popover>

      <Button onClick={submitFilter} variant='info'>
        Filter
      </Button>
      <Button onClick={clearFilters} variant='outline'>
        Clear Filters
      </Button>
    </div>
  )
}
