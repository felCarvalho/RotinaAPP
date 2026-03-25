import { getSession } from "../../../utils/cookies/cookies.server";
import { LOCAL_URL } from "../../../utils/constants/contants.server";
import z from "zod";
import { data } from "react-router";
import axios from "axios";

const schemaCreateTarefa = z.object({
  titleTask: z
    .string()
    .min(1, { error: "Por favor, sua task precisa ter algum valor" })
    .max(400, { error: "Ops, maximo de caraateres atingido" }),
  descriptionTask: z
    .string()
    .min(0)
    .max(400, { error: "Ops, maximo de caracteres atingido" })
    .optional(),
});

export async function createTarefa({
  formData,
  cookieSession,
}: {
  formData: FormData;
  cookieSession: string | null;
}) {
  const form = Object.fromEntries(formData);
  const session = await getSession(cookieSession);

  const schemaSafeParse = schemaCreateTarefa.safeParse(form);

  if (!schemaSafeParse.success) {
    const error = z.flattenError(schemaSafeParse.error).fieldErrors;
    return data(
      { data: error },
      {
        status: 400,
      },
    );
  }

  try {
    const response = await axios.post(
      "home/criar-tarefa",
      {
        titleTask: form.titleTask,
        descriptionTask: form.descriptionTask ?? "",
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
          data: error.response?.data,
        },
        {
          status: error.response?.status || 500,
        },
      );
    }
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
