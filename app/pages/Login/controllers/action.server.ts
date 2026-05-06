import { loginAccount } from "../services/login.server";
import type { ActionFunctionArgs } from "react-router";
import { data } from "react-router";
import {
  loginRules,
  type LoginProps,
} from "../../../utils/schemas/user.schema";
import { makeValidator } from "../../../utils/schemas/factory";

const loginValidator = makeValidator<LoginProps>(loginRules);

export async function action({ request }: ActionFunctionArgs) {
  const cookieSession = request.headers.get("Cookie");
  const formData = await request.formData();
  const intent = formData.get("intent");

  switch (intent) {
    case "login": {
      const form = Object.fromEntries(formData) as unknown as LoginProps;
      const result = await loginValidator.execute(form);
      if (!result.success) {
        return data({ errors: result.notification }, { status: 400 });
      }
      return loginAccount({ data: result.data, cookieSession });
    }

    default:
      throw new Error("Ops não action foi executada");
  }
}
