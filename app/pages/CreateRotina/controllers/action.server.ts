import type { ActionFunctionArgs } from "react-router";
import { createRotina } from "../services/create-rotina.server";
import { tokenContext } from "../../../utils/context/context.server";
import { data } from "react-router";
import {
  createRotinaRules,
  type CreateRotinaProps,
} from "../../../utils/schemas/rotina.schema";
import { makeValidator } from "../../../utils/schemas/factory";

const rotinaSchemaValidator =
  makeValidator<CreateRotinaProps>(createRotinaRules);

export async function action({ request, context }: ActionFunctionArgs) {
  const cookieSession = request.headers.get("Cookie");
  const formData = await request.formData();
  const intent = formData.get("intent");
  const token = context.get(tokenContext);

  switch (intent) {
    case "create": {
      const form = Object.fromEntries(formData) as unknown as CreateRotinaProps;
      const result = await rotinaSchemaValidator.execute(form);
      if (!result.success) {
        return data(result.notification, { status: 400 });
      }
      return createRotina({
        validatedData: result.data,
        cookieSession,
        context: token,
      });
    }
    default:
      throw new Error("Ops não action foi executada");
  }
}
