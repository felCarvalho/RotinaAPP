import type { ActionFunctionArgs } from "react-router";
import { createRotina } from "../services/create-rotina.server";
import { tokenContext } from "../../../utils/context/context.server";

export async function action({ request, context }: ActionFunctionArgs) {
  const cookieSession = request.headers.get("Cookie");
  const formData = await request.formData();
  const intent = formData.get("intent");
  const token = context.get(tokenContext);

  switch (intent) {
    case "create":
      return createRotina({ formData, cookieSession, context: token });
    default:
      throw new Error("Ops não action foi executada");
  }
}
