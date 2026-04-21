import { loader } from "./controllers/loader.server";
import { action } from "./controllers/action.server";
import { Rascunhos } from "./rascunhos";
import { Outlet } from "react-router";
import { handle } from "./controllers/handle";
import { useLocation } from "react-router";

export default function RascunhosComponent() {
  const { pathname } = useLocation();

  return (
    <div className="h-full">
      {pathname === "/home/rascunhos" && <Rascunhos />}
      <Outlet />
    </div>
  );
}

export { loader, action, handle };
