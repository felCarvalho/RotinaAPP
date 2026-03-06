import type { ActionFunctionArgs } from "react-router";
import { createRotina } from "../data/createTasks.server";

export async function action({ request }: ActionFunctionArgs) {
  const cookieSession = request.headers.get("Cookie");
  const formData = await request.formData();
  const intent = formData.get("intent");

  switch (intent) {
    case "create":
      return await createRotina({ formData, cookieSession });
    default:
      throw new Error("nehuma action executada");
  }
}
