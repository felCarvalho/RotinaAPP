import type { LoaderFunctionArgs } from "react-router";
import { getTasksUser } from "../service/getAll.server";
import { getTasksToday } from "../service/get-today.server";
import { getTasksWeek } from "../service/get-week.server";
import { getTasksMonth } from "../service/get-month.server";
import { getTasksAllPeriod } from "../service/get-all-period.server";
import { tokenContext } from "../../../utils/context/context.server";
import type { dataTasks, Task } from "../type.server";

function filterTasks(tasks: Task[], url: URL): Task[] {
  let filtered = [...tasks];

  const status = url.searchParams.get("status");
  if (status === "completed") {
    filtered = filtered.filter((t) => t.completed === "Concluída");
  } else if (status === "pending") {
    filtered = filtered.filter((t) => t.completed === "Incompleta");
  }

  const categoria = url.searchParams.get("categoria");
  if (categoria) {
    filtered = filtered.filter((t) => {
      if (typeof t.category === "object" && t.category) {
        return t.category.title === categoria;
      }
      return false;
    });
  }

  const ordem = url.searchParams.get("ordem");
  if (ordem) {
    filtered.sort((a, b) => {
      switch (ordem) {
        case "desc":
          return (
            new Date(b.createAt).getTime() - new Date(a.createAt).getTime()
          );
        case "asc":
          return (
            new Date(a.createAt).getTime() - new Date(b.createAt).getTime()
          );
        case "alphabetical-asc":
          return a.title.localeCompare(b.title);
        case "alphabetical-desc":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });
  }

  return filtered;
}

async function loader({ request, context }: LoaderFunctionArgs) {
  const cookiesSession = request.headers.get("Cookie");
  const token = context.get(tokenContext);
  const url = new URL(request.url);
  const periodo = url.searchParams.get("periodo");

  console.log(token);

  if (!cookiesSession) {
    throw new Error("Não encontramos nenhum cookie de sessão");
  }

  let result: dataTasks;

  switch (periodo) {
    case "hoje":
      result = (await getTasksToday({
        cookiesSession,
        context: token,
      })) as unknown as dataTasks;
      break;
    case "semana":
      result = (await getTasksWeek({
        cookiesSession,
        context: token,
      })) as unknown as dataTasks;
      break;
    case "mes":
      result = (await getTasksMonth({
        cookiesSession,
        context: token,
      })) as unknown as dataTasks;
      break;
    case "todos":
      result = (await getTasksAllPeriod({
        cookiesSession,
        context: token,
      })) as unknown as dataTasks;
      break;
    default:
      result = (await getTasksUser({
        cookiesSession,
        context: token,
      })) as unknown as dataTasks;
      break;
  }

  if (result.data && Array.isArray(result.data)) {
    result = { ...result, data: filterTasks(result.data, url) };
  }

  return result;
}

export { loader };
