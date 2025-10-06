import { create } from "zustand";
import { persist } from "zustand/middleware";

interface userAuthTypes {
  user: string;
  email: string;
  password: string;
  id: string;
}

interface errorUser {
  user: string;
  email: string;
  password: string;
}

interface errorUserResponseTypes {
  message: string;
  error: errorUser;
}

interface AuthStateTypes {
  users: userAuthTypes[];
  idLogin: string;
  message: errorUserResponseTypes;
  verificarPassword: ({ password }: { password: string }) => boolean;
  verificarUser: ({ user }: { user: string }) => boolean;
  verificarEmail: ({ email }: { email: string }) => boolean;
  verificarEmailCreateAccount: ({ email }: { email: string }) => boolean;
  verificarUserCreateAccount: ({ user }: { user: string }) => boolean;
  verificarUserLogin: ({ user }: { user: string }) => boolean;
  verificarPasswordLogin: ({ password }: { password: string }) => boolean;
  createUser: ({ user, email, password, id }: userAuthTypes) => void;
  loginUser: ({ user, password }: { user: string; password: string }) => void;
  logOut: () => boolean;
  buscarUser: () => userAuthTypes;
  deletarUser: () => boolean;
  responseUser: ({ message, user, email, password }: { message: string; user: string; email: string; password: string }) => void;
}

export const AuthStore = create<AuthStateTypes>()(
  persist(
    (set, get) => ({
      users: [],
      idLogin: "",
      message: {
        message: "",
        error: { user: "", email: "", password: "" },
      },

      responseUser: ({ message, user, email, password }) => {
        set((s) => ({
          ...s,
          message: { message: message, error: { user: user, email: email, password: password } },
        }));
      },

      verificarPassword: ({ password }) => {
        const { users } = get();

        return users.some((p) => p?.password === password);
      },

      verificarUser: ({ user }) => {
        const { users } = get();

        return users.some((u) => u?.user === user);
      },

      verificarEmail: ({ email }) => {
        const { users } = get();

        return users.some((e) => e?.email === email);
      },

      buscarUser: () => {
        const { users, idLogin } = get();

        const buscarUser = users.find((u) => u?.id === idLogin) ?? {
          user: "",
          email: "",
          password: "",
          id: "",
        };

        return buscarUser;
      },

      verificarEmailCreateAccount: ({ email }) => {
        const { verificarEmail, responseUser, message } = get();

        const verificandoEmail = verificarEmail({ email: email });
        if (verificandoEmail) {
          responseUser({
            message: "Ops, impossivel criar conta",
            user: message?.error?.user,
            email: "Ops, email já existe",
            password: message?.error?.password,
          });
        }

        if (!verificandoEmail) {
          responseUser({
            message: "",
            user: message?.error?.user,
            email: "",
            password: message?.error?.password,
          });
        }

        return verificandoEmail;
      },

      verificarUserCreateAccount: ({ user }) => {
        const { verificarUser, responseUser, message } = get();

        const verificandoUser = verificarUser({ user: user });
        if (verificandoUser) {
          responseUser({
            message: "Ops, impossivel criar conta",
            user: "Ops, esse usuário já existe",
            email: message?.error?.email,
            password: message?.error?.password,
          });
        }

        if (!verificandoUser) {
          responseUser({
            message: "",
            user: "",
            email: message?.error?.email,
            password: message?.error?.password,
          });
        }

        return verificandoUser;
      },

      verificarUserLogin: ({ user }) => {
        const { verificarUser, responseUser, message } = get();

        const verificandoUser = verificarUser({ user: user });
        if (!verificandoUser) {
          responseUser({
            message: "Ops, não foi possivel realizar login",
            user: "Ops, usuário não existe",
            email: message?.error?.email,
            password: message?.error?.password,
          });
        }

        if (verificandoUser) {
          responseUser({
            message: "",
            user: "",
            email: message?.error?.email,
            password: message?.error?.password,
          });
        }

        return verificandoUser;
      },

      verificarPasswordLogin: ({ password }) => {
        const { verificarPassword, responseUser, message } = get();

        const verificandoPassword = verificarPassword({ password: password });

        if (!verificandoPassword) {
          responseUser({
            message: "Ops, não foi possivel fazer login",
            user: message?.error?.user,
            email: message?.error?.email,
            password: "Ops, senha incorreta",
          });
        }

        if (verificandoPassword) {
          responseUser({
            message: "",
            user: message?.error?.user,
            email: message?.error?.email,
            password: "",
          });
        }

        return verificandoPassword;
      },

      createUser: ({ user, email, password, id }) => {
        const { verificarUser, verificarEmail, responseUser } = get();

        const verificandoUser = verificarUser({ user: user });
        const verificandoEmail = verificarEmail({ email: email });

        if (verificandoEmail || verificandoUser) {
          return;
        }

        responseUser({ message: "Sua conta foi criada com sucesso", user: "", email: "", password: "" });
        set((s) => ({
          ...s,
          users: [...s.users, { user: user, email: email, password: password, id: id }],
        }));
      },

      loginUser: ({ user, password }) => {
        const { users, verificarUser, verificarPassword, responseUser } = get();

        const verificandoUser = verificarUser({ user: user });
        const verificandoPassword = verificarPassword({ password: password });

        if (!verificandoUser || !verificandoPassword) {
          return;
        }

        const buscarId = users.find((id) => id?.user === user && id?.password === password)?.id ?? "";
        responseUser({ message: "Login realizado com sucesso", user: "", email: "", password: "" });
        set((s) => ({
          ...s,
          idLogin: buscarId,
        }));
      },

      logOut: () => {
        const { idLogin, users, responseUser } = get();

        const sairConta = users.some((u) => u?.id === idLogin);

        if (!sairConta) {
          responseUser({ message: "Ops, impossivel sair conta.", user: "", email: "", password: "" });
        }

        responseUser({ message: "Até mais, volte sempre", user: "", email: "", password: "" });
        set((s) => ({
          ...s,
          idLogin: "",
        }));

        return sairConta;
      },

      deletarUser: () => {
        const { idLogin, users } = get();

        const deletarUser = users.filter((u) => u?.id !== idLogin);

        if (deletarUser)
          set((s) => ({
            ...s,
            users: deletarUser,
            idLogin: "",
          }));

        return !!idLogin;
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) =>
        Object.fromEntries(Object.entries(state).filter(([key, value]) => key !== "message" && typeof value !== "function")),
    },
  ),
);
