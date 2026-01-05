import queryKeys from "@/lib/query-keys"
import { getAllStatistics } from "@/actions/stats"
import { TObject } from "@/types/default"
import { useQuery } from "@tanstack/react-query"

export function useStats(sp: TObject = {}) {
  return useQuery({
    queryKey: queryKeys.dashboard.stats(sp),
    queryFn: ({ queryKey }) => getAllStatistics(queryKey[2] as TObject)
  })
}
