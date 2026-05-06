import type { ActionFunctionArgs } from "react-router";
import { data } from "react-router";
import { createAccountAction } from "../server/data.server";
import {
  createUserRules,
  type CreateUserProps,
} from "../../../utils/schemas/user.schema";
import { makeValidator } from "../../../utils/schemas/factory";

const createUserValidator = makeValidator<CreateUserProps>(createUserRules);

export async function action({ request }: ActionFunctionArgs) {
  const cookiesSession = request.headers.get("Cookie");
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "login") {
    const form = Object.fromEntries(formData) as unknown as CreateUserProps;
    const result = await createUserValidator.execute(form);

    if (!result.success) {
      return data({ errors: result.notification }, { status: 400 });
    }

    return createAccountAction({
      cookiesSession,
      validatedData: result.data,
    });
  }
}
