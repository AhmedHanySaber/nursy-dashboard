import { TObject } from "@/types/default"

const queryKeys = {
  admin: () => ["admin"],
  admins: {
    index: (sp: TObject = {}) => ["admins", sp],
    singleAdmin: (adminId: number) => ["admins", adminId]
  },
  services: {
    index: (sp: TObject = {}) => ["services", sp],
    singleService: (serviceId: number) => ["services", serviceId]
  },
  specificServices: {
    index: (sp: TObject = {}) => ["specificServices", sp],
    singleService: (serviceId: number) => ["specificServices", serviceId]
  },
  illnessTypes: {
    index: (sp: TObject = {}) => ["illnessTypes", sp],
    singleIllness: (id: number) => ["illnessTypes", id]
  },
  dashboard: {
    stats: (sp: TObject = {}) => ["dashboard", "stats", sp]
  },
  users: {
    index: (sp: TObject = {}) => ["users", sp],
    pending: (sp: TObject = {}) => ["users", sp, "pending"],
    singleUser: (userId: number) => ["users", userId],
    userPayments: (userId: number, sp: TObject = {}) => ["users", userId, "payments", sp],
    userOrders: (userId: number, sp: TObject = {}) => ["users", userId, "orders", sp],
    userPapers: (userId: number) => ["users", userId, "papers"],
    userWallet: (userId: number) => ["users", userId, "wallet"],
    userWalletHistory: (userId: number, sp: TObject = {}) => ["users", userId, "wallet", "history", sp],
    userWalletHistoryItem: (userId: number, historyId: number) => ["users", userId, "wallet", "history", historyId]
  },
  orders: {
    index: (sp: TObject = {}) => ["orders", sp],
    singleOrder: (userId: number) => ["orders", userId]
  }
}

export default queryKeys
