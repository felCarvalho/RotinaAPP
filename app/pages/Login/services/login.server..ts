import axios, { isAxiosError } from "axios";
import { data, redirect } from "react-router";
import { z } from "zod";
import { commitSession, getSession } from "~/utils/cookies/cookies.server";
import { LOCAL_URL } from "~/utils/constants/contants.server";

const schemaLogin = z.object({
  identifier: z.email({ error: "Email inválido para login" }),
  password: z
    .string()
    .min(6, { error: "Senha deve ter pelo menos 6 caracteres" })
    .max(150, { error: "Senha deve ter somente 150 caracteres" }),
});

export async function loginAccount({
  formData,
  cookieSession,
}: {
  formData: FormData;
  cookieSession: string | null;
}) {
  const form = Object.fromEntries(formData);
  const session = await getSession(cookieSession);

  const schemaLoginRsult = schemaLogin.safeParse(form);

  if (!schemaLoginRsult.success) {
    const erros = z.flattenError(schemaLoginRsult.error);
    return data(
      {
        errors: erros.fieldErrors,
      },
      {
        status: 400,
      },
    );
  }

  try {
    const response = await axios.post(
      "/login",
      {
        identifier: schemaLoginRsult.data.identifier,
        password: schemaLoginRsult.data.password,
      },
      {
        baseURL: LOCAL_URL,
      },
    );

      console.log(response)

    const { accessToken, refreshToken, expAccessToken } = response.data;
    const expAccessTokenDate = new Date(expAccessToken * 1000);
    //aplicando uma mensagem rapida e de visualização unica na tela inicial
    session.flash("notification", `Seja bem-vindo(a) ao Minha Rotina!`);
    //persistindo os tokens do usuario para acesso e refreshToken
    session.set("accessToken", accessToken);
    session.set("refreshToken", refreshToken);
    session.set("expAccessToken", expAccessTokenDate);

    return redirect("/home", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } catch (error) {
    if (isAxiosError(error)) {
      return data(
        {
          data: error.response?.data,
        },
        {
          status: error.response?.status,
        },
      );
    }

    return data(
      {
        data: {
          message: "Ops! erro interno ao fazer login",
          error: error,
          status: 500,
        },
      },
      {
        status: 500,
      },
    );
  }
}
