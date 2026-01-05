"use server"

import logger from "@/lib/logger"
import z from "zod"

import { specificServiceSchema } from "@/schema/models"
import { build } from "search-params"
import { api } from "@/services/axios"

import { PaginatedData, TObject, ApiResponse } from "@/types/default"
import { SpecificService } from "@/types/models"

export async function getSpecificServices(sp: TObject = {}): Promise<PaginatedData<SpecificService>> {
  try {
    const query = build(sp)
    const response = await api<PaginatedData<SpecificService>>("GET", `admin/specific-services?${query}`)
    logger.success("Fetched specific services successfully")
    return response.data
  } catch (error) {
    logger.error("Error fetching specific services:", error)
    const err = error as ApiResponse<any>
    throw new Error(err?.data?.message || err?.message || "Failed to fetch specific services")
  }
}

export async function getSpecificService(serviceId: number): Promise<SpecificService> {
  try {
    const response = await api<SpecificService>("GET", `admin/specific-services/${serviceId}`)
    logger.success("Fetched specific service successfully")
    return response.data
  } catch (error) {
    logger.error("Error fetching specific service:", error)
    const err = error as ApiResponse<any>
    throw new Error(err?.data?.message || err?.message || "Failed to fetch specific service")
  }
}

export async function createSpecificService(data: z.infer<typeof specificServiceSchema.create>): Promise<ApiResponse<SpecificService | undefined>> {
  try {
    const response = await api<SpecificService>("POST", "admin/specific-services", data)
    logger.success("Specific service created successfully", response)
    return response
  } catch (error) {
    logger.error("Error creating specific service:", error)
    const err = error as ApiResponse<any>
    return err.data
  }
}

export async function updateSpecificService(serviceId: number, data: z.infer<typeof specificServiceSchema.create>): Promise<ApiResponse<SpecificService | undefined>> {
  try {
    const response = await api<SpecificService>("PATCH", `admin/specific-services/${serviceId}`, data)
    logger.success("Specific service updated successfully", response)
    return response
  } catch (error) {
    logger.error("Error updating Specific service: ", error)
    const err = error as ApiResponse<any>
    return err.data
  }
}
