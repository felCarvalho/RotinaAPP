import { createBrowserRouter, redirect } from "react-router";
import Layout from "../layout/LayoutPrincipal/Layout";
import { Main } from "../layout/Main/Main";
import { SearchTasks } from "../pages/SearchTasks/SearchTasks";
import { Config } from "../pages/Configuracao/Config";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <div className="text-amber-400"> estamos verificando o erro</div>,
    children: [
      {
        index: true,
        loader: () => redirect("/inicio"),
      },
      {
        path: "/inicio",
        element: <Main />,
        children: [
          {
            path: "buscar",
            element: <SearchTasks />,
          },
          {
            path: "configuracoes",
            element: <Config />,
          },
        ],
      },
    ],
  },
]);

export default routes;
