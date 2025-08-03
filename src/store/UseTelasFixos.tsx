import { create } from "zustand";
import { persist } from "zustand/middleware";

interface types {
  name: string;
  id: number;
  status?: boolean;
}

interface TelasFunctionTypes {
  openID: ({ name, id, status }: types) => void;
  closeID: ({ name, id }: types) => void;
  isRenderID: ({ name, id }: types) => boolean;
  uuidTelas: types[];
}

export const TelasStore = create<TelasFunctionTypes>()(
  persist(
    (set, get) => ({
      uuidTelas: [],

      openID: ({ name, id, status }) => {
        setTimeout(() => {
          set((s) => ({
            uuidTelas: [...s.uuidTelas, { name: name, id: id, status: status }],
          }));
        }, 300);
      },

      closeID: ({ name, id }) => {
        const { uuidTelas } = get();

        const closedTelas = uuidTelas.filter((t) => t.name !== name && t.id !== id);

        setTimeout(() => {
          set({
            uuidTelas: closedTelas,
          });
        }, 300);
      },

      isRenderID: ({ name, id }) => {
        const { uuidTelas } = get();

        return uuidTelas.some((t) => t?.name === name && t?.id === id && t?.status === true);
      },
    }),
    {
      partialize: (s) => Object.fromEntries(Object.entries(s).filter(([, value]) => typeof value !== "function")),
      name: "Telas-store",
    },
  ),
);
