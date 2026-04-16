import { type RouteConfig, layout, route } from "@react-router/dev/routes";

export default [
  layout("./layout/LayoutHome/layout.tsx", [
    layout("./layout/LayoutRegister/layout.tsx", [
      route("criar-conta", "./pages/CriarConta/component.tsx"),
      route("login", "./pages/Login/component.tsx"),
    ]),
    route("/home", "./pages/Tasks/component.tsx", [
      route("criar-rotina", "./pages/CreateRotina/component.tsx"),
      route("configuracoes", "./pages/Configuracao/component.tsx"),
      route("buscar", "./pages/SearchTasks/component.tsx"),
      route("adicionar-tarefa", "./pages/AdicionarTarefa/component.tsx"),
      route("categorias", "./pages/infoCategorias/component.tsx", [
        route("renomear/:id", "./modais/Renomear-categoria/component.tsx", {
          id: "renomear-categoria",
        }),
        route(
          "detalhes-categoria/:id",
          "./modais/Detalhes-categoria/component.tsx",
          {
            id: "detalhes-categoria",
          },
        ),
      ]),
      route("adicionar-categoria", "./pages/AdicionarCategoria/component.tsx"),
      route("renomear/:id", "./modais/Renomear-tarefa/component.tsx", {
        id: "renomear-home",
      }),
      route("detalhes/:id", "./modais/Detalhes-tarefa/component.tsx", {
        id: "detalhes-rotina",
      }),

      route("rascunhos", "./pages/rascunhos/component.tsx", [
        route(
          "renomear/:id",
          "./modais/Renomear-categoria-task-rascunho/component.tsx",
          {
            id: "renomear-rascunhos",
          },
        ),
        route("detalhes-tarefa/:id", "./modais/Detalhes-tarefa/component.tsx", {
          id: "detalhes-rascunhos",
        }),
        route(
          "detalhes-categoria/:id",
          "./modais/Detalhes-categoria/component.tsx",
          {
            id: "detalhes-categoria-rascunhos",
          },
        ),
      ]),
    ]),
  ]),
] satisfies RouteConfig;
