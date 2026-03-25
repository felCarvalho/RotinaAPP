import { z } from "zod";
import { getSession } from "../../../utils/cookies/cookies.server";
import { data } from "react-router";
import axios from "axios";
import { LOCAL_URL } from "~/utils/constants/contants.server";

const schemaUpdateTasks = z.object({
  completed: z.optional(z.string()),
  titleTask: z.optional(z.string()),
  descriptionTask: z.optional(z.string()),
  idTask: z.optional(z.string()),
});

export async function updateTasks({
  formData,
  cookieSession,
}: {
  formData: FormData;
  cookieSession: string | null;
}) {
  const session = await getSession(cookieSession);
  const taskUpdate = Object.fromEntries(formData);

  const parsedTaskUpdate = schemaUpdateTasks.safeParse(taskUpdate);

  if (!parsedTaskUpdate.success) {
    const validateUpdate = z.flattenError(parsedTaskUpdate.error);
    return data(
      {
        errors: validateUpdate.fieldErrors,
      },
      {
        status: 400,
      },
    );
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
          Cookie: `accessToken=${session.get("accessToken")}`,
        },
      },
    );

    return data(
      {
        data: response.data,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log(error);
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

    return data(
      {
        data: {
          message: "Ops! erro interno ao atualizar a rotina",
          error: error,
          status: 500,
        },
      },
      {
        status: 500,
      },
    );
  }
}
