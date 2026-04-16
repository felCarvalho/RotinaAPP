import { getSession, commitSession, getCookieTokens } from "~/utils/cookies/cookies.server";
import { data } from "react-router";
import axios from "axios";
import { LOCAL_URL } from "~/utils/constants/contants.server";
import { z } from "zod";
import type { Token } from "../../../../utils/context/type.server";

const schemaIdTask = z.object({
  idTask: z.string().min(5, { error: "Ops, id inválido" }),
});

export async function deleteTaskRascunho({
  cookieSession,
  formData,
  context,
}: {
  cookieSession: string | null;
  formData: FormData;
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
  const validateSchema = schemaIdTask.safeParse(form);

  if (!validateSchema.success) {
    const error = z.flattenError(validateSchema.error);
    return data(error, { status: 400 });
  }

  try {
    const response = await axios.delete(`/home/${validateSchema.data.idTask}`, {
      baseURL: LOCAL_URL,
      headers: {
        Cookie: `accessToken=${context?.accessToken || session?.accessToken}`,
      },
    });
    return data(response.data, {
      headers: {
        "Set-Cookie": await commitSession(setCookie),
      },
      status: 200,
    });
  } catch (e) {
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
        data: "Erro ao executar a action",
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
