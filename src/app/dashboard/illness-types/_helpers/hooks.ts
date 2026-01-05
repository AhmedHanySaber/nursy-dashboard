import queryKeys from "@/lib/query-keys"

import { useQuery } from "@tanstack/react-query"

import { getIllnessTypes, getIllnessType } from "./actions"
import { TObject } from "@/types/default"

export function useIllnessTypes(sp: TObject = {}) {
  const query = useQuery({
    queryKey: queryKeys.illnessTypes.index(sp),
    queryFn: () => getIllnessTypes(sp)
  })

  return {
    illnessTypes: query.data,
    isIllnessTypesLoading: query.isLoading,
    isIllnessTypesError: query.isError,
    isIllnessTypesRefetching: query.isRefetching,
    illnessTypesError: query.error,
    refetchIllnessTypes: query.refetch
  }
}

export function useIllnessId(illnessId: number) {
  const query = useQuery({
    queryKey: queryKeys.illnessTypes.singleIllness(illnessId),
    queryFn: ({ queryKey }) => getIllnessType(queryKey[1] as number)
  })

  return {
    illness: query.data,
    isIllnessLoading: query.isLoading,
    isIllnessError: query.isError,
    isIllnessRefetching: query.isRefetching,
    illnessError: query.error,
    refetchIllness: query.refetch
  }
}
