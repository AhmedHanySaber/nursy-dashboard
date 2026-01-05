import { TUserDataStatus } from "@/types/default"

export const getOrderStatusColor = (status: string) => {
  switch (status) {
    case "Pending":
      return "warning"
    case "InProgress":
      return "info"
    case "Completed":
      return "success"
    case "Stale":
      return "secondary"
    case "Accepted":
      return "indigo"
    case "Rejected":
      return "destructive"
    default:
      return "outline"
  }
}

export const getUserDataStatusColor = (status: TUserDataStatus | undefined | null) => {
  switch (status) {
    case "Approved":
      return "success"
    case "Pending":
      return "warning"
    case "Rejected":
      return "destructive"
    default:
      return "outline"
  }
}
