"use server"

import logger from "@/lib/logger"
import { build } from "search-params"
import { api } from "@/services/axios"
import { PaginatedData, TObject, ApiResponse } from "@/types/default"
import { UserWallet, User } from "@/types/models"

export type WalletWithUser = UserWallet & {
  user?: User
}

export async function getAllWallets(sp: TObject = {}): Promise<PaginatedData<WalletWithUser>> {
  try {
    const query = build(sp)
    const response = await api<PaginatedData<WalletWithUser>>("GET", `admin/wallets?${query}`)
    logger.success("Fetched all wallets successfully")
    return response.data
  } catch (error) {
    logger.error("Error fetching wallets:", error)
    const err = error as ApiResponse<any>
    throw new Error(err?.data?.message || err?.message || "Failed to fetch wallets")
  }
}
