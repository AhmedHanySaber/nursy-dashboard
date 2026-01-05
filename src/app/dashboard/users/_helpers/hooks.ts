import queryKeys from "@/lib/query-keys"

import { getNursePapers, getUser, getUserOrders, getUserPayments, getUserWallet, getUserWalletHistory, getUserWalletHistoryItem, getUsers } from "./actions"
import { useQuery } from "@tanstack/react-query"
import { TObject } from "@/types/default"

export function useUsers(sp: TObject = {}) {
  const query = useQuery({
    queryKey: queryKeys.users.index(sp),
    queryFn: () => getUsers(sp)
  })

  return {
    users: query.data,
    isUsersLoading: query.isLoading,
    isUsersError: query.isError,
    isUsersRefetching: query.isRefetching,
    usersError: query.error,
    refetchUsers: query.refetch
  }
}

export function useUser(userId: number) {
  const query = useQuery({
    queryKey: queryKeys.users.singleUser(userId),
    queryFn: ({ queryKey }) => getUser(queryKey[1] as number)
  })

  return {
    user: query.data,
    isUserLoading: query.isLoading,
    isUserError: query.isError,
    isUserRefetching: query.isRefetching,
    userError: query.error,
    refetchUser: query.refetch
  }
}

//// PAYMENTS ////
export function useUserPayments(id: number, sp: TObject = {}) {
  const query = useQuery({
    queryKey: queryKeys.users.userPayments(id, sp),
    queryFn: ({ queryKey }) => getUserPayments(queryKey[1] as number, queryKey[3] as TObject)
  })

  return {
    userPayments: query.data,
    isUserPaymentsLoading: query.isLoading,
    isUserPaymentsError: query.isError,
    isUserPaymentsRefetching: query.isRefetching,
    userPaymentsError: query.error,
    refetchUserPayments: query.refetch
  }
}

//// ORDERS ////
export function useUserOrders(id: number, sp: TObject = {}) {
  const query = useQuery({
    queryKey: queryKeys.users.userOrders(id, sp),
    queryFn: ({ queryKey }) => getUserOrders(queryKey[1] as number, queryKey[3] as TObject)
  })

  return {
    userOrders: query.data,
    isUserOrdersLoading: query.isLoading,
    isUserOrdersError: query.isError,
    isUserOrdersRefetching: query.isRefetching,
    userOrdersError: query.error,
    refetchUserOrders: query.refetch
  }
}

//// NURSE PAPERS ////
export function useNursePapers(id: number) {
  const query = useQuery({
    queryKey: queryKeys.users.userPapers(id),
    queryFn: ({ queryKey }) => getNursePapers(queryKey[1] as number)
  })

  return {
    nursePapers: query.data,
    isNursePapersLoading: query.isLoading,
    isNursePapersError: query.isError,
    isNursePapersRefetching: query.isRefetching,
    nursePapersError: query.error,
    refetchNursePapers: query.refetch
  }
}

//// WALLET ////
export function useNurseWallet(id: number) {
  const query = useQuery({
    queryKey: queryKeys.users.userWallet(id),
    queryFn: ({ queryKey }) => getUserWallet(queryKey[1] as number)
  })

  return {
    userWallet: query.data,
    isUserWalletLoading: query.isLoading,
    isUserWalletError: query.isError,
    isUserWalletRefetching: query.isRefetching,
    userWalletError: query.error,
    refetchUserWallet: query.refetch
  }
}

export function useNurseWalletHistory(id: number, sp: TObject = {}) {
  const query = useQuery({
    queryKey: queryKeys.users.userWalletHistory(id, sp),
    queryFn: ({ queryKey }) => getUserWalletHistory(queryKey[1] as number, queryKey[4] as TObject)
  })

  return {
    walletHistory: query.data,
    isWalletHistoryLoading: query.isLoading,
    isWalletHistoryError: query.isError,
    isWalletHistoryRefetching: query.isRefetching,
    walletHistoryError: query.error,
    refetchWalletHistory: query.refetch
  }
}

export function useNurseWalletHistoryItem(userId: number, historyId: number) {
  const query = useQuery({
    queryKey: queryKeys.users.userWalletHistoryItem(userId, historyId),
    queryFn: ({ queryKey }) => getUserWalletHistoryItem(queryKey[1] as number, queryKey[4] as number)
  })

  return {
    historyItem: query.data,
    isHistoryItemLoading: query.isLoading,
    isHistoryItemError: query.isError,
    isHistoryItemRefetching: query.isRefetching,
    historyItemError: query.error,
    refetchHistoryItem: query.refetch
  }
}
