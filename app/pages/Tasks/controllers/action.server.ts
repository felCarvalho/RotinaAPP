import { z } from "zod";
import type { ActionFunctionArgs } from "react-router";
import { data } from "react-router";
import { updateStatusTasks } from "../service/update-status.server";
import { updateTitleTasks } from "../service/update-title.server";
import { deleteTasks } from "../service/delete.server";
import { tokenContext } from "../../../utils/context/context.server";

export const schemaUpdateStatus = z.object({
  completed: z.optional(
    z.enum(["Concluída", "Incompleta"], { error: "Ops, status inválido" }),
  ),
  idTask: z.optional(z.string()),
});

export const schemaUpdateTitle = z.object({
  titleTask: z
    .string()
    .min(5, { error: "Ops, o título deve ter pelo menos 5 caracteres" })
    .max(200, { error: "Ops, o titulo deve ter no máximo 200 caracteres" }),
  idTask: z.optional(z.string()),
});

export const schemaDelete = z.object({
  idTask: z.string().min(1, { error: "ID inválido" }),
});

async function action({ request, context }: ActionFunctionArgs) {
  const cookieSession = request.headers.get("Cookie");
  const formData = await request.formData();
  const intent = formData.get("intent");
  const token = context.get(tokenContext);

  switch (intent) {
    case "update-status-task": {
      const parsed = schemaUpdateStatus.safeParse(Object.fromEntries(formData));
      if (!parsed.success) {
        return data(z.flattenError(parsed.error).fieldErrors, { status: 400 });
      }
      return await updateStatusTasks({
        validatedData: parsed.data,
        cookieSession,
        context: token,
      });
    }
    case "update-title-task": {
      const parsed = schemaUpdateTitle.safeParse(Object.fromEntries(formData));
      if (!parsed.success) {
        return data(z.flattenError(parsed.error).fieldErrors, { status: 400 });
      }
      return await updateTitleTasks({
        validatedData: parsed.data,
        cookieSession,
        context: token,
      });
    }
    case "delete-task": {
      const parsed = schemaDelete.safeParse(Object.fromEntries(formData));
      if (!parsed.success) {
        return data(z.flattenError(parsed.error).fieldErrors, { status: 400 });
      }
      return await deleteTasks({
        validatedData: parsed.data,
        cookieSession,
        context: token,
      });
    }
    default:
      throw new Error("Nenhuma action foi executada");
  }
}

export { action };
