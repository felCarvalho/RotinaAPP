import type { ActionFunctionArgs } from "react-router";
import { data } from "react-router";
import { createAccountAction } from "../server/data.server";
import {
  createUserValidator,
  type CreateUserProps,
} from "../../../utils/schemas/index";

export async function action({ request }: ActionFunctionArgs) {
  const cookiesSession = request.headers.get("Cookie");
  const formData = await request.formData();
  const intent = formData.get("intent");

  switch (intent) {
    case "login": {
      const form = Object.fromEntries(formData) as unknown as CreateUserProps;
      const result = await createUserValidator.execute(form, {});

      if (!result.success) {
        return data({ errors: result.notification }, { status: 400 });
      }

      return createAccountAction({
        cookiesSession,
        validatedData: result.data,
      });
    }

    default:
      throw new Error("Ops! nenhuma ação foi executada");
  }
}
