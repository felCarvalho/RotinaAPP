import { create } from "zustand";

export const RenomearStore = create((set) => ({
  rotinaNew: "",

  setRotinaNew: (rotina) => {
    set({
      rotinaNew: rotina,
    });
  },
}));
