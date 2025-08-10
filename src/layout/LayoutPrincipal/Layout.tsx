import { Header } from "../Header/Header";
import { Modais } from "../ModaisManager/Modais";
import { Popups } from "../popupsManager/Popups";
import { TelasStore } from "../../store/UseTelasFixos";
import { ScrollStore } from "../../store/UseScroll";
import { useCallback, useEffect } from "react";
import { parseAsBoolean, useQueryStates } from "nuqs";
import { useLocation, ScrollRestoration, useNavigate, Outlet } from "react-router";

export default function MainLayout() {
  const { uuidTelas } = TelasStore();
  const { OnScroll } = ScrollStore();
  const [modalBoleano] = useQueryStates({
    modal: parseAsBoolean,
  });

  const { pathname } = useLocation();
  const { modal } = modalBoleano;
  const navigate = useNavigate();

  const verificarOpenModal = useCallback(() => {
    return uuidTelas.some((s) => s?.status === true) || modal === true;
  }, [uuidTelas, modal]);

  useEffect(() => {
    const handleScroll = () => {
      OnScroll({
        scrollValue: window.scrollY,
        scrollH: document.documentElement.scrollHeight,
        clientH: document.documentElement.clientHeight,
        pixels: 100,
      });
    };

    window.addEventListener("scroll", handleScroll);

    if (verificarOpenModal()) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }

    const ClickNavigate = (e:KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          navigate(-1);
          break;
        case "Home":
          navigate(-1);
          break;
        case "ArrowRight":
          navigate(1);
          break;
        case "End":
          navigate(1);
          break;

        default:
          break;
      }
    };

    window.addEventListener("keydown", ClickNavigate);

    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", ClickNavigate);

      window.removeEventListener("scroll", handleScroll);
    };
  }, [uuidTelas, OnScroll, verificarOpenModal, navigate]);

  return (
    <div className="m-0 min-h-dvh">
      <ScrollRestoration />
      <Header />
      <main className={pathname === "/inicio/buscar" ? "pt-40 pb-32" : "pt-40 pb-8"}>
        <Outlet />
      </main>
      <Modais />
      <Popups />
    </div>
  );
}
