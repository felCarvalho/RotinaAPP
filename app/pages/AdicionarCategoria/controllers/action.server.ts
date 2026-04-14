import type { ActionFunctionArgs } from "react-router";
import { createCategory } from "../services/create-categoria.server";

async function action({ request }: ActionFunctionArgs) {
  const cookieSession = request.headers.get("Cookie");
  const formData = await request.formData();
  const intent = formData.get("intent");

  switch (intent) {
    case "adicionar-categoria":
      return createCategory({ cookieSession, formData });
    default:
      throw new Error("Ops, nehuma aciton foi executada");
  }
}

export { action };
