import { InfoCategoria } from "./infoCategorias";
import { loader } from "./controllers/loader.server";
import { action } from "./controllers/action.server";
import { handle } from "./controllers/handle";
import { Outlet } from "react-router";

export { loader, action, handle };

export default function InfoCategoriaComponent() {
  return (
    <div className="h-full">
      <InfoCategoria />
      <div>
        <Outlet />
      </div>
    </div>
  );
}
