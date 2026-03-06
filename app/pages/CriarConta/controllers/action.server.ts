import type { ActionFunctionArgs } from "react-router";
import { createAccountAction } from "../server/data.server";

export async function action({ request }: ActionFunctionArgs) {
  const cookiesSession = request.headers.get("Cookie");
  const formData = await request.formData();
  const intent = formData.get("intent");

  console.log(cookiesSession);

  console.log(intent + "felipe");

  if (intent === "login") {
    return createAccountAction({ cookiesSession, formData });
  }
}
