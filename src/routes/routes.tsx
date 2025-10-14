import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { createBrowserRouter, Navigate } from "react-router";
import { GuardLogin } from "../guards/GuardsLogin/GuardLogin";
import { LayoutConfig } from "../layout/LayoutConfig/LayoutConfig";
import { LayoutConfigError } from "../layout/LayoutConfig/LayoutConfigError/LayoutConfigError";
import { LayoutMain } from "../layout/LayoutMain/LayoutMain";
import Layout from "../layout/LayoutPrincipal/Layout";
import { CriarConta } from "../pages/CriarConta/CriarConta";
import { Lixeira } from "../pages/Lixeira/Lixeira";
import { Login } from "../pages/Login/Login";
import { Perfil } from "../pages/Perfil/Perfil";
import { SearchTasks } from "../pages/SearchTasks/SearchTasks";
import { Temas } from "../pages/Temas/Temas";
import { InfoCategorias } from "../pages/infoCategorias/InfoCategorias";

const routes = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/criar-conta",
    element: <CriarConta />,
  },
  {
    element: <GuardLogin />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          { index: true, element: <Navigate to="/inicio" replace /> },
          {
            path: "inicio",
            element: <LayoutMain />,
            children: [
              {
                path: "buscar",
                element: <SearchTasks />,
              },
              { path: "informacoes-categorias", element: <InfoCategorias /> },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/configuracoes",
    element: <LayoutConfig />,
    children: [
      {
        index: true,
        element: (
          <LayoutConfigError
            desktop="Selecione alguma configuração para ver mais detalhes dela aqui!"
            mobile="Aperte no btn abaixo para ir para pagina de configurações"
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
    ],
  },
]);

export default routes;
