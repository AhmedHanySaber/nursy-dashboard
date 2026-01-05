"use server"

import logger from "@/lib/logger"
import z from "zod"

import { illnessTypeSchema } from "@/schema/models"
import { build } from "search-params"
import { api } from "@/services/axios"

import { PaginatedData, TObject, ApiResponse } from "@/types/default"
import { IllnessType } from "@/types/models"

export async function getIllnessTypes(sp: TObject = {}): Promise<PaginatedData<IllnessType>> {
  try {
    const query = build(sp)
    const response = await api<PaginatedData<IllnessType>>("GET", `admin/illness-types?${query}`)
    logger.success("Fetched illness types successfully")
    return response.data
  } catch (error) {
    logger.error("Error fetching illness types:", error)
    const err = error as ApiResponse<any>
    throw new Error(err?.data?.message || err?.message || "Failed to fetch illness types")
  }
}

export async function getIllnessType(illnessTypeId: number): Promise<IllnessType> {
  try {
    const response = await api<IllnessType>("GET", `admin/illness-types/${illnessTypeId}`)
    logger.success("Fetched illness type successfully")
    return response.data
  } catch (error) {
    logger.error("Error fetching illness type:", error)
    const err = error as ApiResponse<any>
    throw new Error(err?.data?.message || err?.message || "Failed to fetch illness type")
  }
}

export async function createIllnessType(data: z.infer<typeof illnessTypeSchema.create>): Promise<ApiResponse<IllnessType | undefined>> {
  try {
    const response = await api<IllnessType>("POST", "admin/illness-types", data)
    logger.success("illness type created successfully", response)
    return response
  } catch (error) {
    logger.error("Error creating illness type:", error)
    const err = error as ApiResponse<any>
    return err.data
  }
}

export async function updateIllnessType(illnessTypeId: number, data: z.infer<typeof illnessTypeSchema.create>): Promise<ApiResponse<IllnessType | undefined>> {
  try {
    const response = await api<IllnessType>("PATCH", `admin/illness-types/${illnessTypeId}`, data)
    logger.success("illness type updated successfully", response)
    return response
  } catch (error) {
    logger.error("Error updating illness type: ", error)
    const err = error as ApiResponse<any>
    return err.data
  }
}
