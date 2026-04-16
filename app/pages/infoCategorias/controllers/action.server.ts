import type { ActionFunctionArgs } from "react-router";
import { updateCategory } from "../services/update-category.server";
import { deleteCategory } from "../services/delete-category.server";
import { updateCategoryTask } from "../services/update-category-task.server";
import { deleteCategoryTask } from "../services/delete-category-task.server";
import { tokenContext } from "../../../utils/context/context.server";

export async function action({ request, context }: ActionFunctionArgs) {
  const cookieSession = request.headers.get("Cookie");
  const formData = await request.formData();
  const intent = formData.get("intent");
  const token = context.get(tokenContext);

  switch (intent) {
    case "update-category":
      return await updateCategory({ formData, cookieSession, context: token });

    case "delete-category":
      return await deleteCategory({ formData, cookieSession, context: token });

    case "update-category-task":
      return await updateCategoryTask({ formData, cookieSession, context: token });

    case "delete-category-task":
      return await deleteCategoryTask({ formData, cookieSession, context: token });

    case "restaurar-category":
      // Implementação futura ou conforme padrão do projeto
      return null;

    default:
      throw new Error(" Nenhuma action foi executada");
  }
}
