import { useLocation, useNavigate } from "react-router";
import { SearchFloatBar } from "../../component/searchFloatBar";
import { RotinaStore } from "../../store/UseRotina";
import { useEffect } from "react";
import { parseAsString, useQueryStates } from "nuqs";

export function SearchBarTasks() {
  const { searchTask, filterSearch, setSearchTasks, dataSearch } = RotinaStore();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [search, setSearch] = useQueryStates(
    {
      search_rotina: parseAsString.withDefault(""),
    },
    {
      history: "push",
      throttleMs: 1000,
    },
  );
  const { search_rotina } = search;

  function Handle(e) {
    setSearch((p) => ({
      ...p,
      search_rotina: e.target.value,
    }));
  }

  useEffect(() => {
    const time = setTimeout(() => {
      setSearchTasks({ search: search_rotina });
      searchTask();
    }, 1000);

    return () => {
      clearTimeout(time);
    };
  }, [filterSearch, searchTask, setSearchTasks, search_rotina]);

  return (
    <>
      {pathname === "/inicio/buscar" && (
        <SearchFloatBar value={search_rotina} onBack={() => navigate("/inicio")} onChange={Handle} />
      )}
    </>
  );
}
