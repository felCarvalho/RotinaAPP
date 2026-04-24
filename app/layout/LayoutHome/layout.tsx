import { Outlet } from "react-router";
import { Header } from "../Header/Header";
import { HeaderMobile } from "../Header/HeaderMobile";

export default function HomeLayout() {
  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row bg-white">
      {/* Header Desktop (lateral) */}
      <Header />
      
      <main className="flex-1 w-full p-4 lg:p-6 pb-28 lg:pb-6">
        <Outlet />
      </main>

      {/* Header Mobile (barra inferior) */}
      <HeaderMobile />
    </div>
  );
}
