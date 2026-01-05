import { z } from "zod"

import { Timestamps, TWalletHistoryType, TOrderStatus, TOrderPaymentStatus, TTimeType, TPaymentMethod, TPaymentType, TGender, TUserDataStatus, TUserType } from "./default"
import { LoginSchema } from "@/schema/auth"

type LoginData = z.infer<typeof LoginSchema>

type Admin = Timestamps & {
  id: number
  username: string
  email: string
}

type User = Timestamps & {
  id: number
  username: string
  email: string
  type: TUserType
  phoneNumber: string
  wallet: UserWallet | null
  longitude: number | null
  latitude: number | null
  gender: string
  userData: UserData | null
  birthDate: Date | null
}

type UserWallet = {
  id: number
  userId: number
  balance: number
  debit: number
}

type UserCounts = {
  ordersCount: { status: string; count: number }[]
  totalMessagesCount: number
  totalChatsCount: number
  paymentsCount: { status: string; count: number }[]
}

type Order = Timestamps & {
  id: number
  userId: number
  serviceId: number
  nurseId: number
  status: TOrderStatus
  title: string
  description: string
  employmentType: string
  longitude: number
  latitude: number
  illnessTypeId: number
  specificServiceId: number | null
  gender: string
  age: number
  additionalInformation?: string

  type: TTimeType
  paymentType: TPaymentType

  date: Date

  illnessType: IllnessType
  specificService?: SpecificService

  user: User
  nurse?: User
  payment: OrderPayment
  service: Service
}

type OrderPayment = Timestamps & {
  id: number
  orderId: number
  userId: number

  totalHours: number
  serviceAmount: number
  totalAmount: number

  paymentUrl: string

  paymentMethod: TPaymentMethod
  kashierTranscationId: string
  kashierOrderId: string
  merchantOrderId: string
  signature: string
  orderReference: string
  cardBrand: string
  kashierResponse: string
  status: TOrderPaymentStatus
}

type IllnessType = Timestamps & {
  id: number
  name: string
  description: string
}

type UserData = Timestamps & {
  id: number
  userId: number
  cv: string
  nusringLicenseFront: string
  nusringLicenseBack: string
  graduationCertificate: string
  nationalIdFront: string
  nationalIdBack: string
  status: TUserDataStatus
}

type WalletHistory = Timestamps & {
  id: number
  amount: number
  type: TWalletHistoryType
  description?: string
  fromUserId?: number
  byAdminId?: number
  fromUser: {
    id: number
    username: string
    email: string
    phoneNumber: string
  } | null
  byAdmin: {
    id: number
    username: string
    email: string
  } | null
}

type Service = Timestamps & {
  id: number
  name: string
  description: string
  salary: number
  hourlyFees: number
  status: boolean
}

type SpecificService = Timestamps & {
  id: number
  name: string
  price: number
  status: boolean
  description: string
  serviceId: number
  service: Service
}
