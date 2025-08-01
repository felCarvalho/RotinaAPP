import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LayoutTypes {
  isLayout: {
    isDesktopLayout: boolean;
    isMobileLayout: boolean;
  };
  setLayout: (layout: { isDesktopLayout: boolean; isMobileLayout: boolean }) => void;
}

export const LayoutStore = create<LayoutTypes>()(
  persist(
    (set) => ({
      isLayout: {
        isDesktopLayout: false,
        isMobileLayout: false,
      },

      setLayout: (layout) =>
        set((s) => ({
          isLayout: { ...s.isLayout, ...layout },
        })),
    }),
    {
      partialize: (s) => Object.fromEntries(Object.entries(s).filter(([_, value]) => typeof value !== "function")),
      name: "Telas-store",
    },
  ),
);
