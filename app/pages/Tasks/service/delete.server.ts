import { z } from "zod";
import { getSession } from "~/utils/cookies/cookies.server";
import { data } from "react-router";
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

    return data(response.data, {
      status: response.status,
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return data(error.response?.status, {
        status: error.response?.status,
      });
    }

    return data(
      {
        message: "Ops! erro interno ao deletar a rotina",
        error: error,
        status: 500,
      },
      {
        status: 500,
      },
    );
  }
}
