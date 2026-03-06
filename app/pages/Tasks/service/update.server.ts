import { z } from "zod";
import { getSession } from "~/utils/cookies/cookies.server";
import { data } from "react-router";
import { ActionTypesRequests } from "~/utils/typesGlobals/type.server";
import axios from "axios";
import { LOCAL_URL } from "~/utils/constants/contants.server";

const schemaUpdateTasks = z.object({
  publicId: z.string().min(1),
  status: z.string().min(1),
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
        type: ActionTypesRequests.ERROR_VALIDATION as const,
        errors: validateUpdate.fieldErrors,
      },
      {
        status: 400,
      },
    );
  }

  const status =
    parsedTaskUpdate.data.status === "true" ? "Concluída" : "Pendente";

  try {
    const response = await axios.patch(
      `/home/${parsedTaskUpdate.data.publicId}`,
      {
        status: status,
      },
      {
        baseURL: LOCAL_URL,
        headers: {
          Cookie: `accessToken=${session.get("accessToken")}`,
        },
      },
    );

    // console.log(response.data);

    return data(
      {
        type: ActionTypesRequests.SUCCESS as const,
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
          type: ActionTypesRequests.ERROR_SERVER as const,
          data: error.response?.data,
        },
        {
          status: error.response?.status,
        },
      );
    }

    return data(
      {
        type: ActionTypesRequests.ERROR_INTERNAL as const,
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
