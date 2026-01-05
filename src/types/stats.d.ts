export type OrdersByStatus = {
  status: string
  _count: { id: number }
}

export type WalletTransaction = {
  type: "Credit" | "Debit"
  _sum: { amount: string }
}

export type UserSummary = {
  id: number
  username: string
  email: string
  phoneNumber: string
  gender: string | null
  createdAt: string
  totalSpent?: number
}

export type NurseSummary = UserSummary & {
  wallet?: {
    id: number
    balance: string
    debit: string
  }
}

export type StatisticsResponse = {
  countPatients: number
  countNurses: number
  countCustodians: number
  registerationsNeedsApproval: number
  highestVolumeClient: UserSummary | null
  highestVolumeNurse: NurseSummary | null
  totalNursesIncome: number
  totalOrders: number
  ordersByStatus: OrdersByStatus[]
  totalRevenue: number
  avgOrderValue: number
  mostPopularService: { serviceId: number; _count: { id: number } } | null
  topNurseByOrders: NurseSummary | null
  walletTransactions: WalletTransaction[]
}
