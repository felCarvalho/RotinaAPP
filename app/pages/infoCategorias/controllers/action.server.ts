import type { ActionFunctionArgs } from "react-router";
import { data } from "react-router";
import { deleteCategoryTask } from "../services/delete-category-task.server";
import { updateCategoryTitle } from "../services/update-category-title.server";
import { updateCategoryTasksStatus } from "../services/update-category-status.server";
import { tokenContext } from "../../../utils/context/context.server";
import {
  deleteCategoryTaskRules,
  updateCategoryRules,
  updateCategoryStatusRules,
  type DeleteCategoryTaskProps,
  type UpdateCategoryProps,
  type UpdateCategoryStatusProps,
} from "../../../utils/schemas/category.schema";
import { makeValidator } from "../../../utils/schemas/factory";

const deleteCategoryValidator =
  makeValidator<DeleteCategoryTaskProps>(deleteCategoryTaskRules);
const updateCategoryTitleValidator =
  makeValidator<UpdateCategoryProps>(updateCategoryRules);
const updateCategoryStatusValidator =
  makeValidator<UpdateCategoryStatusProps>(updateCategoryStatusRules);

export async function action({ request, context }: ActionFunctionArgs) {
  const cookieSession = request.headers.get("Cookie");
  const formData = await request.formData();
  const intent = formData.get("intent");
  const token = context.get(tokenContext);

  switch (intent) {
    case "delete-category-task": {
      const form = Object.fromEntries(
        formData,
      ) as unknown as DeleteCategoryTaskProps;
      const result = await deleteCategoryValidator.execute(form);
      if (!result.success) {
        return data({ errors: result.notification }, { status: 400 });
      }
      return await deleteCategoryTask({
        parsedData: result.data,
        cookieSession,
        context: token,
      });
    }

    case "update-title-category": {
      const form = Object.fromEntries(
        formData,
      ) as unknown as UpdateCategoryProps;
      const result = await updateCategoryTitleValidator.execute(form);
      if (!result.success) {
        return data({ errors: result.notification }, { status: 400 });
      }
      return await updateCategoryTitle({
        parsedData: result.data,
        cookieSession,
        context: token,
      });
    }

    case "update-status-task-category": {
      const form = Object.fromEntries(
        formData,
      ) as unknown as UpdateCategoryStatusProps;
      const result = await updateCategoryStatusValidator.execute(form);
      if (!result.success) {
        return data({ errors: result.notification }, { status: 400 });
      }
      return await updateCategoryTasksStatus({
        parsedData: result.data,
        cookieSession,
        context: token,
      });
    }

    case "restaurar-category":
      return null;

    default:
      throw new Error(" Nenhuma action foi executada");
  }
}
