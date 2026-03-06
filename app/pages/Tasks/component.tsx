import { Tasks } from "./Tasks";
import { Outlet } from "react-router";
//import { layoutRoutes } from "../../utils/FunctionUtils/FunctionUtils";
//import { useEffect } from "react";
import { loader } from "./controllers/loader.server";
import { action } from "./controllers/action.server.";
import { handle } from "./controllers/handle";
import RenomearComponent from "../../modais/Renomear/component";

export { loader, action, handle };

export default function TasksComponent() {
  return (
    <div className="flex flex-col-reverse justify-center relative">
      <Tasks />
      <div>
        <RenomearComponent />
        <Outlet />
      </div>
    </div>
  );
}
