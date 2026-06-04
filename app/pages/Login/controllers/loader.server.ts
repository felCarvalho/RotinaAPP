import type { LoaderFunctionArgs } from "react-router";
import { getSession } from "../../../utils/cookies/cookies.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieSession = request.headers.get("Cookie");
  const session = await getSession(cookieSession);
  const notification = session.get("notification") as string | null;

  return {
    notification,
  };
}
