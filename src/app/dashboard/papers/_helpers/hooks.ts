import queryKeys from "@/lib/query-keys"

import { TObject } from "@/types/default"
import { useQuery } from "@tanstack/react-query"
import { getPendingNurses } from "./actions"

export function usePendingNurses(sp: TObject = {}) {
  const query = useQuery({
    queryKey: queryKeys.users.pending(sp),
    queryFn: () => getPendingNurses(sp)
  })

  return {
    pendingNurses: query.data,
    isPendingNursesLoading: query.isLoading,
    isPendingNursesError: query.isError,
    isPendingNursesRefetching: query.isRefetching,
    pendingNursesError: query.error,
    refetchPendingNurses: query.refetch
  }
}
