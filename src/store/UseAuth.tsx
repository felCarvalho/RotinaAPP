import { create } from "zustand";
import { persist } from "zustand/middleware";

interface autuhTypes {
  user: [
    {
      senha: string;
      usuario: string;
      email: string;
    },
  ];

  userCreate: {
    senha: string;
    usuario: string;
    email: string;
  };

  loginStatus: boolean;

  loginUser: ({ login }: { login: { email: string; senha: string; usuario: string } }) => void;
}

export const AuthStore = create<autuhTypes>()(
  persist(
    (set, get) => ({
      user: [
        {
          senha: "",
          usuario: "",
          email: "",
        },
      ],
      userCreate: {
        senha: "",
        usuario: "",
        email: "",
      },
      loginStatus: false,

      setUser: ({ create }: { create: { senha: string; email: string; usuario: string } }) => {
        set((s) => ({
          ...s,
          userCreate: create,
        }));
      },

      creatUser: () => {
        const { user, userCreate } = get();

        const verificando = user.some((s) => s?.email !== userCreate?.email || s?.usuario !== userCreate?.usuario);

        if (!verificando) {
          return;
        }

        set((s) => ({
          ...s,
          user: [{ ...s.user, ...userCreate }],
        }));
      },

      loginUser: ({ login }) => {
        const { user } = get();

        const loginVerificado = user.some(
          (s) => s?.email === login?.email && s?.usuario === login?.usuario && s?.senha === login?.senha,
        );

        return loginVerificado
          ? set({
              loginStatus: true,
            })
          : set({
              loginStatus: false,
            });
      },
    }),

    {
      partialize: (s) => Object.fromEntries(Object.entries(s).filter(([, value]) => typeof value !== "function")),
      name: "Auth",
    },
  ),
);
/*
 setCreateUser: ({ create }: { create: { senha: string; email: string; usuario: string } }) => {
        set((s) => ({
          ...s,
          create,
        }));

          verificarUserLogin: () => {
        const { user } = get();

        const verificar = user.every((u) => {
          if (u?.email) {
          }
        });
      },
    }),
      }, 
      
      {
      partialize: (s) => Object.fromEntries(Object.entries(s).filter(([, value]) => typeof value !== "function")),
      name: "Auth",
    },*/
