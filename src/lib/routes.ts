const routes = {
  home: "/dashboard",
  dashboard: "/dashboard",
  login: "/login",
  admins: {
    index: "/dashboard/admins"
  },
  users: {
    index: "/dashboard/users",
    view: (id: number) => `/dashboard/users/${id}`,
    viewOrders: (id: number) => `/dashboard/users/${id}/orders`,
    viewPapers: (id: number) => `/dashboard/users/${id}/papers`,
    viewWallet: (id: number) => `/dashboard/users/${id}/wallet`,
    viewOrder: (id: number, orderId: number) => `/dashboard/users/${id}/orders/${orderId}`,
    viewPayments: (id: number) => `/dashboard/users/${id}/payments`,
    viewPayment: (id: number, paymentId: number) => `/dashboard/users/${id}/payments/${paymentId}`
  },
  orders: {
    index: "/dashboard/orders",
    view: (id: number) => `/dashboard/orders/${id}`
  },
  papers: {
    index: "/dashboard/papers",
    view: (id: number) => `/dashboard/papers/${id}`
  },
  services: {
    index: "/dashboard/services",
    view: (id: number) => `/dashboard/services/${id}`
  },
  specificServices: {
    index: "/dashboard/specific-services",
    view: (id: number) => `/dashboard/specific-services/${id}`
  },
  illnessTypes: {
    index: "/dashboard/illness-types",
    view: (id: number) => `/dashboard/illness-types/${id}`
  },
  wallets: {
    index: "/dashboard/wallets",
    view: (id: number) => `/dashboard/users/${id}/wallet`
  }
}

export default routes
