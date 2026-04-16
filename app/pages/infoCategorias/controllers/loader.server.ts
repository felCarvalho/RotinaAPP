import type { LoaderFunctionArgs } from "react-router";
import { getAllCategory } from "../services/get-all-category.server";
import { tokenContext } from "../../../utils/context/context.server";

export async function loader({ request, context }: LoaderFunctionArgs) {
  const cookiesSession = request.headers.get("Cookie");
  const token = context.get(tokenContext);

  if (!cookiesSession) {
    throw new Error("Ops! não encontramos nenhum cookie de sessão");
  }

  return await getAllCategory({ cookiesSession, context: token });
}
