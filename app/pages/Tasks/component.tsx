import { Tasks } from "./Tasks";
import { Outlet } from "react-router";
import { loader } from "./controllers/loader.server";
import { action } from "./controllers/action.server.";
import { handle } from "./controllers/handle";
import { useLocation } from "react-router";
import { useCallback } from "react";

export { loader, action, handle };

export default function TasksComponent() {
  const { pathname } = useLocation();

  const getStyleMargin = useCallback(
    (pathname: string) => {
      switch (pathname) {
        case "/home":
          return "flex flex-col justify-start";
        default:
          return "flex flex-col-reverse justify-end";
      }
    },
    [pathname],
  );

  return (
    <div
      className={`h-full border border-sky-50 md:p-10 ${getStyleMargin(pathname)}`}
    >
      {pathname === "/home" && <Tasks />}
      <div className="h-full w-full">
        <Outlet />
      </div>
    </div>
  );
}
