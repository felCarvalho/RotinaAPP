import type { ActionFunctionArgs } from "react-router";
import { data } from "react-router";
import { z } from "zod";
import { updateCategoryRascunho } from "../services/update/update-category.server";
import { updateTaskRascunho } from "../services/update/update-task.server";
import { deleteCategoryRascunho } from "../services/delete/delete-category.server";
import { deleteTaskRascunho } from "../services/delete/delete-task.server";
import { createTaskRascunho } from "../services/create/create-task-rascunho.server";
import { createCategoryRascunho } from "../services/create/create-category-rascunho.server";
import { tokenContext } from "../../../utils/context/context.server";
import {
  schemaCreateCategoryRascunho,
  schemaCreateTaskRascunho,
  schemaUpdateCategory,
  schemaUpdateTask,
  schemaIdCategory,
  schemaIdTask,
} from "./schemas";

export async function action({ request, context }: ActionFunctionArgs) {
  const cookieSession = request.headers.get("Cookie");
  const formData = await request.formData();
  const intent = formData.get("intent");
  const token = context.get(tokenContext);
  const form = Object.fromEntries(formData);

  switch (intent) {
    case "create-category-rascunho": {
      const parsed = schemaCreateCategoryRascunho.safeParse(form);
      if (!parsed.success) {
        return data(z.flattenError(parsed.error).fieldErrors, { status: 400 });
      }
      return createCategoryRascunho({
        validatedData: parsed.data,
        cookieSession,
        context: token,
      });
    }
    case "create-task-rascunho": {
      const parsed = schemaCreateTaskRascunho.safeParse(form);
      if (!parsed.success) {
        return data(z.flattenError(parsed.error).fieldErrors, { status: 400 });
      }
      return createTaskRascunho({
        validatedData: parsed.data,
        cookieSession,
        context: token,
      });
    }
    case "update-category": {
      const parsed = schemaUpdateCategory.safeParse(form);
      if (!parsed.success) {
        return data(z.flattenError(parsed.error).fieldErrors, { status: 400 });
      }
      return updateCategoryRascunho({
        validatedData: parsed.data,
        cookieSession,
        context: token,
      });
    }
    case "update-task": {
      const parsed = schemaUpdateTask.safeParse(form);
      if (!parsed.success) {
        return data(z.flattenError(parsed.error).fieldErrors, { status: 400 });
      }
      return updateTaskRascunho({
        validatedData: parsed.data,
        cookieSession,
        context: token,
      });
    }
    case "delete-category": {
      const parsed = schemaIdCategory.safeParse(form);
      if (!parsed.success) {
        return data(z.flattenError(parsed.error).fieldErrors, { status: 400 });
      }
      return deleteCategoryRascunho({
        validatedData: parsed.data,
        cookieSession,
        context: token,
      });
    }
    case "delete-task": {
      const parsed = schemaIdTask.safeParse(form);
      if (!parsed.success) {
        return data(z.flattenError(parsed.error).fieldErrors, { status: 400 });
      }
      return deleteTaskRascunho({
        validatedData: parsed.data,
        cookieSession,
        context: token,
      });
    }
    default:
      throw new Error("Ops não action foi executada");
  }
}
