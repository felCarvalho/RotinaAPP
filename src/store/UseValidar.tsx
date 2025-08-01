import { create } from "zustand";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";

type types = {
  message: string;
  icon: IconProp | null;
  timeOut?: ReturnType<typeof setTimeout> | null;
  status?: boolean;
};

interface ValidarStoreTypes extends types {
  validar: (message: string, icon: IconProp, tempo: number) => void;
  isValidar: () => void;
}

export const Validar = create<ValidarStoreTypes>()((set, get) => ({
  //variaveis para armazenar state atual das propriedades
  status: false,
  message: "",
  icon: null,
  timeOut: null,

  //recebe os dados para exibir o pop-up
  validar: (message, icon, tempo) => {
    const { timeOut } = get();

    if (timeOut) {
      clearTimeout(timeOut);
    }

    //captura o id do setTimeOut gerado para saber qual timer limpar no if superior
    const novoIdTimeout = setTimeout(() => {
      set({
        status: false,
        message: "",
        icon: null,
        timeOut: null,
      });
    }, tempo);

    //exibe o pop-up com os dados atuais
    set({
      status: true,
      message: message,
      icon: icon,
      timeOut: novoIdTimeout,
    });
  },

  //parametro para exibir pop-up
  isValidar: () => {
    return get().status === true;
  },
}));
