import { UserProfile } from "@/app/lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";


type UserStore = {
  user: UserProfile | null;
  setUser: (user: UserProfile) => void;
  clearUser: () => void;
   salon: any | null;
   setSalon: (salon: any) => void;
   clearSalon: () => void;

};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      salon: null,

      setUser: (user) => set({ user }),
      setSalon: (salon) => set({ salon }),
      clearUser: () => set({ user: null }),
      clearSalon: () => set({ salon: null }),
    }),
    {
      name: "user-storage",
    }
  )
);