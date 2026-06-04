import type { ActionFunctionArgs } from "react-router";
import { data } from "react-router";
import { sendChatMessage } from "../service/chat.server";
import { tokenContext } from "../../../utils/context/context.server";
import {
  chatQuestionValidator,
  type ChatQuestionProps,
} from "../../../utils/schemas/index";

export async function action({ request, context }: ActionFunctionArgs) {
  const cookieSession = request.headers.get("Cookie");
  const token = context.get(tokenContext);
  const formData = await request.formData();
  const intent = formData.get("intent");

  switch (intent) {
    case "question": {
      const form = Object.fromEntries(formData) as unknown as ChatQuestionProps;
      const result = await chatQuestionValidator.execute(form, {});
      if (!result.success) {
        return data({ errors: result.notification }, { status: 400 });
      }
      return sendChatMessage({
        data: result.data,
        cookieSession,
        context: token,
      });
    }
    default:
      return;
  }
}
