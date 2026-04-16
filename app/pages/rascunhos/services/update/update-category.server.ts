import { z } from "zod";
import { getSession, commitSession, getCookieTokens } from "~/utils/cookies/cookies.server";
import { data } from "react-router";
import axios from "axios";
import { LOCAL_URL } from "~/utils/constants/contants.server";
import type { Token } from "../../../../utils/context/type.server";

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
  } catch (e) {
    console.error(e);

    if (axios.isAxiosError(e)) {
      return data(e.response?.data, {
        status: e.response?.status,
        headers: {
          "Set-Cookie": await commitSession(setCookie),
        },
      });
    }

    return data(
      {
        message: "Erro ao executar a action",
        stauts: 500,
        error: e,
      },
      {
        status: 500,
        headers: {
          "Set-Cookie": await commitSession(setCookie),
        },
      },
    );
  }
}
