import { Outlet } from "react-router";

export default function HomeLayout() {
  return (
    <div className="flex h-full w-full flex-row">
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
}
