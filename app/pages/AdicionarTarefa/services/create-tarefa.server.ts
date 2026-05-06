import {
  getSession,
  commitSession,
  getCookieTokens,
} from "../../../utils/cookies/cookies.server";
import { LOCAL_URL } from "../../../utils/constants/contants.server";
import { data } from "react-router";
import axios from "axios";
import type { Token } from "../../../utils/context/type.server";
import type { CreateTaskProps } from "../../../utils/schemas/task.schema";

export async function createTarefa({
  validatedData,
  cookieSession,
  context,
}: {
  validatedData: CreateTaskProps;
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
      "home/adicionar-tarefa",
      {
        titleTask: validatedData.titleTask,
        descriptionTask: validatedData.descriptionTask,
        idCategory: validatedData.idCategory,
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
        status: error.response?.status || 500,
        headers: {
          "Set-Cookie": await commitSession(setCookie),
        },
      });
    }
  }

  return data(
    {
      data: "Ops, erro interno da action",
    },
    {
      status: 500,
      headers: {
        "Set-Cookie": await commitSession(setCookie),
      },
    },
  );
}
