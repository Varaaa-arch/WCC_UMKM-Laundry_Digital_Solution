import { getServices } from "@/actions/service-action"
import DashboardShell from "@/components/layout/DashboardShell"
import DashboardPesanClient from "./DashboardPesanClient"

export default async function DashboardPesanPage() {
  const services = await getServices()
  return (
    <DashboardShell>
      <DashboardPesanClient services={services} />
    </DashboardShell>
  )
}
