import type { LoaderFunctionArgs } from "react-router";
import { getTasksDeleted } from "../../Tasks/service/get-deleted.server";
import { tokenContext } from "../../../utils/context/context.server";

async function loader({ request, context }: LoaderFunctionArgs) {
  const cookiesSession = request.headers.get("Cookie");
  const token = context.get(tokenContext);

  if (!cookiesSession) {
    throw new Error("Não encontramos nenhum cookie de sessão");
  }

  return await getTasksDeleted({ cookiesSession, context: token });
}

export { loader };
