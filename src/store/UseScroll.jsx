import { create } from "zustand";

export const ScrollStore = create((set, get) => ({
  scrollOn: {
    scrollAtual: 0,
    pixelsAtual: 0,
    isScroll: null,
  },

  OnScroll: ({scrollValue, scrollH, clientH, pixels}) => {
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
        scrollOn: { ...state.scrollOn, scrollAtual: scrollValue, isScroll: null },
      }));
    }

    //retiramos o popup se o...
    if (scrollValue + clientH + 5 >= scrollH) {
      set((state) => ({
        scrollOn: { ...state.scrollOn, scrollAtual: scrollValue, isScroll: null },
      }));
    }

    set((state) => ({
      scrollOn: { ...state.scrollOn, scrollAtual: scrollValue },
    }));
  },
}));
