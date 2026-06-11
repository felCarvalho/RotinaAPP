import { Config } from "./Config";
import { Outlet, useLocation } from "react-router";

export default function Configurcoes() {
  const { pathname } = useLocation();
  const isConfig = pathname === "/home/configuracoes";

  return (
    <section className="h-full w-full" aria-label="Configurações">
      {isConfig ? <Config /> : <Outlet />}
    </section>
  );
}
