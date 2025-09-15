import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { createBrowserRouter, Navigate } from "react-router";
import { P } from "../component/paragrafo";
import { GuardLogin } from "../guards/GuardsLogin/GuardLogin";
import { LayoutConfig } from "../layout/LayoutConfig/LayoutConfig";
import { LayoutConfigError } from "../layout/LayoutConfig/LayoutConfigError/LayoutConfigError";
import { LayoutMain } from "../layout/LayoutMain/LayoutMain";
import Layout from "../layout/LayoutPrincipal/Layout";
import { CriarConta } from "../pages/CriarConta/CriarConta";
import { LimparDados } from "../pages/LimparDados/LimparDados";
import { Lixeira } from "../pages/Lixeira/Lixeira";
import { Login } from "../pages/Login/Login";
import { Perfil } from "../pages/Perfil/Perfil";
import { SearchTasks } from "../pages/SearchTasks/SearchTasks";
import { Temas } from "../pages/Temas/Temas";

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
          { path: "inicio", element: <LayoutMain />, children: [{ path: "buscar", element: <SearchTasks /> }] },
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
            desktop="Selecione alguma configuração para ver mais detalhes dela aqui"
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
      {
        path: "limpar-dados",
        element: <LimparDados />,
      },
    ],
  },
]);

export default routes;
