import type { ActionFunctionArgs } from "react-router";
import { deleteCategoryTask } from "../services/delete-category-task.server";
import { updateCategoryTitle } from "../services/update-category-title.server";
import { updateCategoryTasksStatus } from "../services/update-category-status.server";
import { tokenContext } from "../../../utils/context/context.server";

export async function action({ request, context }: ActionFunctionArgs) {
  const cookieSession = request.headers.get("Cookie");
  const formData = await request.formData();
  const intent = formData.get("intent");
  const token = context.get(tokenContext);

  switch (intent) {
    case "delete-category-task":
      return await deleteCategoryTask({
        formData,
        cookieSession,
        context: token,
      });

    case "update-title-category":
      return await updateCategoryTitle({
        formData,
        cookieSession,
        context: token,
      });

    case "update-status-task-category":
      return await updateCategoryTasksStatus({
        formData,
        cookieSession,
        context: token,
      });

    case "restaurar-category":
      // Implementação futura ou conforme padrão do projeto
      return null;

    default:
      throw new Error(" Nenhuma action foi executada");
  }
}
