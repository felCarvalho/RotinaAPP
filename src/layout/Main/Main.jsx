import { Tasks } from "../../pages/Tasks/Tasks";
import { useLocation, Outlet } from "react-router";

export function Main() {
  const { pathname } = useLocation();

  return (
    <div>
      {pathname !== "/inicio/buscar" && <Tasks></Tasks>}
      <Outlet />
    </div>
  );
}
