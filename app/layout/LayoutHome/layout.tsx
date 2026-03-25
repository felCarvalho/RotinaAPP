import { Outlet } from "react-router";
import { Header } from "../Header/Header";
import { middleware } from "../../middleware/middleware.server";
import { DetalhesRotina } from "../../modais/Detalhes/DetalhesRotina";
import { RenomearComponent } from "../../modais/Renomear/component";
export { middleware };

export default function HomeLayout() {
  return (
    <div className="flex h-full w-full flex-row">
      <Header />
      <main className="h-full w-full">
        <Outlet />
      </main>
      <RenomearComponent />
      <DetalhesRotina />
    </div>
  );
}
