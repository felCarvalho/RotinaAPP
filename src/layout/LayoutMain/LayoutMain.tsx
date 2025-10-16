import { Tasks } from "../../pages/Tasks/Tasks";
import { useLocation, Outlet } from "react-router";

enum routes {
  routeInicio = "/inicio",
}

export function LayoutMain() {
  const { pathname } = useLocation();

  return (
    <div>
      {pathname === routes?.routeInicio && <Tasks />}
      <Outlet />
    </div>
  );
}
