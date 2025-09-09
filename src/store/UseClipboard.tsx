import { create } from "zustand";

interface copy {
  text: string;
};

export const ClipBoardStore = create((set) => ({
  status: "",

  clipboard: async ({ text }: copy) => {
    if (!text.trim()) {
      set({
        status: "dado invalido para ser copiado",
      });
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      set({ status: "dado copiado com sucesso" });
    } catch (error) {
      set({
        status: `erro:${error}`,
      });
    }
  },
}));
