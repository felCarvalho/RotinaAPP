import { Button } from "../../../btn";
import { useMemo } from "react";
import { parseAsString, useQueryStates } from "nuqs";

export function DropdownFilterCategorias() {
  return (
    <div className="m-2 flex max-w-full flex-col items-start justify-center gap-2 rounded-3xl">
      <Button
        onClick={() => {}}
        type="button"
        className="flex w-full flex-row gap-2 rounded-full bg-white font-medium shadow-sm shadow-blue-50 active:bg-blue-50"
      >
        <p className="w-full text-left text-blue-400">Todas</p>
      </Button>

      <Button
        onClick={() => {}}
        type="button"
        key={""}
        className="flex w-full flex-row gap-1.5 rounded-full bg-white font-medium shadow-sm shadow-blue-50 active:bg-blue-50"
      >
        <p className="truncate text-left text-blue-400">{""}</p>
      </Button>
    </div>
  );
}
