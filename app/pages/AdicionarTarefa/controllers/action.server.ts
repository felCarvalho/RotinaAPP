import type { ActionFunctionArgs } from "react-router";
import { createTarefa } from "../services/create-tarefa.server";
import { tokenContext } from "../../../utils/context/context.server";

async function action({ request, context }: ActionFunctionArgs) {
  const cookieSession = request.headers.get("Cookie");
  const formData = await request.formData();
  const intent = formData.get("intent");
  const token = context.get(tokenContext);

  switch (intent) {
    case "adicionar-tarefa":
      return await createTarefa({ formData, cookieSession, context: token });
    default:
      throw new Error("Ops, nenhuma action foi executada");
  }
}

export { action };
