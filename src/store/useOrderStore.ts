import { create } from "zustand";

export type ServiceType = "cuci-kering-setrika" | "setrika-ekspres" | "cuci-satuan";
export type Step = "layanan" | "dropoff" | "pembayaran";
export type PaymentMethod = "cod" | "transfer";

const SERVICE_PRICE: Record<ServiceType, number> = {
  "cuci-kering-setrika": 12000,
  "setrika-ekspres": 8000,
  "cuci-satuan": 20000,
};

interface OrderState {
  currentStep: Step;
  setStep: (step: Step) => void;

  selectedService: ServiceType;
  setService: (service: ServiceType) => void;

  estimatedWeight: number;
  setWeight: (weight: number) => void;

  paymentMethod: PaymentMethod;
  setPaymentMethod: (method: PaymentMethod) => void;

  totalPrice: () => number;
  reset: () => void;
}

const initialState = {
  currentStep: "layanan" as Step,
  selectedService: "cuci-kering-setrika" as ServiceType,
  estimatedWeight: 5,
  paymentMethod: "cod" as PaymentMethod,
};

export const useOrderStore = create<OrderState>((set, get) => ({
  ...initialState,

  setStep: (step) => set({ currentStep: step }),
  setService: (service) => set({ selectedService: service }),
  setWeight: (weight) => set({ estimatedWeight: weight }),
  setPaymentMethod: (method) => set({ paymentMethod: method }),

  totalPrice: () => {
    const { selectedService, estimatedWeight } = get();
    return SERVICE_PRICE[selectedService] * estimatedWeight;
  },

  reset: () => set(initialState),
}));
