import { getSession } from "~/utils/cookies/cookies.server";
import { data } from "react-router";
import axios from "axios";
import { LOCAL_URL } from "~/utils/constants/contants.server";
import { z } from "zod";

const schemaIdCategory = z.object({
  idCategory: z.string().min(5, { error: "Ops, id inválido" }),
});

export async function deleteCategoryRascunho({
  cookieSession,
  formData,
}: {
  cookieSession: string | null;
  formData: FormData;
}) {
  const session = await getSession(cookieSession);
  const form = Object.fromEntries(formData);
  const validateSchema = schemaIdCategory.safeParse(form);

  if (!validateSchema.success) {
    const error = z.flattenError(validateSchema.error);
    return data(error, { status: 400 });
  }

  try {
    const response = await axios.delete(
      `/home/rascunhos/deletar-categoria/${validateSchema.data.idCategory}`,
      {
        baseURL: LOCAL_URL,
        headers: {
          Cookie: `accessToken=${session.get("accessToken")}`,
        },
      },
    );
    return data(response.data, { status: 200 });
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return data(e.response?.data, { status: e.response?.status });
    }

    return data(
      {
        status: 500,
        data: "Erro ao executar a action",
        error: e,
      },
      {
        status: 500,
      },
    );
  }
}
