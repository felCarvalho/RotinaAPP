import type { LoaderFunctionArgs } from "react-router";
import { searchTasks } from "../services/searchTasks.server";

async function loader({ request }: LoaderFunctionArgs) {
  const cookieSession = request.headers.get("Cookie");
  const url = request.url;

  return searchTasks({ cookieSession, url });
}

export { loader };
