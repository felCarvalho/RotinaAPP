import { loginAccount } from "../services/login.server";
import type { ActionFunctionArgs } from "react-router";

export async function action({ request }: ActionFunctionArgs) {
  const cookieSession = request.headers.get("Cookie");
  const formData = await request.formData();
  const intent = formData.get("intent");

  switch (intent) {
    case "login":
      return loginAccount({ formData, cookieSession });

    default:
      throw new Error("Ops não action foi executada");
  }
}
