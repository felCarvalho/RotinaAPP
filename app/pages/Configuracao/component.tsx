import { Config } from "./Config";
import { Outlet, useLocation } from "react-router";

export default function Configurcoes() {
  const { pathname } = useLocation();
  const isConfig = pathname === "/home/configuracoes";

  return (
    <div className="h-full w-full">
      {isConfig ? <Config /> : <Outlet />}
    </div>
  );
}
