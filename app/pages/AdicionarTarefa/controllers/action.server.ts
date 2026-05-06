import type { ActionFunctionArgs } from "react-router";
import { createTarefa } from "../services/create-tarefa.server";
import { tokenContext } from "../../../utils/context/context.server";
import { data } from "react-router";
import {
  createTaskRules,
  type CreateTaskProps,
} from "../../../utils/schemas/task.schema";
import { makeValidator } from "../../../utils/schemas/factory";

const createTarefaValidator = makeValidator<CreateTaskProps>(createTaskRules);

async function action({ request, context }: ActionFunctionArgs) {
  const cookieSession = request.headers.get("Cookie");
  const formData = await request.formData();
  const intent = formData.get("intent");
  const token = context.get(tokenContext);

  switch (intent) {
    case "adicionar-tarefa": {
      const form = Object.fromEntries(formData) as unknown as CreateTaskProps;
      const result = await createTarefaValidator.execute(form);
      if (!result.success) {
        return data(result.notification, { status: 400 });
      }
      return await createTarefa({
        validatedData: result.data,
        cookieSession,
        context: token,
      });
    }
    default:
      throw new Error("Ops, nenhuma action foi executada");
  }
}

export { action };
