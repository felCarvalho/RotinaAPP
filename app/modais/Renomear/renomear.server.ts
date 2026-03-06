import { z } from "zod";
import { getSession } from "~/utils/cookies/cookies.server";
import { data } from "react-router";
import { ActionTypesRequests } from "~/utils/typesGlobals/type.server";
import axios from "axios";
import { LOCAL_URL } from "~/utils/constants/contants.server";

const schemaRenomearTasks = z.object({
  publicId: z.string(),
  renomear: z.string().min(2, { error: "Rotina não encontrada" }),
});

export async function renomearTasks({
  formData,
  cookieSession,
}: {
  formData: FormData;
  cookieSession: string | null;
}) {
  const form = Object.fromEntries(formData);
  const session = await getSession(cookieSession);

  const validateRenomearTasks = schemaRenomearTasks.safeParse(form);

  if (!validateRenomearTasks.success) {
    const validateErrors = z.flattenError(validateRenomearTasks.error);
    return data(
      {
        type: ActionTypesRequests.ERROR_VALIDATION as const,
        errors: validateErrors.fieldErrors,
      },
      {
        status: 400,
      },
    );
  }

  try {
    const response = await axios.patch(
      `/home/${validateRenomearTasks.data.publicId}`,
      {
        title: validateRenomearTasks.data.renomear,
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
        type: ActionTypesRequests.SUCCESS as const,
        data: response.data,
      },
      {
        status: 200,
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
          message: "Ops, erro ao renoemar sua rotina",
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
