"use server"

import logger from "@/lib/logger"

import { build } from "search-params"
import { api } from "@/services/axios"

import { PaginatedData, TObject, ApiResponse } from "@/types/default"
import { Order, OrderPayment, User, UserCounts, UserData, UserWallet, WalletHistory } from "@/types/models"
import z from "zod"
import { walletSchema } from "@/schema/models"

export async function getUsers(sp: TObject = {}): Promise<PaginatedData<User>> {
  try {
    const query = build(sp)
    const response = await api<PaginatedData<User>>("GET", `admin/users?${query}`)
    logger.success("Fetched users successfully")
    return response.data
  } catch (error) {
    logger.error("Error fetching users:", error)
    const err = error as ApiResponse<any>
    throw new Error(err?.data?.message || err?.data?.message || err?.message || "Failed to fetch users")
  }
}

export async function getUser(userId: number): Promise<User> {
  try {
    const response = await api<User>("GET", `admin/users/${userId}`)
    logger.success("Fetched user successfully")
    return response.data
  } catch (error) {
    logger.error("Error fetching user:", error)
    const err = error as ApiResponse<any>
    throw new Error(err?.data?.message || err?.data?.message || err?.message || "Failed to fetch user")
  }
}

export async function getUserCounts(userId: number): Promise<UserCounts> {
  try {
    const response = await api<User>("GET", `admin/users/${userId}/counts`)
    logger.success("Fetched user counts successfully")
    return response.data
  } catch (error) {
    logger.error("Error fetching user counts:", error)
    const err = error as ApiResponse<any>
    throw new Error(err?.data?.message || err?.data?.message || err?.message || "Failed to fetch user counts")
  }
}

export async function getNursePapers(userId: number): Promise<UserData> {
  try {
    const response = await api<User>("GET", `admin/users/${userId}/papers`)
    logger.success("Fetched user papers successfully")
    return response.data
  } catch (error) {
    logger.error("Error fetching user papers:", error)
    const err = error as ApiResponse<any>
    throw new Error(err?.data?.message || err?.data?.message || err?.message || "Failed to fetch user papers")
  }
}

export async function deleteUser(id: number): Promise<ApiResponse<User | undefined>> {
  try {
    const response = await api<User>("DELETE", `admin/users/${id}`)
    logger.success("user deleted successfully")
    return response
  } catch (error) {
    logger.error("Error deleting user:", error)
    const err = error as ApiResponse<any>
    return err.data
  }
}

//// ORDERS ////

export async function getUserOrders(userId: number, sp: TObject = {}): Promise<PaginatedData<Order>> {
  try {
    const query = build(sp)
    const response = await api<User>("GET", `admin/users/${userId}/orders?${query}`)
    logger.success("Fetched user orders successfully", response)
    return response.data
  } catch (error) {
    logger.error("Error fetching user orders:", error)
    const err = error as ApiResponse<any>
    throw new Error(err?.data?.message || err?.data?.message || err?.message || "Failed to fetch user orders")
  }
}

export async function getUserOrder(userId: number, orderId: number): Promise<Order> {
  try {
    const response = await api<User>("GET", `admin/users/${userId}/orders/${orderId}`)
    logger.success("Fetched user order successfully")
    return response.data
  } catch (error) {
    logger.error("Error fetching user order:", error)
    const err = error as ApiResponse<any>
    throw new Error(err?.data?.message || err?.data?.message || err?.message || "Failed to fetch user order")
  }
}

//// PAYMENTS ////

export async function getUserPayments(userId: number, sp: TObject = {}): Promise<PaginatedData<OrderPayment>> {
  try {
    const query = build(sp)
    const response = await api<User>("GET", `admin/users/${userId}/payments?${query}`)
    logger.success("Fetched user payments successfully")
    return response.data
  } catch (error) {
    logger.error("Error fetching user payments:", error)
    const err = error as ApiResponse<any>
    throw new Error(err?.data?.message || err?.data?.message || err?.message || "Failed to fetch user payments")
  }
}

export async function getUserPayment(userId: number, paymentId: number): Promise<OrderPayment> {
  try {
    const response = await api<User>("GET", `admin/users/${userId}/payments/${paymentId}`)
    logger.success("Fetched user payment successfully")
    return response.data
  } catch (error) {
    logger.error("Error fetching user payment:", error)
    const err = error as ApiResponse<any>
    throw new Error(err?.data?.message || err?.data?.message || err?.message || "Failed to fetch user payment")
  }
}

//// WALLET ////
export async function getUserWallet(userId: number): Promise<UserWallet> {
  try {
    const response = await api<User>("GET", `admin/users/${userId}/wallet`)
    logger.success("Fetched user wallet successfully")
    return response.data
  } catch (error) {
    logger.error("Error fetching user wallet:", error)
    const err = error as ApiResponse<any>
    throw new Error(err?.data?.message || "Failed to fetch user wallet")
  }
}

export async function getUserWalletHistory(userId: number, sp: TObject = {}): Promise<PaginatedData<WalletHistory>> {
  try {
    const query = build(sp)
    const response = await api<User>("GET", `admin/users/${userId}/wallet/history?${query}`)
    logger.success("Fetched user wallet history successfully")
    return response.data
  } catch (error) {
    logger.error("Error fetching user wallet history:", error)
    const err = error as ApiResponse<any>
    throw new Error(err?.data?.message || err?.data?.message || err?.message || "Failed to fetch user wallet history")
  }
}

export async function getUserWalletHistoryItem(userId: number, historyId: number): Promise<WalletHistory> {
  try {
    const response = await api<User>("GET", `admin/users/${userId}/wallet/history/${historyId}`)
    logger.success("Fetched user wallet history successfully")
    return response.data
  } catch (error) {
    logger.error("Error fetching user wallet history:", error)
    const err = error as ApiResponse<any>
    throw new Error(err?.data?.message || err?.data?.message || err?.message || "Failed to fetch user wallet history")
  }
}

export async function updateNurseWallet(userId: number, data: z.infer<typeof walletSchema.create>): Promise<ApiResponse<any>> {
  try {
    const response = await api<ApiResponse<any>>("POST", `admin/users/${userId}/wallet`, data)
    logger.success("Updated user wallet successfully")
    return response
  } catch (error) {
    logger.error("Updated user wallet successfully", error)
    const err = error as ApiResponse<any>
    return err.data
  }
}
