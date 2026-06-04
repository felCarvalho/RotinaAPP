import type { ActionFunctionArgs } from "react-router";
import { data } from "react-router";
import { restoreTasks } from "../../Tasks/service/restore.server";
import { tokenContext } from "../../../utils/context/context.server";
import { idTaskValidator, type IdTaskProps } from "../../../utils/schemas/index";

async function action({ request, context }: ActionFunctionArgs) {
  const cookieSession = request.headers.get("Cookie");
  const formData = await request.formData();
  const intent = formData.get("intent");
  const token = context.get(tokenContext);

  switch (intent) {
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
