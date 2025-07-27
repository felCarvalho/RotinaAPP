import { create } from "zustand";
import { persist } from "zustand/middleware";

export const LayoutStore = create(
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
      partialize: (s) => Object.fromEntries(Object.entries(s).filter(([, value]) => typeof value !== "function")),
      name: "Telas-store",
    },
  ),
);
