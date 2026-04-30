import type { ActionFunctionArgs } from "react-router";
import { data } from "react-router";
import { z } from "zod";
import { createAccountAction } from "../server/data.server";

export const schemaCreateAccount = z.object({
  name: z.string().min(1, { error: "Nome é obrigatório" }),
  identifier: z.email({ error: "Email inválido" }),
  password: z
    .string()
    .min(6, { error: "Senha deve ter pelo menos 6 caracteres" })
    .max(150, { error: "Senha deve ter no máximo 150 caracteres" }),
  passwordConfirm: z.string().min(1, { error: "Confirmação de senha é obrigatória" }),
}).refine((d) => d.password === d.passwordConfirm, {
  message: "As senhas não coincidem",
  path: ["passwordConfirm"],
});

export type CreateAccountData = z.infer<typeof schemaCreateAccount>;

export async function action({ request }: ActionFunctionArgs) {
  const cookiesSession = request.headers.get("Cookie");
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "login") {
    const form = Object.fromEntries(formData);
    const result = schemaCreateAccount.safeParse(form);

    if (!result.success) {
      const errors = z.flattenError(result.error);
      return data({ errors: errors.fieldErrors }, { status: 400 });
    }

    return createAccountAction({ cookiesSession, validatedData: result.data });
  }
}
