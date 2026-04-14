import type { ActionFunctionArgs } from "react-router";
import { createRotina } from "../services/create-rotina.server";

export async function action({ request }: ActionFunctionArgs) {
  const cookieSession = request.headers.get("Cookie");
  const formData = await request.formData();
  const intent = formData.get("intent");

  switch (intent) {
    case "create":
      return createRotina({ formData, cookieSession });
    default:
      throw new Error("Ops não action foi executada");
  }
}
