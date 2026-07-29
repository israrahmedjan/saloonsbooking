import { create } from "zustand";
import { persist } from "zustand/middleware";

type CounterStore = {
  count: number;
  increase: () => void;
  decrease: () => void;
  reset: () => void;
};

export const useCounterStore = create<CounterStore>()(
  persist(
    (set, get) => ({
      count: 0,

      increase: () => {
        console.log("Increase button clicked");
        console.log(get().count);

        set((state) => ({
          count: state.count + 1,
        }));
      },

      decrease: () => {
        console.log("Decrease button clicked");

        set((state) => ({
          count: state.count - 1,
        }));
      },

      reset: () => {
        console.log("Counter Reset");

        set({
          count: 0,
        });
      },
    }),
    {
      name: "counter-storage",
    }
  )
);



