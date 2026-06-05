import { Outlet } from "react-router";
import { Header } from "../Header/Header";
import { HeaderMobile } from "../Header/HeaderMobile";

export default function HomeLayout() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-white lg:flex-row">
      {/* Header Desktop (lateral) */}
      <Header />

      <main
        id="main-content"
        className="w-full flex-1 p-4 pb-28 lg:p-6 lg:pb-6 max-w-7xl mx-auto"
      >
        <Outlet />
      </main>

      {/* Header Mobile (barra inferior) */}
      <HeaderMobile />
    </div>
  );
}
