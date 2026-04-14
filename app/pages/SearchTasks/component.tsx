import { SearchTasks } from "./SearchTasks";
import { Input } from "../../component/input";
import { Form, useLoaderData } from "react-router";
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

  console.log(loaderData);

  return (
    <div className="relative h-full w-full">
      <SearchTasks />
      <Form method="GET" className="lef absolute right-0 bottom-5 left-0 mx-5">
        <Input
          type="search"
          value={search ?? ""}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar..."
        />
      </Form>
    </div>
  );
}
