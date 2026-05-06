import type { LoaderFunctionArgs } from "react-router";
import { getTasksUser } from "../service/getAll.server";
import { getTasksToday } from "../service/get-today.server";
import { getTasksWeek } from "../service/get-week.server";
import { getTasksMonth } from "../service/get-month.server";
import { getTasksAllPeriod } from "../service/get-all-period.server";
import { tokenContext } from "../../../utils/context/context.server";

async function loader({ request, context }: LoaderFunctionArgs) {
  const cookiesSession = request.headers.get("Cookie");
  const token = context.get(tokenContext);
  const url = new URL(request.url);
  const periodo = url.searchParams.get("periodo");

  if (!cookiesSession) {
    throw new Error("Não encontramos nenhum cookie de sessão");
  }

  switch (periodo) {
    case "hoje":
      return await getTasksToday({ cookiesSession, context: token });
    case "semana":
      return await getTasksWeek({ cookiesSession, context: token });
    case "mes":
      return await getTasksMonth({ cookiesSession, context: token });
    case "todos":
      return await getTasksAllPeriod({ cookiesSession, context: token });
    default:
      return await getTasksUser({ cookiesSession, context: token });
  }
}

export { loader };
