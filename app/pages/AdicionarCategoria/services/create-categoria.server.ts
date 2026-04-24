import { LOCAL_URL } from "../../../utils/constants/contants.server";
import z from "zod";
import { data } from "react-router";
import axios, { isAxiosError } from "axios";
import {
  getSession,
  commitSession,
  getCookieTokens,
} from "../../../utils/cookies/cookies.server";
import type { Token } from "../../../utils/context/type.server";

const categoriaSchema = z.object({
  descriptionCategory: z.string().optional(),
  titleCategory: z
    .string()
    .min(5, {
      error: "O título da categoria não pode ser menor que 5 caracteres",
    })
    .max(400, {
      error: "O título da categoria não pode ser maior que 400 caracteres",
    }),
  status: z.enum(["Ativa"]),
});

export async function createCategory({
  cookieSession,
  formData,
  context,
}: {
  cookieSession: string | null;
  formData: FormData;
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

  const validated = categoriaSchema.safeParse(form);

  if (!validated.success) {
    const error = z.flattenError(validated.error);

    return data(error.fieldErrors, {
      status: 400,
    });
  }

  try {
    const response = await axios.post(
      "",
      {
        ...validated.data,
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
  } catch (error) {
    if (isAxiosError(error)) {
      return data(error.response?.data, {
        status: error.response?.status,
        headers: {
          "Set-Cookie": await commitSession(setCookie),
        },
      });
    }

    return data(
      {
        data: "Ops, erro interno da action",
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
