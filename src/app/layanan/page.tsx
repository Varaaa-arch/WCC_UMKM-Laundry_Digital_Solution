import { getServices } from "@/actions/service-action";
import LayananClient from "./LayananClient";

export default async function LayananPage() {
  const services = await getServices();
  return <LayananClient services={services} />;
}
