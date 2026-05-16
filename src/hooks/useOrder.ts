import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

export type Order = {
  id: string
  service_id: string
  weight: number
  total_price: number
  order_type: string
  status: string
  created_at: string
  services?: { name: string }
}

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const supabase = createClient()

    async function fetch() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { setLoading(false); return }

      const { data, error } = await supabase
        .from("orders")
        .select("*, services(name)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      if (error) setError(error.message)
      else setOrders(data ?? [])
      setLoading(false)
    }

    fetch()
  }, [])

  return { orders, loading, error }
}
