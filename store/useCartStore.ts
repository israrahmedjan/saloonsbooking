import { slotsType } from "@/app/lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartStore = {
  cart: slotsType[];

  getTotalPrice: () => number;

  addToCart: (slot: slotsType) => void;
  removeFromCart: (
    salonId: number,
    serviceId: number,
    startTime: string
  ) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],

      getTotalPrice: () => {
        return get().cart.reduce((sum, item) => sum + item.price, 0);
      },

      addToCart: (slot) => {
        const alreadyExists = get().cart.some(
          (item) =>
            item.salon_id === slot.salon_id &&
            item.service_id === slot.service_id &&
            item.start_time === slot.start_time
        );

        if (alreadyExists) {
          return;
        }

        set((state) => ({
          cart: [...state.cart, slot],
        }));
      },

      removeFromCart: (salonId, serviceId, startTime) => {
        set((state) => ({
          cart: state.cart.filter(
            (item) =>
              !(
                item.salon_id === salonId &&
                item.service_id === serviceId &&
                item.start_time === startTime
              )
          ),
        }));
      },

      clearCart: () => {
        set({ cart: [] });
      },
    }),
    {
      name: "cart-storage",
    }
  )
);