import type { LoaderFunctionArgs } from "react-router";
import { searchTasks } from "../services/searchTasks.server";
import { tokenContext } from "../../../utils/context/context.server";

async function loader({ request, context }: LoaderFunctionArgs) {
  const cookieSession = request.headers.get("Cookie");
  const token = context.get(tokenContext);
  const url = request.url;

  return searchTasks({ cookieSession, url, context: token });
}

export { loader };
