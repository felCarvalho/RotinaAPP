import { createBrowserRouter, redirect } from "react-router";
import Layout from "../layout/LayoutPrincipal/Layout";
import { LayoutMain } from "../layout/LayoutMain/LayoutMain";
import { SearchTasks } from "../pages/SearchTasks/SearchTasks";
import { LayoutConfig } from "../layout/LayoutConfig/LayoutConfig";
import { Perfil } from "../pages/Perfil/Perfil";
import { Temas } from "../pages/Temas/Temas";
import { LimparDados } from "../pages/LimparDados/LimparDados";
import { Lixeira } from "../pages/Lixeira/Lixeira";
import { P } from "../component/paragrafo";
import { LayoutConfigError } from "../layout/LayoutConfig/LayoutConfigError/LayoutConfigError";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: (
      <div className="my-72 w-full text-center text-2xl text-amber-400">
        <P title="Estamos verificando o erro" />
      </div>
    ),
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
                index: true,
                element: (
                  <LayoutConfigError
                    mobile="Volte a tela de configurações clicando no btn abaixo!"
                    desktop="Escolha uma confguração para ver os detalhes aqui!"
                    icon={faArrowUp}
                  />
                ),
              },
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
