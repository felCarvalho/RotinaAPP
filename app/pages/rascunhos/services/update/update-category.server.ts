import { z } from "zod";
import { getSession } from "~/utils/cookies/cookies.server";
import { data } from "react-router";
import axios from "axios";
import { LOCAL_URL } from "~/utils/constants/contants.server";

const schemaUpdateCategory = z.object({
  titleCategory: z
    .string({
      error: "Ops, o título da categoria é obrigatório",
    })
    .min(5, { error: "Ops, categoria precisa ter no minino 5 caracteres" })
    .max(200, { error: "Ops , categoria pode ter no máximo 200 caracteres" }),
  descriptionCategory: z
    .string()
    .max(400, { error: "Ops, descrição pode ter no máximo 400 caracteres" })
    .optional(),
  idCategory: z
    .string("Ops, o ID da categoria é obrigatório")
    .min(5, {
      error: "Ops, o ID da categoria precisa ter no mínimo 5 caracteres",
    })
    .max(400, {
      error: "Ops, o ID da categoria pode ter no máximo 400 caracteres",
    }),
});

export async function updateCategoryRascunho({
  formData,
  cookieSession,
}: {
  formData: FormData;
  cookieSession: string | null;
}) {
  const session = await getSession(cookieSession);
  const form = Object.fromEntries(formData);

  const schemaCategory = schemaUpdateCategory.safeParse(form);

  if (!schemaCategory.success) {
    const error = z.flattenError(schemaCategory.error);
    return data(error.fieldErrors, { status: 400 });
  }

  try {
    const response = await axios.patch(
      `/home/rascunhos/atualizar-categoria/${schemaCategory?.data?.idCategory}`,
      {
        titleCategory: form.titleCategory,
        descriptionCategory: form.descriptionCategory,
      },
      {
        baseURL: LOCAL_URL,
        headers: {
          Cookie: `accessToken=${session.get("accessToken")}`,
        },
      },
    );

    return data(response.data, { status: response.status });
  } catch (e) {
    console.error(e);

    if (axios.isAxiosError(e)) {
      return data(e.response?.data, { status: e.response?.status });
    }

    return data(
      {
        message: "Erro ao executar a action",
        stauts: 500,
        error: e,
      },
      {
        status: 500,
      },
    );
  }
}
