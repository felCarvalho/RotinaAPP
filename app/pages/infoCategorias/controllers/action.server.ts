import { z } from "zod";
import type { ActionFunctionArgs } from "react-router";
import { data } from "react-router";
import { deleteCategoryTask } from "../services/delete-category-task.server";
import { updateCategoryTitle } from "../services/update-category-title.server";
import { updateCategoryTasksStatus } from "../services/update-category-status.server";
import { tokenContext } from "../../../utils/context/context.server";

const schemaDeleteCategoryTask = z.object({
  idCategory: z.string().min(1, { message: "ID da categoria inválido" }),
});

const schemaUpdateCategoryTitle = z.object({
  idCategory: z.string().min(1, { message: "ID da categoria inválido" }),
  titleCategory: z.string().min(1, { message: "Título inválido" }),
});

const schemaUpdateCategoryStatus = z.object({
  idCategory: z.string().min(1, { message: "ID da categoria inválido" }),
  completed: z.enum(["Incompleta", "Concluída"], {
    error: "Ops, situação inválida para update",
  }),
});

export async function action({ request, context }: ActionFunctionArgs) {
  const cookieSession = request.headers.get("Cookie");
  const formData = await request.formData();
  const intent = formData.get("intent");
  const token = context.get(tokenContext);

  switch (intent) {
    case "delete-category-task": {
      const validate = schemaDeleteCategoryTask.safeParse(
        Object.fromEntries(formData),
      );
      if (!validate.success) {
        const validateErrors = z.flattenError(validate.error);
        return data({ errors: validateErrors.fieldErrors }, { status: 400 });
      }
      return await deleteCategoryTask({
        parsedData: validate.data,
        cookieSession,
        context: token,
      });
    }

    case "update-title-category": {
      const validate = schemaUpdateCategoryTitle.safeParse(
        Object.fromEntries(formData),
      );
      if (!validate.success) {
        const validateErrors = z.flattenError(validate.error);
        return data({ errors: validateErrors.fieldErrors }, { status: 400 });
      }
      return await updateCategoryTitle({
        parsedData: validate.data,
        cookieSession,
        context: token,
      });
    }

    case "update-status-task-category": {
      const validate = schemaUpdateCategoryStatus.safeParse(
        Object.fromEntries(formData),
      );
      if (!validate.success) {
        const validateErrors = z.flattenError(validate.error);
        return data({ errors: validateErrors.fieldErrors }, { status: 400 });
      }
      return await updateCategoryTasksStatus({
        parsedData: validate.data,
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
