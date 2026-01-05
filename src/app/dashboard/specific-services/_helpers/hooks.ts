import queryKeys from "@/lib/query-keys"

import { useQuery } from "@tanstack/react-query"

import { getSpecificService, getSpecificServices } from "./actions"
import { TObject } from "@/types/default"

export function useSpecificServices(sp: TObject = {}) {
  const query = useQuery({
    queryKey: queryKeys.specificServices.index(sp),
    queryFn: () => getSpecificServices(sp)
  })

  return {
    specificServices: query.data,
    isSpecificServicesLoading: query.isLoading,
    isSpecificServicesError: query.isError,
    isSpecificServicesRefetching: query.isRefetching,
    specificServicesError: query.error,
    refetchSpecificServices: query.refetch
  }
}

export function useSpecificService(serviceId: number) {
  const query = useQuery({
    queryKey: queryKeys.specificServices.singleService(serviceId),
    queryFn: ({ queryKey }) => getSpecificService(queryKey[1] as number)
  })

  return {
    service: query.data,
    isServiceLoading: query.isLoading,
    isServiceError: query.isError,
    isServiceRefetching: query.isRefetching,
    serviceError: query.error,
    refetchService: query.refetch
  }
}
