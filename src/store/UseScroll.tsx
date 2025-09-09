import { create } from "zustand";

interface scrollTypes {
  OnScroll: ({
    scrollValue,
    scrollH,
    clientH,
    pixels,
  }: {
    scrollValue: number;
    scrollH: number;
    clientH: number;
    pixels: number;
  }) => void;
};

interface scrollStoreTypes extends scrollTypes {
  scrollOn: {
    scrollAtual: number;
    pixelsAtual: number;
    isScroll: boolean;
  };
}

export const ScrollStore = create<scrollStoreTypes>()((set, get) => ({
  scrollOn: {
    scrollAtual: 0,
    pixelsAtual: 0,
    isScroll: false,
  },

  OnScroll: ({ scrollValue, scrollH, clientH, pixels }) => {
    const { scrollAtual, pixelsAtual } = get().scrollOn;

    //atualiza o estado com os primeiros dados de scroll
    if (scrollAtual < scrollValue && scrollValue > pixels) {
      set((state) => ({
        scrollOn: {
          ...state.scrollOn,
          pixelsAtual: scrollValue - pixels,
          scrollAtual: scrollValue,
          isScroll: true,
        },
      }));
    }

    //retiramos o popup se o sroll...
    if (scrollAtual > scrollValue && scrollValue < pixelsAtual) {
      set((state) => ({
        scrollOn: { ...state.scrollOn, scrollAtual: scrollValue, isScroll: false },
      }));
    }

    //retiramos o popup se o...
    if (scrollValue + clientH + 5 >= scrollH) {
      set((state) => ({
        scrollOn: { ...state.scrollOn, scrollAtual: scrollValue, isScroll: false },
      }));
    }

    set((state) => ({
      scrollOn: { ...state.scrollOn, scrollAtual: scrollValue },
    }));
  },
}));
