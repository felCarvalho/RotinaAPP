import { Button } from "../../btn";
import { RotinaStore } from "../../../store/UseRotina";

export function DropdownFilterCategorias() {
  const { categorias, setFilter, setCategoriaString } = RotinaStore();

  return (
    <div className="m-2 flex max-w-full flex-col items-start justify-center gap-2 rounded-3xl">
      <Button
        onClick={() => {
          setFilter({ id: null });
          setCategoriaString({ categoria: "Todas" });
        }}
        className="flex w-full flex-row gap-2 rounded-full bg-white font-medium shadow-sm shadow-blue-50 active:bg-blue-50"
      >
        <p className="w-full text-left text-blue-400">Todas</p>
      </Button>
      {categorias.map((c) => (
        <Button
          onClick={() => {
            setFilter({ id: c?.id });
            setCategoriaString({ categoria: c?.categoria });
          }}
          key={c?.id}
          className="flex w-full flex-row gap-1.5 rounded-full bg-white font-medium shadow-sm shadow-blue-50 active:bg-blue-50"
        >
          <p className="text-lefttruncate text-blue-400">{c?.categoria}</p>
        </Button>
      ))}
    </div>
  );
}
