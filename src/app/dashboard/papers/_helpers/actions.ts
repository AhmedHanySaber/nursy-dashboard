"use server"

import logger from "@/lib/logger"

import { build } from "search-params"
import { api } from "@/services/axios"

import { PaginatedData, TObject, ApiResponse, TUserDataStatus } from "@/types/default"
import { User } from "@/types/models"

export async function getPendingNurses(sp: TObject = {}): Promise<PaginatedData<User>> {
  try {
    const query = build(sp)
    const response = await api<PaginatedData<User>>("GET", `admin/users/pending?${query}`)
    logger.success("Fetched pending nurses successfully", response.data)
    return response.data
  } catch (error) {
    logger.error("Error fetching pending nurses:", error)
    const err = error as ApiResponse<any>
    throw new Error(err?.data?.message || err?.message || "Failed to fetch pending nurses")
  }
}

export async function changeNursePapersStatus(id: number, status: TUserDataStatus): Promise<ApiResponse<any>> {
  try {
    const response = await api<any>("PATCH", `admin/users/${id}/papers`, { status })
    logger.success("Nurse Papers approved successfully")
    return response
  } catch (error) {
    logger.error("Error approving nurses data:", error)
    const err = error as ApiResponse<any>
    return err.data
  }
}
