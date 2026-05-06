import {
  getSession,
  commitSession,
  getCookieTokens,
} from "../../../utils/cookies/cookies.server";
import { data } from "react-router";
import axios from "axios";
import { LOCAL_URL } from "~/utils/constants/contants.server";
import type { Token } from "../../../utils/context/type.server";
import type { UpdateTaskTitleProps } from "../../../utils/schemas/task.schema";

export async function updateTitleTasks({
  validatedData,
  cookieSession,
  context,
}: {
  validatedData: UpdateTaskTitleProps;
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
    const response = await axios.patch(
      `/home/${validatedData.idTask}`,
      {
        completed: validatedData.completed,
        titleTask: validatedData.titleTask,
        descriptionTask: validatedData.descriptionTask,
        idUser: validatedData.idUser,
        idTask: validatedData.idTask,
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
        headers: {
          "Set-Cookie": await commitSession(setCookie),
        },
        status: error.response?.status,
      });
    }

    return data(
      {
        message: "Ops! erro interno ao atualizar a rotina",
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
