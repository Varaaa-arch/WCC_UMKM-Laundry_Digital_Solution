import { getServices } from "@/actions/service-action"
import PesanPageShell from "./PesanPageShell"

export default async function DashboardPesanPage() {
  const services = await getServices()
  return <PesanPageShell services={services} />
}
