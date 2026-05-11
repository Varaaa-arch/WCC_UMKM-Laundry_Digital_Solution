"use client";

import { useRouter } from "next/navigation";
import { useOrderStore, type ServiceType } from "@/store/useOrderStore";

interface PesanButtonProps {
  service: ServiceType;
}

export default function PesanButton({ service }: PesanButtonProps) {
  const router = useRouter();
  const { setService, setStep } = useOrderStore();

  const handleClick = () => {
    setService(service);
    setStep("dropoff");
    router.push("/layanan/booking");
  };

  return (
    <button
      onClick={handleClick}
      className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-semibold text-sm py-3 rounded-xl transition-all duration-150"
    >
      Pesan Sekarang
    </button>
  );
}
