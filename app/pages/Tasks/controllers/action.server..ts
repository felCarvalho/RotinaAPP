import type { ActionFunctionArgs } from "react-router";
import { updateTasks } from "../service/update.server";
import { deleteTasks } from "../service/delete.server";
import { tokenContext } from "../../../utils/context/context.server";

async function action({ request, context }: ActionFunctionArgs) {
  const cookieSession = request.headers.get("Cookie");
  const formData = await request.formData();
  const intent = formData.get("intent");
  const token = context.get(tokenContext);

  switch (intent) {
    case "update-task":
      return await updateTasks({ formData, cookieSession, context: token });
    case "delete-task":
      return await deleteTasks({ formData, cookieSession, context: token });
    default:
      throw new Error("Nenhuma action foi executada");
  }
}

export { action };
