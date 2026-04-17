import { Outlet } from "react-router";
import { Header } from "../Header/Header";

export default function HomeLayout() {
  return (
    <div className="flex h-full w-full flex-row">
      <Header />
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
}
