"use client";

import { useRouter } from "next/navigation";
import { BubbleButton } from "@/components/ui/bubble-button";

interface PesanButtonProps {
  serviceSlug: string;
  variant?: "default" | "white";
}

export default function PesanButton({ serviceSlug, variant = "default" }: PesanButtonProps) {
  const router = useRouter();

  const cls =
    variant === "white"
      ? "w-full bg-white hover:bg-gray-50 active:scale-[0.98] text-blue-600 font-semibold text-sm py-3 rounded-xl transition-all duration-150"
      : "w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-semibold text-sm py-3 rounded-xl transition-all duration-150";

  return (
    <BubbleButton onClick={() => router.push(`/layanan/booking/${serviceSlug}`)} className={cls}>
      Pesan Sekarang
    </BubbleButton>
  );
}
