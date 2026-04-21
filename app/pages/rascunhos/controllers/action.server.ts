import type { ActionFunctionArgs } from "react-router";
import { updateCategoryRascunho } from "../services/update/update-category.server";
import { updateTaskRascunho } from "../services/update/update-task.server";
import { deleteCategoryRascunho } from "../services/delete/delete-category.server";
import { deleteTaskRascunho } from "../services/delete/delete-task.server";
import { createTaskRascunho } from "../services/create/create-task-rascunho.server";
import { createCategoryRascunho } from "../services/create/create-category-rascunho.server";
import { tokenContext } from "../../../utils/context/context.server";

export async function action({ request, context }: ActionFunctionArgs) {
  const cookieSession = request.headers.get("Cookie");
  const formData = await request.formData();
  const intent = formData.get("intent");
  const token = context.get(tokenContext);

  switch (intent) {
    case "create-category-rascunho":
      return createCategoryRascunho({
        formData,
        cookieSession,
        context: token,
      });
    case "create-task-rascunho":
      return createTaskRascunho({
        formData,
        cookieSession,
        context: token,
      });
    case "update-category":
      return updateCategoryRascunho({
        formData,
        cookieSession,
        context: token,
      });
    case "update-task":
      return updateTaskRascunho({
        formData,
        cookieSession,
        context: token,
      });
    case "delete-category":
      return deleteCategoryRascunho({
        formData,
        cookieSession,
        context: token,
      });
    case "delete-task":
      return deleteTaskRascunho({
        formData,
        cookieSession,
        context: token,
      });
    default:
      throw new Error("Ops não action foi executada");
  }
}
