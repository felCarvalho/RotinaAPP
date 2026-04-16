import { getSession, commitSession, getCookieTokens } from "../../../utils/cookies/cookies.server";
import { LOCAL_URL } from "../../../utils/constants/contants.server";
import z from "zod";
import { data } from "react-router";
import axios from "axios";
import type { Token } from "../../../utils/context/type.server";

const schemaCreateTarefa = z.object({
  titleTask: z
    .string()
    .min(1, { error: "Por favor, sua task precisa ter algum valor" })
    .max(400, { error: "Ops, maximo de caraateres atingido" }),
  descriptionTask: z
    .string()
    .min(0)
    .max(400, { error: "Ops, maximo de caracteres atingido" })
    .optional(),
});

export async function createTarefa({
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

  const schemaSafeParse = schemaCreateTarefa.safeParse(form);

  if (!schemaSafeParse.success) {
    const error = z.flattenError(schemaSafeParse.error).fieldErrors;
    return data(error, {
      status: 400,
    });
  }

  try {
    const response = await axios.post(
      "home/criar-tarefa",
      {
        titleTask: form.titleTask,
        descriptionTask: form.descriptionTask,
      },
      {
        baseURL: LOCAL_URL,
        headers: {
          Cookie: `accessToken=${context?.accessToken || session?.accessToken}`,
        },
      },
    );

    return data(response.data, {
      headers: {
        "Set-Cookie": await commitSession(setCookie),
      },
      status: response.status,
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return data(error.response?.data, {
        status: error.response?.status || 500,
        headers: {
          "Set-Cookie": await commitSession(setCookie),
        },
      });
    }
  }

  return data(
    {
      data: "Ops, erro interno da action",
    },
    {
      status: 500,
      headers: {
        "Set-Cookie": await commitSession(setCookie),
      },
    },
  );
}
