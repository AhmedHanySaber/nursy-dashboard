"use server"

import logger from "@/lib/logger"
import z from "zod"

import { serviceSchema } from "@/schema/models"
import { build } from "search-params"
import { api } from "@/services/axios"

import { PaginatedData, TObject, ApiResponse } from "@/types/default"
import { Service } from "@/types/models"

export async function getServices(sp: TObject = {}): Promise<PaginatedData<Service>> {
  try {
    const query = build(sp)
    const response = await api<PaginatedData<Service>>("GET", `admin/services?${query}`)
    logger.success("Fetched services successfully")
    return response.data
  } catch (error) {
    logger.error("Error fetching services:", error)
    const err = error as ApiResponse<any>
    throw new Error(err?.data?.message || err?.message || "Failed to fetch services")
  }
}

export async function getService(serviceId: number): Promise<Service> {
  try {
    const response = await api<Service>("GET", `admin/services/${serviceId}`)
    logger.success("Fetched service successfully")
    return response.data
  } catch (error) {
    logger.error("Error fetching service:", error)
    const err = error as ApiResponse<any>
    throw new Error(err?.data?.message || err?.message || "Failed to fetch service")
  }
}

export async function createService(data: z.infer<typeof serviceSchema.create>): Promise<ApiResponse<Service | undefined>> {
  try {
    const response = await api<Service>("POST", "admin/services", data)
    logger.success("Service created successfully", response)
    return response
  } catch (error) {
    logger.error("Error creating Service:", error)
    const err = error as ApiResponse<any>
    return err.data
  }
}

export async function updateService(serviceId: number, data: z.infer<typeof serviceSchema.create>): Promise<ApiResponse<Service | undefined>> {
  try {
    const response = await api<Service>("PATCH", `admin/services/${serviceId}`, data)
    logger.success("Service updated successfully", response)
    return response
  } catch (error) {
    logger.error("Error updating Service: ", error)
    const err = error as ApiResponse<any>
    return err.data
  }
}
