import type { LoaderFunctionArgs } from "react-router";
import { getSessionNotification } from "../../../utils/cookies/cookies.server";
//import { tokenContext } from "../../../utils/context/context.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieSession = request.headers.get("Cookie");

  return {
    notification: await getSessionNotification(cookieSession, "notification"),
  };
}
