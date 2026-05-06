import { data } from "react-router";
import axios from "axios";
import { LOCAL_URL } from "~/utils/constants/contants.server";
import {
  getSession,
  commitSession,
  getCookieTokens,
} from "../../../utils/cookies/cookies.server";
import type { Token } from "../../../utils/context/type.server";
import type { CreateRotinaProps } from "../../../utils/schemas/rotina.schema";

export async function createRotina({
  validatedData,
  cookieSession,
  context,
}: {
  validatedData: CreateRotinaProps;
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
    const response = await axios.post(
      "home/criar-rotina",
      {
        titleTask: validatedData.titleTask,
        descriptionTask: validatedData.descriptionTask,
        titleCategory: validatedData.titleCategory,
        descriptionCategory: validatedData.descriptionCategory,
        status: "Ativa",
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
      status: 200,
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
        message: "Ops! tivemos algum problema ao criar sua rotina",
        error: error,
        status: 500,
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
