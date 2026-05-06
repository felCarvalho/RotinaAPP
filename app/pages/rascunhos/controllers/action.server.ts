import type { ActionFunctionArgs } from "react-router";
import { data } from "react-router";
import { updateCategoryRascunho } from "../services/update/update-category.server";
import { updateTaskRascunho } from "../services/update/update-task.server";
import { deleteCategoryRascunho } from "../services/delete/delete-category.server";
import { deleteTaskRascunho } from "../services/delete/delete-task.server";
import { createTaskRascunho } from "../services/create/create-task-rascunho.server";
import { createCategoryRascunho } from "../services/create/create-category-rascunho.server";
import { tokenContext } from "../../../utils/context/context.server";
import {
  createCategoryRascunhoValidator,
  createTaskRascunhoValidator,
  updateCategoryValidator,
  updateTaskValidator,
  idCategoryValidator,
  idTaskValidator,
  type CreateCategoryRascunhoProps,
  type CreateTaskRascunhoProps,
  type UpdateCategoryProps,
  type UpdateTaskRascunhoProps,
  type IdCategoryProps,
  type IdTaskProps,
} from "./schemas";

export async function action({ request, context }: ActionFunctionArgs) {
  const cookieSession = request.headers.get("Cookie");
  const formData = await request.formData();
  const intent = formData.get("intent");
  const token = context.get(tokenContext);

  switch (intent) {
    case "create-category-rascunho": {
      const form = Object.fromEntries(formData) as unknown as CreateCategoryRascunhoProps;
      const result = await createCategoryRascunhoValidator.execute(form);
      if (!result.success) {
        return data(result.notification, { status: 400 });
      }
      return createCategoryRascunho({
        validatedData: result.data,
        cookieSession,
        context: token,
      });
    }
    case "create-task-rascunho": {
      const form = Object.fromEntries(formData) as unknown as CreateTaskRascunhoProps;
      const result = await createTaskRascunhoValidator.execute(form);
      if (!result.success) {
        return data(result.notification, { status: 400 });
      }
      return createTaskRascunho({
        validatedData: result.data,
        cookieSession,
        context: token,
      });
    }
    case "update-category": {
      const form = Object.fromEntries(formData) as unknown as UpdateCategoryProps;
      const result = await updateCategoryValidator.execute(form);
      if (!result.success) {
        return data(result.notification, { status: 400 });
      }
      return updateCategoryRascunho({
        validatedData: result.data,
        cookieSession,
        context: token,
      });
    }
    case "update-task": {
      const form = Object.fromEntries(formData) as unknown as UpdateTaskRascunhoProps;
      const result = await updateTaskValidator.execute(form);
      if (!result.success) {
        return data(result.notification, { status: 400 });
      }
      return updateTaskRascunho({
        validatedData: result.data,
        cookieSession,
        context: token,
      });
    }
    case "delete-category": {
      const form = Object.fromEntries(formData) as unknown as IdCategoryProps;
      const result = await idCategoryValidator.execute(form);
      if (!result.success) {
        return data(result.notification, { status: 400 });
      }
      return deleteCategoryRascunho({
        validatedData: result.data,
        cookieSession,
        context: token,
      });
    }
    case "delete-task": {
      const form = Object.fromEntries(formData) as unknown as IdTaskProps;
      const result = await idTaskValidator.execute(form);
      if (!result.success) {
        return data(result.notification, { status: 400 });
      }
      return deleteTaskRascunho({
        validatedData: result.data,
        cookieSession,
        context: token,
      });
    }
    default:
      throw new Error("Ops não action foi executada");
  }
}
