import { loader } from "./controllers/loader.server";
import { action } from "./controllers/action.server";
import { Rascunhos } from "./rascunhos";
import { Outlet } from "react-router";
import { handle } from "./controllers/handle";
import { useLocation } from "react-router";

export { loader, action, handle };

export default function RascunhosComponent() {
  const { pathname } = useLocation();
  const isRascunhos = pathname === "/home/rascunhos";

  return (
    <div className="h-full w-full">
      {isRascunhos ? <Rascunhos /> : <Outlet />}
    </div>
  );
}
