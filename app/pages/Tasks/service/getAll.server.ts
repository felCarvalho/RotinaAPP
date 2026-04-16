import { data } from "react-router";
import axios from "axios";
import { LOCAL_URL } from "../../../utils/constants/contants.server";
import {
  commitSession,
  getCookieTokens,
} from "../../../utils/cookies/cookies.server";
import { getSession } from "../../../utils/cookies/cookies.server";
import type { Token } from "../../../utils/context/type.server";

export async function getTasksUser({
  cookiesSession,
  context,
}: {
  cookiesSession: string | null;
  context: Token | null;
}) {
  const setCookie = await getSession(cookiesSession);

  if (context) {
    setCookie.set("accessToken", context?.accessToken);
    setCookie.set("refreshToken", context?.refreshToken);
    setCookie.set("expAccessToken", context?.expAccessToken);
  }

  const session = await getCookieTokens({ cookiesSession });

  try {
    const response = await axios.get("/home", {
      headers: {
        Cookie: `accessToken=${context?.accessToken || session?.accessToken}`,
      },
      baseURL: LOCAL_URL,
    });

    return data(response.data, {
      headers: {
        "Set-Cookie": await commitSession(setCookie),
      },
      status: 200,
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return data(error.response?.data, {
        headers: {
          "Set-Cookie": await commitSession(setCookie),
        },
        status: error.response?.status,
      });
    }

    return data(
      {
        message: "Ops! erro interno ao buscar rotinas",
        error: error,
        code: 500,
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
