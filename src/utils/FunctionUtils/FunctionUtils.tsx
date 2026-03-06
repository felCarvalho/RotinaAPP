import { parseAsString, useQueryState } from "nuqs";

export function statusStringForBoolean() {
  const [queryFilter] = useQueryState("status", parseAsString);

  switch (queryFilter) {
    case "Concluídas":
      return true;
    case "Incompletas":
      return false;
    case null:
      return null;
    default:
      return "todas";
  }
}
