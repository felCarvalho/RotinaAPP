import { data } from "react-router";
import { z } from "zod";
import axios from "axios";
import { LOCAL_URL } from "~/utils/constants/contants.server";
import {
  getSession,
  commitSession,
  getCookieTokens,
} from "../../../utils/cookies/cookies.server";
import type { Token } from "../../../utils/context/type.server";

const schemaCreateRotina = z.object({
  titleTask: z
    .string()
    .min(5, { error: "Minimo de 5 caracteres para criar um titulo" })
    .max(255, { error: "Maximo de 255 caracteres para seu titulo" }),
  descriptionTask: z
    .string()
    .min(0, { error: "Minimo de 0 caracteres para criar uma descrição" })
    .max(400, { error: "Máximo de 400 caracteres para sua descrição" }),
  titleCategory: z
    .string()
    .min(5, { error: "Minimo de 5 caracteres para criar uma categoria" })
    .max(255, { error: "Maximo de 255 caracteres para sua categoria" }),
  descriptionCategory: z
    .string()
    .min(0, { error: "Minimo de 0 caracteres para criar uma descrição" })
    .max(400, { error: "Máximo de 400 caracteres para sua descrição" }),
});

export async function createRotina({
  formData,
  cookieSession,
  context,
}: {
  formData: FormData;
  cookieSession: string | null;
  context: Token | null;
}) {
  const setCookie = await getSession(cookieSession);

  if (context) {
    setCookie.set("accessToken", context?.accessToken);
    setCookie.set("refreshToken", context?.refreshToken);
    setCookie.set("expAccessToken", context?.expAccessToken);
  }

  const session = await getCookieTokens({ cookiesSession: cookieSession });

  const form = Object.fromEntries(formData);

  const schemaRotina = schemaCreateRotina.safeParse(form);

  if (!schemaRotina.success) {
    const validate = z.flattenError(schemaRotina.error);
    return data(
      {
        errors: validate.fieldErrors,
      },
      { status: 400 },
    );
  }

  try {
    const response = await axios.post(
      "home/criar-rotina",
      {
        titleTask: schemaRotina.data.titleTask,
        descriptionTask: schemaRotina.data.descriptionTask,
        titleCategory: schemaRotina.data.titleCategory,
        descriptionCategory: schemaRotina.data.descriptionCategory,
        status: "Ativa",
      },
      {
        baseURL: LOCAL_URL,
        headers: {
          Cookie: `accessToken=${context?.accessToken || session?.accessToken}`,
        },
      },
    );

    return data(
      {
        data: response.data,
      },
      {
        headers: {
          "Set-Cookie": await commitSession(setCookie),
        },
        status: 200,
      },
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return data(
        {
          data: error.response?.data,
        },
        {
          status: error.response?.status,
          headers: {
            "Set-Cookie": await commitSession(setCookie),
          },
        },
      );
    }

    return data(
      {
        data: {
          message: "Ops! tivemos algum problema ao criar sua rotina",
          error: error,
          status: 500,
        },
      },
      {
        status: 500,
        headers: {
          "Set-Cookie": await commitSession(setCookie),
        },
      },
    );
  }
}
