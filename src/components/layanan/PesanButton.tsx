"use client";

import { useRouter } from "next/navigation";
import { useOrderStore, type ServiceType } from "@/store/useOrderStore";
import { BubbleButton } from "@/components/ui/bubble-button";

interface PesanButtonProps {
  service: ServiceType;
  variant?: "default" | "white";
}

export default function PesanButton({ service, variant = "default" }: PesanButtonProps) {
  const router = useRouter();
  const { setService, setStep } = useOrderStore();

  const handleClick = () => {
    setService(service);
    setStep("dropoff");
    router.push("/layanan/booking");
  };

  const cls =
    variant === "white"
      ? "w-full bg-white hover:bg-gray-50 active:scale-[0.98] text-blue-600 font-semibold text-sm py-3 rounded-xl transition-all duration-150"
      : "w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-semibold text-sm py-3 rounded-xl transition-all duration-150";

  return (
    <BubbleButton onClick={handleClick} className={cls}>
      Pesan Sekarang
    </BubbleButton>
  );
}
