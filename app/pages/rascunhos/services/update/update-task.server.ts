import { z } from "zod";
import { getSession, commitSession, getCookieTokens } from "~/utils/cookies/cookies.server";
import { data } from "react-router";
import axios from "axios";
import { LOCAL_URL } from "~/utils/constants/contants.server";
import type { Token } from "../../../../utils/context/type.server";

const schemaUpdateTask = z.object({
  titleTask: z
    .string({
      error: "Ops, o título da tarefa é obrigatório",
    })
    .min(5, { error: "Ops, sua task precisa ter no minino 5 caracteres" })
    .max(50, {
      error: "Ops, o título da tarefa pode ter no máximo 50 caracteres",
    }),
  descriptionTask: z
    .string()
    .max(400, { error: "Ops, descrição pode ter no máximo 400 caracteres" })
    .optional(),
  idUser: z
    .string("Ops, o ID do usuário é obrigatório")
    .min(5, { error: "Ops, seu id precisa ter no minimo 5 caracteres" })
    .max(400, {
      error: "Ops, o ID do usuário pode ter no máximo 400 caracteres",
    }),
  idTask: z
    .string("Ops, o ID da tarefa é obrigatório")
    .min(5, {
      error: "Ops, o ID da tarefa precisa ter no mínimo 5 caracteres",
    })
    .max(400, {
      error: "Ops, o ID da tarefa pode ter no máximo 400 caracteres",
    }),
});

export async function updateTaskRascunho({
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
  const schemaTask = schemaUpdateTask.safeParse(form);

  if (!schemaTask.success) {
    const error = z.flattenError(schemaTask.error);
    return data(error.fieldErrors, { status: 400 });
  }

  try {
    const response = await axios.patch(
      `/home/${schemaTask.data.idTask}`,
      {
        ...form,
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
