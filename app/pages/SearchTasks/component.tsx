import { SearchTasks } from "./SearchTasks";
import { Input } from "../../component/input";
import { Form, useLoaderData, Outlet } from "react-router";
import { useQueryState } from "nuqs";
import { loader } from "./controllers/loader.server";
import { handle } from "./controllers/handle";

export { loader, handle };

export default function SearchTasksComponent() {
  const loaderData = useLoaderData<typeof loader>();
  const [search, setSearch] = useQueryState("search", {
    shallow: false,
    throttleMs: 500,
  });

  return (
    <div className="relative flex h-full w-full flex-col">
      {/* Resultados com padding inferior para não ficar atrás do input fixo */}
      <div className="flex-1 overflow-y-auto scrollbar-hide pb-28">
        <SearchTasks />
      </div>

      {/* Input de busca fixo na parte inferior (acima do menu mobile) */}
      <div className="fixed bottom-24 left-0 right-0 z-30 px-6 lg:left-72 lg:bottom-10">
        <Form method="GET" className="w-full">
          <div className="rounded-full bg-white/40 p-1 backdrop-blur-md">
            <Input
              type="search"
              value={search ?? ""}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Pesquise suas rotinas aqui..."
              className="w-full border-blue-50 bg-white shadow-sm shadow-blue-50 focus:border-blue-100 focus:ring-0 focus:outline-none"
            />
          </div>
        </Form>
      </div>

      <Outlet />
    </div>
  );
}
