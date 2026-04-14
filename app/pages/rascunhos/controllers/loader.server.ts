import type { LoaderFunctionArgs } from "react-router";
import { getAllRascunho } from "../services/get/getAllRascunhos.server";

async function loader({ request }: LoaderFunctionArgs) {
  const cookieSession = request.headers.get("Cookie");

  if (!cookieSession) {
    throw new Error("Ops, seu loader não foi executado");
  }

  return getAllRascunho({ cookieSession });
}

export { loader };
