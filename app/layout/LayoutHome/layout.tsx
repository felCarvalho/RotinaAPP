import { Outlet } from "react-router";
import { middleware } from "../../middleware/middleware.server";
export { middleware };

export default function HomeLayout() {
  return (
    <div className="flex h-full w-full flex-row">
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
}
