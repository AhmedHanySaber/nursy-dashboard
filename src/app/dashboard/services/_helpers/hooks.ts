import queryKeys from "@/lib/query-keys"

import { getService, getServices } from "./actions"
import { useQuery } from "@tanstack/react-query"
import { TObject } from "@/types/default"

export function useServices(sp: TObject = {}) {
  const query = useQuery({
    queryKey: queryKeys.services.index(sp),
    queryFn: () => getServices(sp)
  })

  return {
    services: query.data,
    isServicesLoading: query.isLoading,
    isServicesError: query.isError,
    isServicesRefetching: query.isRefetching,
    servicesError: query.error,
    refetchServices: query.refetch
  }
}

export function useService(serviceId: number) {
  const query = useQuery({
    queryKey: queryKeys.services.singleService(serviceId),
    queryFn: ({ queryKey }) => getService(queryKey[1] as number)
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
