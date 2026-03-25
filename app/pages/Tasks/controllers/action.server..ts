import type { ActionFunctionArgs } from "react-router";
import { updateTasks } from "../service/update.server";
import { deleteTasks } from "../service/delete.server";

async function action({ request }: ActionFunctionArgs) {
  const cookieSession = request.headers.get("Cookie");
  const formData = await request.formData();
  const intent = formData.get("intent");

  switch (intent) {
    case "update":
      return await updateTasks({ formData, cookieSession });
    case "delete":
      return await deleteTasks({ formData, cookieSession });
    default:
      throw new Error("Nenhuma action foi executada");
  }
}

export { action };
