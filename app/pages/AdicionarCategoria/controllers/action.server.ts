import type { ActionFunctionArgs } from "react-router";
import { createCategory } from "../services/create-categoria.server";
import { tokenContext } from "../../../utils/context/context.server";
import { data } from "react-router";
import {
  createCategoryValidator,
  type CreateCategoryProps,
} from "../../../utils/schemas/index";

async function action({ request, context }: ActionFunctionArgs) {
  const cookieSession = request.headers.get("Cookie");
  const formData = await request.formData();
  const intent = formData.get("intent");
  const token = context.get(tokenContext);

  switch (intent) {
    case "adicionar-categoria": {
      const form = Object.fromEntries(formData) as unknown as CreateCategoryProps;
      const result = await createCategoryValidator.execute(form, {});
      if (!result.success) {
        return data(result.notification, { status: 400 });
      }
      return createCategory({
        validatedData: result.data,
        cookieSession,
        context: token,
      });
    }
    default:
      throw new Error("Ops, nehuma aciton foi executada");
  }
}

export { action };
