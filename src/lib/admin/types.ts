import type { OrderStatus } from "./constants"

export type AdminStats = {
  totalOrders: number
  revenue: number
  activeUsers: number
  pendingOrders: number
  revenueChange: number
  ordersChange: number
}

export type ChartPoint = {
  date: string
  label: string
  revenue: number
  orders: number
}

export type AdminOrder = {
  id: string
  order_number: string
  customer_name: string
  phone: string
  status: OrderStatus
  total_price: number
  order_type: string
  created_at: string
  services?: { name: string } | null
}

export type ActivityItem = {
  id: string
  type: "order" | "status" | "user"
  title: string
  description: string
  created_at: string
}

export type AdminDashboardData = {
  stats: AdminStats
  chart: ChartPoint[]
  orders: AdminOrder[]
  activity: ActivityItem[]
}

export type AdminCustomer = {
  id: string
  name: string
  email: string | null
  phone: string
  is_admin: boolean
  created_at: string
  order_count: number
}

export type AdminService = {
  id: string
  name: string
  price_per_kg: number
  description: string | null
  duration: string | null
  slug?: string | null
}

export type StatusBreakdown = {
  status: string
  label: string
  count: number
}

export type AdminAnalyticsData = {
  stats: AdminStats
  chart: ChartPoint[]
  activity: ActivityItem[]
  statusBreakdown: StatusBreakdown[]
  paidRate: number
  avgOrderValue: number
}
