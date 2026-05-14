"use client";

import { CheckIcon, MapPinIcon, CreditCardIcon, ShoppingBagIcon } from "lucide-react";
import { useOrderStore, type Step } from "@/store/useOrderStore";

type StepConfig = { id: Step; label: string; icon: React.ReactNode };

const STEPS: StepConfig[] = [
  { id: "layanan", label: "Layanan", icon: <ShoppingBagIcon className="w-4 h-4" /> },
  { id: "dropoff", label: "Drop-Off", icon: <MapPinIcon className="w-4 h-4" /> },
  { id: "pembayaran", label: "Pembayaran", icon: <CreditCardIcon className="w-4 h-4" /> },
];

function circleClass(isActive: boolean, isCompleted: boolean) {
  const base = "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300";
  const active = "bg-blue-600 border-blue-600 text-white";
  const inactive = "bg-white border-gray-200 text-gray-400";
  return `${base} ${isActive || isCompleted ? active : inactive}`;
}

function labelClass(isActive: boolean, isCompleted: boolean) {
  if (isActive) return "text-blue-600";
  if (isCompleted) return "text-blue-500";
  return "text-gray-400";
}

export default function BookingSteps() {
  const { currentStep } = useOrderStore();
  const currentIndex = STEPS.findIndex((s) => s.id === currentStep);

  return (
    <div className="flex items-center justify-center py-8">
      {STEPS.map((step, i) => {
        const isCompleted = i < currentIndex;
        const isActive = i === currentIndex;

        return (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div className={circleClass(isActive, isCompleted)}>
                {isCompleted ? <CheckIcon className="w-4 h-4" strokeWidth={2.5} /> : step.icon}
              </div>
              <span className={`text-xs font-medium transition-colors duration-300 ${labelClass(isActive, isCompleted)}`}>
                {step.label}
              </span>
            </div>

            {i < STEPS.length - 1 && (
              <div className={`w-20 sm:w-28 h-0.5 mx-2 mb-5 transition-all duration-500 ${isCompleted ? "bg-blue-600" : "bg-gray-200"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
