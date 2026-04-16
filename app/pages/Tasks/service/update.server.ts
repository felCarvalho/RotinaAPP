import { z } from "zod";
import { getSession, commitSession, getCookieTokens } from "../../../utils/cookies/cookies.server";
import { data } from "react-router";
import axios from "axios";
import { LOCAL_URL } from "~/utils/constants/contants.server";
import type { Token } from "../../../utils/context/type.server";

const schemaUpdateTasks = z.object({
  completed: z.optional(
    z.enum(["Concluída", "Incompleta"], { error: "Ops, status inválido" }),
  ),
  titleTask: z.optional(z.string()),
  descriptionTask: z.optional(z.string()),
  idTask: z.optional(z.string()),
});

export async function updateTasks({
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

  const taskUpdate = Object.fromEntries(formData);

  const parsedTaskUpdate = schemaUpdateTasks.safeParse(taskUpdate);

  if (!parsedTaskUpdate.success) {
    const validateUpdate = z.flattenError(parsedTaskUpdate.error);
    return data(validateUpdate.fieldErrors, {
      headers: {
        "Set-Cookie": await commitSession(setCookie),
      },
      status: 400,
    });
  }

  try {
    const response = await axios.patch(
      `home/${parsedTaskUpdate.data.idTask}`,
      {
        completed: parsedTaskUpdate.data.completed,
        titleTask: parsedTaskUpdate.data.titleTask,
        descriptionTask: parsedTaskUpdate.data.descriptionTask,
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
    console.log(error);
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
