import { Lixeira } from "./Lixeira";
import { Outlet } from "react-router";
import { loader } from "./controllers/loader.server";
import { action } from "./controllers/action.server";

export { loader, action };

export default function LixeiraComponent() {
  return (
    <div className="h-full w-full">
      <Lixeira />
      <Outlet />
    </div>
  );
}
