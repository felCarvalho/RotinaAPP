import type { ActionFunctionArgs } from "react-router";
import { data } from "react-router";
import { updateTasks } from "../service/update.server";
import { deleteTasks } from "../service/delete.server";
import { restoreTasks } from "../service/restore.server";
import { tokenContext } from "../../../utils/context/context.server";
import {
  updateTaskValidator,
  deleteTaskValidator,
  idTaskValidator,
  type UpdateTaskProps,
  type DeleteTaskProps,
  type IdTaskProps,
} from "../../../utils/schemas/index";

async function action({ request, context }: ActionFunctionArgs) {
  const cookieSession = request.headers.get("Cookie");
  const formData = await request.formData();
  const intent = formData.get("intent");
  const token = context.get(tokenContext);

  switch (intent) {
    case "update-task": {
      const form = Object.fromEntries(formData) as unknown as UpdateTaskProps;
      const result = await updateTaskValidator.execute(form, {});

      console.log(result);
      if (!result.success) {
        return data(result.notification, { status: 400 });
      }
      return await updateTasks({
        validatedData: result.data,
        cookieSession,
        context: token,
      });
    }
    case "delete-task": {
      const form = Object.fromEntries(formData) as unknown as DeleteTaskProps;
      const result = await deleteTaskValidator.execute(form, {});
      if (!result.success) {
        return data(result.notification, { status: 400 });
      }
      return await deleteTasks({
        validatedData: result.data,
        cookieSession,
        context: token,
      });
    }
    case "restore-task": {
      const form = Object.fromEntries(formData) as unknown as IdTaskProps;
      const result = await idTaskValidator.execute(form, {});
      if (!result.success) {
        return data(result.notification, { status: 400 });
      }
      return await restoreTasks({
        validatedData: result.data,
        cookieSession,
        context: token,
      });
    }
    default:
      throw new Error("Nenhuma action foi executada");
  }
}

export { action };
