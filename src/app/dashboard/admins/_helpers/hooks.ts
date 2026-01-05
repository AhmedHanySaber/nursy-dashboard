import queryKeys from "@/lib/query-keys"

import { createAdmin, getAdmin, getAdmins } from "./actions"
import { useMutation, useQuery } from "@tanstack/react-query"
import { TObject } from "@/types/default"
import z from "zod"
import { adminSchemas } from "@/schema/models"

export function useAdmins(sp: TObject = {}) {
  const query = useQuery({
    queryKey: queryKeys.admins.index(sp),
    queryFn: () => getAdmins(sp)
  })

  return {
    admins: query.data,
    isAdminsLoading: query.isLoading,
    isAdminsError: query.isError,
    isAdminsRefetching: query.isRefetching,
    adminsError: query.error,
    refetchAdmins: query.refetch
  }
}

export function useAdmin(adminId: number) {
  const query = useQuery({
    queryKey: queryKeys.admins.singleAdmin(adminId),
    queryFn: ({ queryKey }) => getAdmin(queryKey[1] as number)
  })

  return {
    admin: query.data,
    isAdminLoading: query.isLoading,
    isAdminError: query.isError,
    isAdminRefetching: query.isRefetching,
    adminError: query.error,
    refetchAdmin: query.refetch
  }
}
