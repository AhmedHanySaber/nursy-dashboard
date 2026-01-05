import routes from "@/lib/routes"

import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

import { handleError, showResponse } from "@/lib/helpers"
import { loginAction } from "@/actions/auth"

import { LoginData } from "@/types/models"
import { toast } from "react-toastify"

type TMut = {
  data: LoginData
}

export function useLogin() {
  const router = useRouter()

  return useMutation({
    mutationFn: ({ data }: TMut) => loginAction({ data }),
    onSuccess: (data: any) => {
      console.log(data)
      if (data?.status >= 200 && data?.status <= 299) {
        toast.success(data?.data?.message || data?.message || "Logged in successfully")
        return
      }
      toast.error(data?.data?.message || data?.message || "Error logging in")
      return
    },
    onError: (error) => {
      handleError(error)
      console.log(error)
    }
  })
}
