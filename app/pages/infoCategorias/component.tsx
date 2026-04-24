import { InfoCategoria } from "./infoCategorias";
import { loader } from "./controllers/loader.server";
import { action } from "./controllers/action.server";
import { handle } from "./controllers/handle";
import { Outlet, useLocation } from "react-router";

export { loader, action, handle };

export default function InfoCategoriaComponent() {
  const { pathname } = useLocation();
  const isCategorias = pathname === "/home/categorias";

  return (
    <div className="h-full w-full">
      {isCategorias ? <InfoCategoria /> : <Outlet />}
    </div>
  );
}
