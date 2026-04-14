import { loader } from "./controllers/loader.server";
import { action } from "./controllers/action.server";
import { Rascunhos } from "./rascunhos";
import { Outlet } from "react-router";
import { handle } from "./controllers/handle";

export default function RascunhosComponent() {
  return (
    <div className="h-full">
      <Rascunhos />
      <Outlet />
    </div>
  );
}

export { loader, action, handle };
