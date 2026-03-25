import type { LoaderFunctionArgs } from "react-router";
import { getTasksUser } from "../service/getAll.server";
import { tokenContext } from "../../../utils/context/context.server";

async function loader({ request, context }: LoaderFunctionArgs) {
  const cookiesSession = request.headers.get("Cookie");
  const token = context.get(tokenContext);
  console.log(token);

  if (!cookiesSession) {
    throw new Error("Não encontramos nenhum cookie de sessão");
  }

  return await getTasksUser({ cookiesSession, context: token });
}

export { loader };
