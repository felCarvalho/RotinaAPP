import { SearchTasks } from "./SearchTasks";
import { Input } from "../../component/input";
import { Form, useLoaderData } from "react-router";
import { useQueryState } from "nuqs";
import { loader } from "./controllers/loader.server";

export { loader };

export default function SearchTasksComponent() {
  const loaderData = useLoaderData<typeof loader>();
  const [search, setSearch] = useQueryState("search", {
    shallow: false,
    throttleMs: 500,
  });

  console.log(loaderData);

  return (
    <div className="h-full w-full">
      <SearchTasks />
      <Form method="GET">
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
