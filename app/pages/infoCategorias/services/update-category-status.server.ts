import { z } from "zod";
import {
  getSession,
  commitSession,
  getCookieTokens,
} from "../../../utils/cookies/cookies.server";
import { data } from "react-router";
import axios from "axios";
import { LOCAL_URL } from "../../../utils/constants/contants.server";
import type { Token } from "../../../utils/context/type.server";

const schemaUpdateCategoryStatus = z.object({
  idCategory: z.string().min(1, { message: "ID da categoria inválido" }),
  completed: z.enum(["Incompleta", "Concluída"], {
    error: "Ops, situação inválida para update",
  }),
});

export async function updateCategoryTasksStatus({
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
  const validate = schemaUpdateCategoryStatus.safeParse(form);

  if (!validate.success) {
    const validateErrors = z.flattenError(validate.error);
    return data(
      {
        errors: validateErrors.fieldErrors,
      },
      {
        status: 400,
      },
    );
  }

  try {
    const response = await axios.patch(
      `home/categorias/atualizar-tarefas/${validate.data.idCategory}`,
      {
        completed: validate.data.completed,
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
        status: error.response?.status,
        headers: {
          "Set-Cookie": await commitSession(setCookie),
        },
      });
    }

    return data(
      {
        message: "Ops! erro interno ao atualizar o status da categoria",
        error: error,
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
