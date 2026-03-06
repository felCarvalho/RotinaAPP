import { useLocation, useNavigate } from "react-router";
import { SearchFloatBar } from "../../component/searchFloatBar";
import { RotinaStore } from "../../store/UseRotina";
import { useEffect } from "react";
import { parseAsString, useQueryStates } from "nuqs";

enum routes {
  routeBuscar = "/inicio/buscar",
}

export function SearchBarTasks() {
  const { searchTask } = RotinaStore();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [search, setSearch] = useQueryStates(
    {
      search: parseAsString,
    },
    { history: "push", throttleMs: 1000 },
  );

  useEffect(() => {
    const timeDebounce = setTimeout(() => {
      if (search?.search) {
        searchTask({ search: search?.search });
      }
    }, 500);

    return () => {
      clearTimeout(timeDebounce);
    };
  }, [search, searchTask]);

  return (
    <>
      {pathname === routes?.routeBuscar && (
        <SearchFloatBar
          value={search?.search ?? ""}
          onBack={() => navigate("/inicio")}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearch((s) => ({
              ...s,
              search: e.target.value,
            }))
          }
        />
      )}
    </>
  );
}
