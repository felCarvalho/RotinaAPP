import { LOCAL_URL } from "../../../utils/constants/contants.server";
import { data } from "react-router";
import axios, { isAxiosError } from "axios";
import {
  getSession,
  commitSession,
  getCookieTokens,
} from "../../../utils/cookies/cookies.server";
import type { Token } from "../../../utils/context/type.server";
import { z } from "zod";

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

type CreateCategoryData = z.infer<typeof categoriaSchema>;

export async function createCategory({
  validatedData,
  cookieSession,
  context,
}: {
  validatedData: CreateCategoryData;
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

  try {
    const response = await axios.post(
      "",
      {
        ...validatedData,
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
