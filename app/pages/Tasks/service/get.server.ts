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
  const session = await getCookieTokens({ cookiesSession });
  const setCookie = await getSession(cookiesSession);

  setCookie.set(
    "accessToken",
    context ? context?.accessToken : session && session?.accessToken,
  );
  setCookie.set(
    "refreshToken",
    context ? context?.refreshToken : session && session?.refreshToken,
  );
  setCookie.set(
    "expAccessToken",
    context ? context?.expAccessToken : session && session?.expAccessToken,
  );

  try {
    const response = await axios.get("/home", {
      baseURL: LOCAL_URL,
      headers: {
        Cookie: `accessToken=${context ? context?.accessToken : session ? session?.accessToken : ""}`,
      },
    });

    return data(
      {
        data: response.data,
      },
      {
        headers: {
          "Set-Cookie": await commitSession(setCookie),
        },
        status: 200,
      },
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return data(
        {
          data: error.response?.data,
        },
        {
          status: error.response?.status,
        },
      );
    }

    return data({
      data: {
        message: "Ops! erro interno ao buscar rotinas",
        error: error,
        status: 500,
      },
    });
  }
}
