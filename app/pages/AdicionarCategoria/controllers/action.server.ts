import type { ActionFunctionArgs } from "react-router";
import { createCategory } from "../services/create-categoria.server";
import { tokenContext } from "../../../utils/context/context.server";
import z from "zod";
import { data } from "react-router";

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

async function action({ request, context }: ActionFunctionArgs) {
  const cookieSession = request.headers.get("Cookie");
  const formData = await request.formData();
  const intent = formData.get("intent");
  const token = context.get(tokenContext);

  switch (intent) {
    case "adicionar-categoria": {
      const form = Object.fromEntries(formData);
      const parsed = categoriaSchema.safeParse(form);
      if (!parsed.success) {
        const error = z.flattenError(parsed.error).fieldErrors;
        return data(error, { status: 400 });
      }
      return createCategory({ validatedData: parsed.data, cookieSession, context: token });
    }
    default:
      throw new Error("Ops, nehuma aciton foi executada");
  }
}

export { action };
