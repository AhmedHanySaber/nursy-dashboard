"use server"

import logger from "@/lib/logger"

import { build } from "search-params"
import { api } from "@/services/axios"

import { PaginatedData, TObject, ApiResponse } from "@/types/default"
import { Order } from "@/types/models"

export async function getOrders(sp: TObject = {}): Promise<PaginatedData<Order>> {
  try {
    const query = build(sp)
    const response = await api<PaginatedData<Order>>("GET", `admin/orders?${query}`)
    logger.success("Fetched orders successfully")
    return response.data
  } catch (error) {
    logger.error("Error fetching orders:", error)
    const err = error as ApiResponse<any>
    throw new Error(err?.data?.message || err?.message || "Failed to fetch orders")
  }
}

export async function getOrder(orderId: number): Promise<Order> {
  try {
    const response = await api<Order>("GET", `admin/orders/${orderId}`)
    logger.success("Fetched order successfully")
    return response.data
  } catch (error) {
    logger.error("Error fetching order:", error)
    const err = error as ApiResponse<any>
    throw new Error(err?.data?.message || err?.message || "Failed to fetch order")
  }
}
