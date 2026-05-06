import { getSession, commitSession, getCookieTokens } from "~/utils/cookies/cookies.server";
import { data } from "react-router";
import axios from "axios";
import { LOCAL_URL } from "~/utils/constants/contants.server";
import type { Token } from "../../../../utils/context/type.server";
import type { IdTaskProps } from "../../controllers/schemas";

export async function deleteTaskRascunho({
  cookieSession,
  validatedData,
  context,
}: {
  cookieSession: string | null;
  validatedData: IdTaskProps;
  context: Token | null;
}) {
  const setCookie = await getSession(cookieSession);

  if (context) {
    setCookie.set("accessToken", context?.accessToken);
    setCookie.set("refreshToken", context?.refreshToken);
    setCookie.set("expAccessToken", context?.expAccessToken);
  }

  const session = await getCookieTokens({ cookiesSession: cookieSession });

  try {
    const response = await axios.delete(`/home/${validatedData.idTask}`, {
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
