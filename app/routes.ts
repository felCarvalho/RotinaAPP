import { type RouteConfig, layout, route } from "@react-router/dev/routes";

export default [
  layout("./layout/LayoutRegister/layout.tsx", [
    route("criar-conta", "./pages/CriarConta/component.tsx"),
    route("login", "./pages/Login/component.tsx"),
  ]),

  layout("./layout/LayoutHome/layout.tsx", [
    route("/home", "./pages/Tasks/component.tsx", [
      route("criar-rotina", "./pages/CreateRotina/component.tsx"),
      route("configuracoes", "./pages/Configuracao/component.tsx"),
      route("buscar", "./pages/SearchTasks/component.tsx"),
      route("adicionar-tarefa", "./pages/AdicionarTarefa/component.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
