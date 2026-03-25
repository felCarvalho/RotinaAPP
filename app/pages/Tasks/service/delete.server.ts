import { z } from "zod";
import { getSession } from "~/utils/cookies/cookies.server";
import { data } from "react-router";
import { ActionTypesRequests } from "~/utils/typesGlobals/type.server";
import axios from "axios";
import { LOCAL_URL } from "~/utils/constants/contants.server";

const schemaDelete = z.object({
  idTask: z.string().min(1, { error: "ID inválido" }),
});

export async function deleteTasks({
  formData,
  cookieSession,
}: {
  formData: FormData;
  cookieSession: string | null;
}) {
  const form = Object.fromEntries(formData);
  const session = await getSession(cookieSession);

  const publicIdValidate = schemaDelete.safeParse(form);

  if (!publicIdValidate.success) {
    const validateErrors = z.flattenError(publicIdValidate.error);

    return data(
      {
        errors: validateErrors.fieldErrors,
      },
      {
        status: 400,
      },
    );
  }

  try {
    const response = await axios.delete(
      `/home/${publicIdValidate.data.idTask}`,
      {
        baseURL: LOCAL_URL,
        headers: {
          Cookie: `accessToken=${session.get("accessToken")}`,
        },
      },
    );

    return data(
      {
        type: ActionTypesRequests.SUCCESS as const,
        data: response.data,
      },
      {
        status: response.status,
      },
    );
  } catch (error) {
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
          message: "Ops! erro interno ao deletar a rotina",
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
