import { Outlet } from "react-router";
import { middleware } from "../../middleware/middleware.server";
export { middleware };

export default function AuthLayout() {
  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
