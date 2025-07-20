import { create } from "zustand";

export const Validar = create((set, get) => ({
  //variaveis para armazenar state atual das propriedades
  status: false,
  mensagem: "",
  icon: "",
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
        mensagem: "", 
        icon: "",
        timeOut: null,
      });
    }, tempo);

    //exibe o pop-up com os dados atuais
    set({
      status: true,
      mensagem: message,
      icon: icon,
      timeOut: novoIdTimeout,
    });
  },

  //parametro para exibir pop-up
  isValidar: () => {
    return get().status === true;
  },
}));
