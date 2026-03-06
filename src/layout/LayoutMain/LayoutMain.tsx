import { Tasks } from "../../pages/Tasks/Tasks";
import { useLocation, Outlet } from "react-router";

enum routes {
  routeHome = "/home",
}

export function LayoutMain() {
  const { pathname } = useLocation();

  return (
    <div>
      {pathname === routes?.routeHome && <Tasks />}
      <Outlet />
    </div>
  );
}
