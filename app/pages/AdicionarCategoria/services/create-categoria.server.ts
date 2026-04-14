import { LOCAL_URL } from "../../../utils/constants/contants.server";
import z from "zod";
import { data } from "react-router";
import axios, { isAxiosError } from "axios";
import { getSession } from "../../../utils/cookies/cookies.server";

const categoriaSchema = z.object({
  descriptionCategory: z.string().optional(),
  titleCategory: z
    .string()
    .min(5, {
      error: "O título da categoria não pode ser menor que 5 caracteres",
    })
    .max(400, {
      error: "O título da categoria não pode ser maior que 400 caracteres",
    })
    .optional(),
});

export async function createCategory({
  cookieSession,
  formData,
}: {
  cookieSession: string | null;
  formData: FormData;
}) {
  const session = await getSession(cookieSession);
  const form = Object.fromEntries(formData);

  const validated = categoriaSchema.safeParse(form);

  if (!validated.success) {
    const error = z.flattenError(validated.error);

    return data(error.fieldErrors, {
      status: 400,
    });
  }

  try {
    const response = await axios.post(
      "home/rascunhos/adicionar-categoria",
      {
        titleCategory: validated.data.titleCategory,
        descriptionCategory: validated.data.descriptionCategory,
      },
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
    if (isAxiosError(error)) {
      return data(error.response?.data, {
        status: error.response?.status,
      });
    }

    return data(
      {
        data: "Ops, erro interno da action",
      },
      {
        status: 500,
      },
    );
  }
}
