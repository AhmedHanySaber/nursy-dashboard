import queryKeys from "@/lib/query-keys"

import { getOrder, getOrders } from "./actions"
import { useQuery } from "@tanstack/react-query"
import { TObject } from "@/types/default"

export function useOrders(sp: TObject = {}) {
  const query = useQuery({
    queryKey: queryKeys.orders.index(sp),
    queryFn: () => getOrders(sp)
  })

  return {
    orders: query.data,
    isOrdersLoading: query.isLoading,
    isOrdersError: query.isError,
    isOrdersRefetching: query.isRefetching,
    ordersError: query.error,
    refetchOrders: query.refetch
  }
}

export function useOrder(orderId: number) {
  const query = useQuery({
    queryKey: queryKeys.orders.singleOrder(orderId),
    queryFn: ({ queryKey }) => getOrder(queryKey[1] as number)
  })

  return {
    order: query.data,
    isOrderLoading: query.isLoading,
    isOrderError: query.isError,
    isOrderRefetching: query.isRefetching,
    orderError: query.error,
    refetchOrder: query.refetch
  }
}
