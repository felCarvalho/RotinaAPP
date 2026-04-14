import type { ActionFunctionArgs } from "react-router";
import { updateCategoryRascunho } from "../services/update/update-category.server";
import { updateTaskRascunho } from "../services/update/update-task.server";
import { deleteCategoryRascunho } from "../services/delete/delete-category.server";
import { deleteTaskRascunho } from "../services/delete/delete-task.server";

export async function action({ request }: ActionFunctionArgs) {
  const cookieSession = request.headers.get("Cookie");
  const formData = await request.formData();
  const intent = formData.get("intent");

  switch (intent) {
    case "update-category":
      return updateCategoryRascunho({
        formData,
        cookieSession,
      });
    case "update-task":
      return updateTaskRascunho({
        formData,
        cookieSession,
      });
    case "delete-category":
      return deleteCategoryRascunho({
        formData,
        cookieSession,
      });
    case "delete-task":
      return deleteTaskRascunho({
        formData,
        cookieSession,
      });
    default:
      throw new Error("Ops não action foi executada");
  }
}
