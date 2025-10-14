import { Button } from "../../../btn";
import { useMemo } from "react";
import { parseAsString, useQueryStates } from "nuqs";
import { RotinaStore } from "../../../../store/UseRotina";

export function DropdownFilterCategorias() {
  const { buscarIdUserCategoria } = RotinaStore();
  const categorias = useMemo(() => buscarIdUserCategoria(), [buscarIdUserCategoria]);
  const [, setQueryFilter] = useQueryStates(
    {
      categoria: parseAsString,
      status: parseAsString,
    },
    {
      history: "push",
    },
  );

  return (
    <div className="m-2 flex max-w-full flex-col items-start justify-center gap-2 rounded-3xl">
      <Button
        onClick={() => setQueryFilter((s) => ({ ...s, categoria: "todas" }))}
        type="button"
        className="flex w-full flex-row gap-2 rounded-full bg-white font-medium shadow-sm shadow-blue-50 active:bg-blue-50"
      >
        <p className="w-full text-left text-blue-400">Todas</p>
      </Button>
      {categorias.map((c) => (
        <Button
          onClick={() =>
            setQueryFilter((s) => ({
              ...s,
              status: null,
              categoria: c?.categoria,
            }))
          }
          type="button"
          key={c?.id}
          className="flex w-full flex-row gap-1.5 rounded-full bg-white font-medium shadow-sm shadow-blue-50 active:bg-blue-50"
        >
          <p className="truncate text-left text-blue-400">{c?.categoria}</p>
        </Button>
      ))}
    </div>
  );
}
