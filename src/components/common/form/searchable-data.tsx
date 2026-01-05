"use client"

import * as React from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Loader2, SearchIcon, CheckIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { ClassValue } from "class-variance-authority/types"

type SearchableItem = {
  id: number
  label: string
}

type Props = {
  data?: SearchableItem[]
  label: string
  form: any
  formItem: string
  defaultSelectedId?: string
  className?: ClassValue
  loading?: boolean
  error?: string
  executeFunctionWithId?: (value: number | undefined) => void

  // NEW: external search control
  search?: string
  setSearch?: React.Dispatch<React.SetStateAction<string>>
}

export function SearchableData({ data = [], className, label, form, formItem, defaultSelectedId, loading, error, executeFunctionWithId, search, setSearch }: Props) {
  const [open, setOpen] = React.useState(false)
  const [internalQuery, setInternalQuery] = React.useState("")

  // Use external search if provided, otherwise fallback to internal
  const query = search !== undefined ? search : internalQuery
  const updateQuery = setSearch ?? setInternalQuery

  const selectedId = form.watch(formItem) ?? defaultSelectedId
  const selectedItem = data.find((i) => i.id === selectedId)

  const filteredData = React.useMemo(() => {
    if (!query) return data
    return data.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()))
  }, [data, query])

  const handleSelect = (id: number) => {
    form.setValue(formItem, id)
    executeFunctionWithId?.(id)
    setOpen(false)
    updateQuery("")
  }

  React.useEffect(() => {
    if (defaultSelectedId !== undefined && !form.watch(formItem)) {
      form.setValue(formItem, defaultSelectedId, { shouldValidate: true, shouldDirty: true })
    }
  }, [defaultSelectedId, form, formItem])

  return (
    <div className='w-full'>
      <Label className='mb-2 block'>{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant='outline' role='combobox' aria-expanded={open} className='w-full justify-between h-9'>
            {selectedItem ? selectedItem.label : "Select an option"}
          </Button>
        </PopoverTrigger>

        <PopoverContent className={cn("w-[500px] p-0", className)}>
          <div className='p-2 border-b'>
            <div className='relative'>
              <SearchIcon size={16} className='absolute left-2 top-1/2 -translate-y-1/2 text-gray-400' />
              <Input value={query} onChange={(e) => updateQuery(e.target.value)} placeholder='Search...' className='pl-8' autoFocus />
            </div>
          </div>

          <div className='max-h-60 overflow-y-auto'>
            {loading ? (
              <div className='flex items-center justify-center p-4'>
                <Loader2 className='animate-spin text-primary' size={20} />
              </div>
            ) : filteredData.length > 0 ? (
              filteredData.map((item) => (
                <div key={item.id} onClick={() => handleSelect(item.id)} className={cn("flex items-center gap-2 p-2 px-3 cursor-pointer select-none text-sm", "hover:bg-accent hover:text-accent-foreground", item.id === selectedId ? "bg-accent text-accent-foreground font-medium" : "text-gray-700")}>
                  <CheckIcon size={14} className={cn("transition-opacity", item.id === selectedId ? "opacity-100" : "opacity-0")} />
                  {item.label}
                </div>
              ))
            ) : (
              <div className='p-3 text-sm text-muted-foreground'>No results found.</div>
            )}
          </div>
        </PopoverContent>
      </Popover>

      {error && <p className='text-red-500 mt-1 text-sm'>{error}</p>}
    </div>
  )
}
