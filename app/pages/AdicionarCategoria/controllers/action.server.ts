import type { ActionFunctionArgs } from "react-router";
import { createCategory } from "../services/create-categoria.server";
import { tokenContext } from "../../../utils/context/context.server";

async function action({ request, context }: ActionFunctionArgs) {
  const cookieSession = request.headers.get("Cookie");
  const formData = await request.formData();
  const intent = formData.get("intent");
  const token = context.get(tokenContext);

  switch (intent) {
    case "adicionar-categoria":
      return createCategory({ cookieSession, formData, context: token });
    default:
      throw new Error("Ops, nehuma aciton foi executada");
  }
}

export { action };
