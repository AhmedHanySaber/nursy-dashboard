"use client"

import { useRouter, useSearchParams } from "next/navigation"

import { cn } from "@/lib/helpers"

import { FormEvent, useState } from "react"
import { ClassValue } from "class-variance-authority/types"
import { SearchIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { build } from "search-params"

type Props = {
  queryParamName?: string
  className?: ClassValue
  forceParam?: string
}

export function SearchBar({ forceParam, queryParamName = "search", className }: Props) {
  const router = useRouter()
  const sp = useSearchParams()

  const [search, setSearch] = useState(sp.get(queryParamName) || "")

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const query = build({
      [queryParamName]: search?.trim(),
      ...(forceParam ? { [forceParam.split("=")[0]]: forceParam.split("=")[1] } : {})
    })
    router.push(`?${query}`)
  }

  return (
    <form className={cn("relative my-2", className)} onSubmit={handleSearch}>
      <SearchIcon className='absolute xl:left-4 left-4 top-1/2 -translate-y-1/2 text-gray-500' size={17} />
      <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search' className='xl:pl-10 pl-8 py-4' />
    </form>
  )
}
