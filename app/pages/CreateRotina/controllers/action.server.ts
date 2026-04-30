import type { ActionFunctionArgs } from "react-router";
import { createRotina } from "../services/create-rotina.server";
import { tokenContext } from "../../../utils/context/context.server";
import { z } from "zod";
import { data } from "react-router";

export const schemaCreateRotina = z.object({
  titleTask: z
    .string()
    .min(5, { error: "Minimo de 5 caracteres para criar um titulo" })
    .max(255, { error: "Maximo de 255 caracteres para seu titulo" }),
  descriptionTask: z
    .string()
    .min(0, { error: "Minimo de 0 caracteres para criar uma descrição" })
    .max(400, { error: "Máximo de 400 caracteres para sua descrição" }),
  titleCategory: z
    .string()
    .min(5, { error: "Minimo de 5 caracteres para criar uma categoria" })
    .max(255, { error: "Maximo de 255 caracteres para sua categoria" }),
  descriptionCategory: z
    .string()
    .min(0, { error: "Minimo de 0 caracteres para criar uma descrição" })
    .max(400, { error: "Máximo de 400 caracteres para sua descrição" }),
});

export async function action({ request, context }: ActionFunctionArgs) {
  const cookieSession = request.headers.get("Cookie");
  const formData = await request.formData();
  const intent = formData.get("intent");
  const token = context.get(tokenContext);

  switch (intent) {
    case "create": {
      const form = Object.fromEntries(formData);
      const parsed = schemaCreateRotina.safeParse(form);
      if (!parsed.success) {
        const validate = z.flattenError(parsed.error).fieldErrors;
        return data(validate, { status: 400 });
      }
      return createRotina({ validatedData: parsed.data, cookieSession, context: token });
    }
    default:
      throw new Error("Ops não action foi executada");
  }
}
