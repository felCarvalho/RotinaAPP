import { type RouteConfig, layout, route } from "@react-router/dev/routes";

export default [
  layout("./layout/LayoutRegister/layout.tsx", [
    route("criar-conta", "./pages/CriarConta/component.tsx"),
    route("login", "./pages/Login/component.tsx"),
  ]),

  layout("./layout/LayoutHome/layout.tsx", [
    route("/home", "./pages/Tasks/component.tsx", [
      route("criar-rotina", "./pages/CreateRotina/component.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
