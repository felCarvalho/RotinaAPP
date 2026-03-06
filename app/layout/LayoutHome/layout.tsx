import { Outlet } from "react-router";
import { Header } from "../Header/Header";
import { middleware } from "../../middleware/middleware.server";
export { middleware };

export default function HomeLayout() {
  return (
    <div className="h-full">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
