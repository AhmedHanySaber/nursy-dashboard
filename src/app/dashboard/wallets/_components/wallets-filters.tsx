"use client"

import { TObject } from "@/types/default"
import { TextField } from "@/components/common/form/form"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { useRouter, useSearchParams } from "next/navigation"

export const NurseWalletFilters = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const form = useForm({
    defaultValues: {
      search: searchParams.get("search") || "",
      minBalance: searchParams.get("minBalance") || "",
      maxDebit: searchParams.get("maxDebit") || ""
    }
  })

  const handleFilter = (data: TObject) => {
    const params = new URLSearchParams()

    if (data.search) params.append("search", data.search)
    if (data.minBalance) params.append("minBalance", data.minBalance)
    if (data.maxDebit) params.append("maxDebit", data.maxDebit)

    router.push(`/dashboard/wallets?${params.toString()}`)
  }

  return (
    <div className="bg-white p-4 rounded-md border border-gray-50 shadow-sm mb-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFilter)} className="flex gap-4 flex-wrap items-end">
          <TextField
            name="search"
            label="Search (Nurse Name/Email)"
            control={form.control}
            placeholder="Search..."
          />
          <TextField
            name="minBalance"
            label="Min Balance"
            type="number"
            control={form.control}
            placeholder="0"
          />
          <TextField
            name="maxDebit"
            label="Max Debit"
            type="number"
            control={form.control}
            placeholder="0"
          />
          <Button type="submit">Filter</Button>
        </form>
      </Form>
    </div>
  )
}
