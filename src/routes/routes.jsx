import { createBrowserRouter, redirect } from "react-router";
import Layout from "../layout/LayoutPrincipal/Layout";
import { LayoutMain } from "../layout/LayoutMain/LayoutMain";
import { SearchTasks } from "../pages/SearchTasks/SearchTasks";
import { LayoutConfig } from "../layout/LayoutConfig/LayoutConfig";
import { Perfil } from "../pages/Perfil/Perfil";
import { Temas } from "../pages/Temas/Temas";
import { LimparDados } from "../pages/LimparDados/LimparDados";
import { Lixeira } from "../pages/Lixeira/Lixeira";

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
        element: <LayoutMain />,
        children: [
          {
            path: "buscar",
            element: <SearchTasks />,
          },
          {
            path: "configuracoes",
            element: <LayoutConfig />,
            children: [
              {
                path: "perfil",
                element: <Perfil />,
              },
              {
                path: "temas",
                element: <Temas />,
              },
              {
                path: "lixeira",
                element: <Lixeira />,
              },
              {
                path: "limpar-dados",
                element: <LimparDados />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default routes;
