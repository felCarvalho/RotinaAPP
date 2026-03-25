import type { ActionFunctionArgs } from "react-router";
import { createTarefa } from "../services/create-tarefa.server";

async function action({ request }: ActionFunctionArgs) {
  const cookieSession = request.headers.get("Cookie");
  const formData = await request.formData();
  const intent = formData.get("intent");

  switch (intent) {
    case "adicionar-tarefa":
      return await createTarefa({ formData, cookieSession });
    default:
      throw new Error("Ops, nenhuma action foi executada");
  }
}

export { action };
