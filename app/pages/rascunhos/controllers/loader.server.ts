import type { LoaderFunctionArgs } from "react-router";
import { getAllRascunho } from "../services/get/getAllRascunhos.server";
import { tokenContext } from "../../../utils/context/context.server";

async function loader({ request, context }: LoaderFunctionArgs) {
  const cookieSession = request.headers.get("Cookie");
  const token = context.get(tokenContext);

  if (!cookieSession) {
    throw new Error("Ops, seu loader não foi executado");
  }

  return getAllRascunho({ cookieSession, context: token });
}

export { loader };
