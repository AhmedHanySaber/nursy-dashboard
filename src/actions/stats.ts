"use server"

import logger from "@/lib/logger"

import { ApiResponse, TObject } from "@/types/default"
import { StatisticsResponse } from "@/types/stats"

import { build } from "search-params"
import { api } from "@/services/axios"

export async function getAllStatistics(sp: TObject = {}): Promise<StatisticsResponse> {
  try {
    const query = build(sp)
    const response = await api<StatisticsResponse>("GET", `/admin/statistics/all?${query}`)
    return response.data
  } catch (error) {
    logger.error("Error fetching statistics: ", error)
    const err = error as ApiResponse<any>
    throw new Error(err?.data?.message || err?.message || "Failed to fetch statistics")
  }
}
