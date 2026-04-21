import { z } from "zod";
import {
  getSession,
  commitSession,
  getCookieTokens,
} from "~/utils/cookies/cookies.server";
import { data } from "react-router";
import axios from "axios";
import { LOCAL_URL } from "~/utils/constants/contants.server";
import type { Token } from "../../../../utils/context/type.server";

const schemaCreateTaskRascunho = z.object({
  titleTask: z
    .string({
      error: "Ops, o título da tarefa é obrigatório",
    })
    .min(5, { error: "Ops, sua task precisa ter no minino 5 caracteres" })
    .max(255, {
      error: "Ops, o título da tarefa pode ter no máximo 255 caracteres",
    }),
  descriptionTask: z
    .string()
    .max(400, { error: "Ops, descrição pode ter no máximo 400 caracteres" })
    .optional(),
});

export async function createTaskRascunho({
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
  const validateSchema = schemaCreateTaskRascunho.safeParse(form);

  if (!validateSchema.success) {
    const error = z.flattenError(validateSchema.error);
    return data(error.fieldErrors, { status: 400 });
  }

  try {
    const response = await axios.post(
      "home/rascunhos/adicionar-tarefa-rascunho",
      {
        titleTask: validateSchema.data.titleTask,
        descriptionTask: validateSchema.data.descriptionTask,
        status: "Inativa",
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
  } catch (e) {
    console.error(e);

    if (axios.isAxiosError(e)) {
      return data(e.response?.data, {
        status: e.response?.status,
        headers: {
          "Set-Cookie": await commitSession(setCookie),
        },
      });
    }

    return data(
      {
        status: 500,
        message: "Erro ao executar sua action",
        error: e,
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
