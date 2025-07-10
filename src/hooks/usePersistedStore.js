import { create } from "zustand";
import { persist } from "zustand/middleware";

// This is to set the session to the currency used. Can look into implementing the other persisted store such as front, back and currently edited
export const usePersistedStore = create(
  persist(
    (set, get) => ({
      currency: "SGD",
      setCurrency: (value) => set({ currency: value }),
    }),
    {
      name: "custory-app",
    }
  )
);
