import { Tasks } from "./Tasks";
import { Outlet } from "react-router";
import { loader } from "./controllers/loader.server";
import { action } from "./controllers/action.server";
import { handle } from "./controllers/handle";
import { useLocation } from "react-router";
import { middleware } from "../../middleware/middleware.server";

export { loader, action, handle, middleware };

export default function TasksComponent() {
  const { pathname } = useLocation();
  return (
    <div className="h-full md:p-10">
      {pathname === "/home" && <Tasks />}
      <div className={pathname === "/home" ? "" : "h-full w-full"}>
        <Outlet />
      </div>
    </div>
  );
}
