import { Control, FieldPath, FieldValues } from "react-hook-form"

type ApiResponse<T> = {
  data: T
  message: string
  status: number
}

type BaseFieldProps<T extends FieldValues> = {
  control: Control<T>
  name: FieldPath<T>
  label: string
}

type Timestamps = {
  createdAt: Date
  updatedAt: Date
}

type PaginatedData<T> = {
  data: T[]
  pagination: {
    total: number
    page: number
    pageSize: number
    totalPages: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
}

type TObject = Record<any, any>
type TSearchParams = Promise<TObject>

type TUserType = "Patient" | "Nurse" | "Custodian"
type TOrderStatus = "Pending" | "InProgress" | "Completed" | "Stale" | "Accepted" | "Rejected"
type TOrderPaymentStatus = "Pending" | "Stale" | "Refused" | "Paid" | "Failed"
type TTimeType = "OnSpot" | "Scheduled"
type TPaymentMethod = "Cash" | "Card"
type TPaymentType = "Hourly" | "Services"
type TGender = "Male" | "Female"
type TUserDataStatus = "Pending" | "Approved" | "Rejected"
type TWalletHistoryType = "Credit" | "Debit"
