import { useQuery } from "@tanstack/react-query"
import { getCurrentAdmin } from "@/actions/auth"

import queryKeys from "@/lib/query-keys"

export function useUser() {
  const query = useQuery({
    queryKey: queryKeys.admin(),
    queryFn: getCurrentAdmin
  })
  return {
    user: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error
  }
}
