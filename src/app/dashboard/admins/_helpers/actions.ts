"use server"

import logger from "@/lib/logger"
import z from "zod"

import { actionResponse } from "@/lib/helpers"
import { adminSchemas } from "@/schema/models"
import { build } from "search-params"
import { api } from "@/services/axios"

import { PaginatedData, TObject, ApiResponse } from "@/types/default"
import { Admin } from "@/types/models"

export async function getAdmins(sp: TObject = {}): Promise<PaginatedData<Admin>> {
  try {
    const query = build(sp)
    const response = await api<PaginatedData<Admin>>("GET", `admin/admins?${query}`)
    logger.success("Fetched admins successfully")
    return response.data
  } catch (error) {
    logger.error("Error fetching admins:", error)
    const err = error as ApiResponse<any>
    throw new Error(err?.data?.message || err?.message || "Failed to fetch admins")
  }
}

export async function getAdmin(adminId: number): Promise<Admin> {
  try {
    const response = await api<Admin>("GET", `admin/admins/${adminId}`)
    logger.success("Fetched admin successfully")
    return response.data
  } catch (error) {
    logger.error("Error fetching admin:", error)
    const err = error as ApiResponse<any>
    throw new Error(err?.data?.message || err?.message || "Failed to fetch admin")
  }
}

export async function createAdmin(data: z.infer<typeof adminSchemas.create>): Promise<ApiResponse<Admin | undefined>> {
  try {
    const response = await api<Admin>("POST", "admin/admins", data)
    logger.success("Admin created successfully", response)
    return response
  } catch (error) {
    logger.error("Error creating admin:", error)
    const err = error as ApiResponse<any>
    return err.data
  }
}

export async function updateAdmin(adminId: number, data: z.infer<typeof adminSchemas.update>): Promise<ApiResponse<Admin | undefined>> {
  try {
    const response = await api<Admin>("PATCH", `admin/admins/${adminId}`, data)
    logger.success("Admin updated successfully", response)
    return response
  } catch (error) {
    logger.error("Error creating admin: ", error)
    const err = error as ApiResponse<any>
    return err.data
  }
}

export async function deleteAdmin(id: number): Promise<ApiResponse<Admin | undefined>> {
  try {
    const response = await api<Admin>("DELETE", `admin/admins/${id}`)
    logger.success("Admin deleted successfully")
    return response
  } catch (error) {
    logger.error("Error deleting admin:", error)
    const err = error as ApiResponse<any>
    return err.data
  }
}
