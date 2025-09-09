import { Tasks } from "../../pages/Tasks/Tasks";
import { useLocation, Outlet } from "react-router";

export function LayoutMain() {
  const { pathname } = useLocation();

  return (
    <div>
      {pathname === "/inicio" && <Tasks />}
      <Outlet />
    </div>
  );
}
