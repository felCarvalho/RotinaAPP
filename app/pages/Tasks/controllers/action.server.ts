import type { ActionFunctionArgs } from "react-router";
import { data } from "react-router";
import { updateStatusTasks } from "../service/update-status.server";
import { updateTitleTasks } from "../service/update-title.server";
import { deleteTasks } from "../service/delete.server";
import { tokenContext } from "../../../utils/context/context.server";
import {
  updateTaskStatusRules,
  updateTaskTitleRules,
  deleteTaskRules,
  type UpdateTaskStatusProps,
  type UpdateTaskTitleProps,
  type DeleteTaskProps,
} from "../../../utils/schemas/task.schema";
import { makeValidator } from "../../../utils/schemas/factory";

const updateStatusValidator =
  makeValidator<UpdateTaskStatusProps>(updateTaskStatusRules);
const updateTitleValidator =
  makeValidator<UpdateTaskTitleProps>(updateTaskTitleRules);
const deleteValidator = makeValidator<DeleteTaskProps>(deleteTaskRules);

async function action({ request, context }: ActionFunctionArgs) {
  const cookieSession = request.headers.get("Cookie");
  const formData = await request.formData();
  const intent = formData.get("intent");
  const token = context.get(tokenContext);

  switch (intent) {
    case "update-status-task": {
      const form = Object.fromEntries(formData) as unknown as UpdateTaskStatusProps;
      const result = await updateStatusValidator.execute(form);
      if (!result.success) {
        return data(result.notification, { status: 400 });
      }
      return await updateStatusTasks({
        validatedData: result.data,
        cookieSession,
        context: token,
      });
    }
    case "update-title-task": {
      const form = Object.fromEntries(formData) as unknown as UpdateTaskTitleProps;
      const result = await updateTitleValidator.execute(form);
      if (!result.success) {
        return data(result.notification, { status: 400 });
      }
      return await updateTitleTasks({
        validatedData: result.data,
        cookieSession,
        context: token,
      });
    }
    case "delete-task": {
      const form = Object.fromEntries(formData) as unknown as DeleteTaskProps;
      const result = await deleteValidator.execute(form);
      if (!result.success) {
        return data(result.notification, { status: 400 });
      }
      return await deleteTasks({
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
