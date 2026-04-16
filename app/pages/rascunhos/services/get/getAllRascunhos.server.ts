import { LOCAL_URL } from "../../../../utils/constants/contants.server";
import { getSession, commitSession, getCookieTokens } from "../../../../utils/cookies/cookies.server";
import { data } from "react-router";
import axios from "axios";
import type { Token } from "../../../../utils/context/type.server";

export async function getAllRascunho({
  cookieSession,
  context,
}: {
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

  try {
    const response = await axios.get("home/rascunhos", {
      baseURL: LOCAL_URL,
      headers: {
        Cookie: `accessToken=${context?.accessToken || session?.accessToken}`,
      },
    });

    return data(response.data, {
      headers: {
        "Set-Cookie": await commitSession(setCookie),
      },
      status: response.status,
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return data(
        {
          data: error.response?.data,
        },
        {
          headers: {
            "Set-Cookie": await commitSession(setCookie),
          },
          status: error.response?.status || 500,
        },
      );
    }

    return data(
      {
        data: "Ops! erro interno no loader",
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
