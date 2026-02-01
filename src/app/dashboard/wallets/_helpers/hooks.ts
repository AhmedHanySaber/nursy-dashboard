import { useQuery } from "@tanstack/react-query"
import { getAllWallets } from "./actions"
import { TObject } from "@/types/default"
import queryKeys from "@/lib/query-keys"

export const useWallets = (sp: TObject = {}) => {
  const { data: wallets, isLoading: isWalletsLoading, error: walletsError, isError: isWalletsError } = useQuery({
    queryKey: queryKeys.wallets.all(sp),
    queryFn: () => getAllWallets(sp)
  })

  return { wallets, isWalletsLoading, walletsError, isWalletsError }
}
