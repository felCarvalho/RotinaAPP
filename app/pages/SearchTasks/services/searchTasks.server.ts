import { LOCAL_URL } from "../../../utils/constants/contants.server";
import axios from "axios";
import { getSession, commitSession, getCookieTokens } from "../../../utils/cookies/cookies.server";
import { data } from "react-router";
import type { Token } from "../../../utils/context/type.server";

export async function searchTasks({
  cookieSession,
  url,
  context,
}: {
  cookieSession: string | null;
  url: string;
  context: Token | null;
}) {
  const urlObj = new URL(url);
  const search = urlObj.searchParams.get("search");
  const setCookie = await getSession(cookieSession);

  if (context) {
    setCookie.set("accessToken", context?.accessToken);
    setCookie.set("refreshToken", context?.refreshToken);
    setCookie.set("expAccessToken", context?.expAccessToken);
  }

  const session = await getCookieTokens({ cookiesSession: cookieSession });

  if (!search) {
    return;
  }

  try {
    const response = await axios.post(
      `home/buscar/${search}`,
      {},
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
        headers: {
          "Set-Cookie": await commitSession(setCookie),
        },
        status: error.response?.status,
      });
    }
    return data(error, {
      headers: {
        "Set-Cookie": await commitSession(setCookie),
      },
      status: 500,
    });
  }
}
