import { data } from "react-router";
import axios, { isAxiosError } from "axios";
import { LOCAL_URL } from "../../../utils/constants/contants.server";
import {
  commitSession,
  getCookieTokens,
  getSession,
} from "../../../utils/cookies/cookies.server";
import type { Token } from "../../../utils/context/type.server";

export async function sendChatMessage({
  data: parsedData,
  cookieSession,
  context,
}: {
  cookieSession: string | null;
  context: Token | null;
  data: { question: string };
}) {
  const setCookie = await getSession(cookieSession);

  if (context) {
    setCookie.set("accessToken", context?.accessToken);
    setCookie.set("refreshToken", context?.refreshToken);
    setCookie.set("expAccessToken", context?.expAccessToken);
  }

  const session = await getCookieTokens({ cookiesSession: cookieSession });

  try {
    const response = await axios.post(
      "chat-minha-rotina",
      { question: parsedData.question },
      {
        baseURL: LOCAL_URL,
        headers: {
          Cookie: `accessToken=${context?.accessToken ?? session?.accessToken}`,
        },
      },
    );

    return data(
      { data: response.data },
      {
        headers: {
          "Set-Cookie": await commitSession(setCookie),
        },
      },
    );
  } catch (error) {
    console.error(error);
    if (isAxiosError(error)) {
      return data(
        { data: error.response?.data },
        { status: error.response?.status },
      );
    }

    return data(
      { data: { message: "Ops! erro interno ao enviar mensagem", error } },
      { status: 500 },
    );
  }
}
