import { z } from "zod";
import { getSession, commitSession, getCookieTokens } from "~/utils/cookies/cookies.server";
import { data } from "react-router";
import axios from "axios";
import { LOCAL_URL } from "~/utils/constants/contants.server";
import type { Token } from "../../../utils/context/type.server";

const schemaDelete = z.object({
  idTask: z.string().min(1, { error: "ID inválido" }),
});

export async function deleteTasks({
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
  const publicIdValidate = schemaDelete.safeParse(form);

  if (!publicIdValidate.success) {
    const validateErrors = z.flattenError(publicIdValidate.error);

    return data(
      {
        errors: validateErrors.fieldErrors,
      },
      {
        headers: {
          "Set-Cookie": await commitSession(setCookie),
        },
        status: 400,
      },
    );
  }

  try {
    const response = await axios.delete(
      `/home/${publicIdValidate.data.idTask}`,
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
      return data(error.response?.status, {
        headers: {
          "Set-Cookie": await commitSession(setCookie),
        },
        status: error.response?.status,
      });
    }

    return data(
      {
        message: "Ops! erro interno ao deletar a rotina",
        error: error,
        status: 500,
      },
      {
        headers: {
          "Set-Cookie": await commitSession(setCookie),
        },
        status: 500,
      },
    );
  }
}
