import { loginAccount } from "../services/login.server";
import type { ActionFunctionArgs } from "react-router";
import { data } from "react-router";
import { z } from "zod";

const schemaLogin = z.object({
  identifier: z.email({ error: "Email inválido para login" }),
  password: z
    .string()
    .min(6, { error: "Senha deve ter pelo menos 6 caracteres" })
    .max(150, { error: "Senha deve ter somente 150 caracteres" }),
});

export async function action({ request }: ActionFunctionArgs) {
  const cookieSession = request.headers.get("Cookie");
  const formData = await request.formData();
  const intent = formData.get("intent");

  switch (intent) {
    case "login": {
      const form = Object.fromEntries(formData);
      const result = schemaLogin.safeParse(form);

      if (!result.success) {
        const errors = z.flattenError(result.error);
        return data(
          {
            errors: errors.fieldErrors,
          },
          {
            status: 400,
          },
        );
      }

      return loginAccount({ data: result.data, cookieSession });
    }

    default:
      throw new Error("Ops não action foi executada");
  }
}
