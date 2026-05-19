import { create } from "zustand";
import type { Service } from "@/types/service";

export type Step = "layanan" | "dropoff" | "pembayaran";
export type PaymentMethod = "cod" | "qris";
export type PickupMethod = "ambil-sendiri" | "antar-jemput";

export const ANTAR_JEMPUT_FEE = 15000;

interface OrderState {
  currentStep: Step;
  setStep: (step: Step) => void;

  selectedService: Service | null;
  setService: (service: Service) => void;

  estimatedWeight: number;
  setWeight: (weight: number) => void;

  pickupMethod: PickupMethod;
  setPickupMethod: (method: PickupMethod) => void;

  address: string;
  setAddress: (address: string) => void;

  note: string;
  setNote: (note: string) => void;

  pickupTime: string;
  setPickupTime: (time: string) => void;

  paymentMethod: PaymentMethod;
  setPaymentMethod: (method: PaymentMethod) => void;

  totalPrice: () => number;
  reset: () => void;
}

const initialState = {
  currentStep: "layanan" as Step,
  selectedService: null as Service | null,
  estimatedWeight: 5,
  pickupMethod: "ambil-sendiri" as PickupMethod,
  address: "",
  note: "",
  pickupTime: "Sekarang (Kuri terdekat)",
  paymentMethod: "cod" as PaymentMethod,
};

export const useOrderStore = create<OrderState>()((set, get) => ({
  ...initialState,

  setStep: (step) => set({ currentStep: step }),
  setService: (service) => set({ selectedService: service }),
  setWeight: (weight) => set({ estimatedWeight: weight }),
  setPickupMethod: (method) => set({ pickupMethod: method }),
  setAddress: (address) => set({ address }),
  setNote: (note) => set({ note }),
  setPickupTime: (time) => set({ pickupTime: time }),
  setPaymentMethod: (method) => set({ paymentMethod: method }),

  totalPrice: () => {
    const { selectedService, estimatedWeight, pickupMethod } = get();
    if (!selectedService) return 0;
    const base = selectedService.price_per_kg * estimatedWeight;
    return base + (pickupMethod === "antar-jemput" ? ANTAR_JEMPUT_FEE : 0);
  },

  reset: () => set(initialState),
}));
