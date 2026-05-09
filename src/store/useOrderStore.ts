import { create } from "zustand";

export type TipeServis = "cuci-kering-setrika" | "setrika-ekspres" | "cuci-satuan";
export type Step = "layanan" | "dropoff" | "pembayaran";
export type MetodePembayaran = "cod" | "transfer";

const HARGA_SERVIS: Record<TipeServis, number> = {
  "cuci-kering-setrika": 12000,
  "setrika-ekspres": 8000,
  "cuci-satuan": 20000,
};

interface OrderState {
  stepSekarang: Step;
  setStep: (step: Step) => void;

  pilihanServis: TipeServis;
  setService: (servis: TipeServis) => void;

  estimasiBerat: number;
  setWeight: (berat: number) => void;

  metodePembayaran: MetodePembayaran;
  setPaymentMethod: (metode: MetodePembayaran) => void;

  totalHarga: () => number;
  reset: () => void;
}

const initialState = {
  stepSekarang: "layanan" as Step,
  pilihanServis: "cuci-kering-setrika" as TipeServis,
  estimasiBerat: 5,
  metodePembayaran: "cod" as MetodePembayaran,
};

export const useOrderStore = create<OrderState>((set, get) => ({
  ...initialState,

  setStep: (step) => set({ stepSekarang: step }),
  setService: (servis) => set({ pilihanServis: servis }),
  setWeight: (berat) => set({ estimasiBerat: berat }),
  setPaymentMethod: (metode) => set({ metodePembayaran: metode }),

  totalHarga: () => {
    const { pilihanServis, estimasiBerat } = get();
    return HARGA_SERVIS[pilihanServis] * estimasiBerat;
  },

  reset: () => set(initialState),
}));
