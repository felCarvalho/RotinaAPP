import type { ActionFunctionArgs } from "react-router";
import { createTarefa } from "../services/create-tarefa.server";
import { tokenContext } from "../../../utils/context/context.server";
import z from "zod";
import { data } from "react-router";

export const schemaCreateTarefa = z.object({
  titleTask: z
    .string()
    .min(1, { error: "Por favor, sua task precisa ter algum valor" })
    .max(400, { error: "Ops, maximo de caraateres atingido" }),
  descriptionTask: z
    .string()
    .min(0)
    .max(400, { error: "Ops, maximo de caracteres atingido" })
    .optional(),
  idCategory: z
    .string()
    .min(5, { error: "Por favor, selecione uma categoria" })
    .max(400, { error: "Ops, maximo de caracteres atingido" }),
});

async function action({ request, context }: ActionFunctionArgs) {
  const cookieSession = request.headers.get("Cookie");
  const formData = await request.formData();
  const intent = formData.get("intent");
  const token = context.get(tokenContext);

  switch (intent) {
    case "adicionar-tarefa": {
      const form = Object.fromEntries(formData);
      const parsed = schemaCreateTarefa.safeParse(form);
      if (!parsed.success) {
        const error = z.flattenError(parsed.error).fieldErrors;
        return data(error, { status: 400 });
      }
      return await createTarefa({ validatedData: parsed.data, cookieSession, context: token });
    }
    default:
      throw new Error("Ops, nenhuma action foi executada");
  }
}

export { action };
