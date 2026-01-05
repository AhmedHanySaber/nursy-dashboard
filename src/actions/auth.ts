"use server"

import routes from "@/lib/routes"

import { AUTH_COOKIE, TOKEN_EXPIRATION_DATE } from "@/lib/constants"

import { LoginProps, LoginResponse } from "@/types/api"
import { ApiResponse } from "@/types/default"
import { Admin } from "@/types/models"

import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { api } from "@/services/axios"

export async function getToken(): Promise<string | undefined> {
  const token = (await cookies()).get(AUTH_COOKIE)?.value
  return token
}

export async function getCurrentAdmin(): Promise<Admin | null> {
  try {
    const response = await api<Admin>("GET", "/admin/auth/me")
    return response.data
  } catch (error: any) {
    return null
  }
}

export async function loginAction({ data, rememberMe = true }: LoginProps): Promise<ApiResponse<LoginResponse>> {
  try {
    const request = await api<LoginResponse>("POST", "/admin/auth/login", data)
    const store = await cookies()
    store.set(AUTH_COOKIE, request.data.token, {
      expires: rememberMe ? TOKEN_EXPIRATION_DATE : undefined
    })
    return request
  } catch (error: any) {
    console.log(error)
    return error as ApiResponse<any>
  }
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(AUTH_COOKIE)
  return redirect(routes.login)
}
