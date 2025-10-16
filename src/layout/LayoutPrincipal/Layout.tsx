import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { parseAsBoolean, useQueryStates } from "nuqs";
import { useCallback, useEffect } from "react";
import { Outlet, ScrollRestoration, useLocation, useNavigate } from "react-router";
import { IconInfoMenu } from "../../component/IconMenu";
import { Button } from "../../component/btn";
import { P } from "../../component/paragrafo";
import { ScrollStore } from "../../store/UseScroll";
import { TelasStore } from "../../store/UseTelasFixos";
import { Header } from "../Header/Header";
import { Modais } from "../ModaisManager/Modais";
import { Popups } from "../popupsManager/Popups";

enum routes {
  routeBuscar = "/inicio/buscar",
  routeInfoCaegorias = "/inicio/informacoes-categorias",
  routeInicio = "/inicio",
}

enum typeString {
  voltar = "Voltar",
  verCategorias = "Ver categorias",
}

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

  const verificarRouteForTypesStringBtn = useCallback(() => {
    return pathname === routes?.routeInfoCaegorias;
  }, [pathname]);

  const isVisibleBtnInforCategorias = useCallback(
    () => pathname === routes?.routeInfoCaegorias || pathname === routes?.routeInicio,
    [pathname],
  );
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

    return () => {
      document.documentElement.style.overflow = "";

      window.removeEventListener("scroll", handleScroll);
    };
  }, [uuidTelas, OnScroll, verificarOpenModal, navigate]);

  return (
    <div className="m-0 min-h-dvh">
      <ScrollRestoration />
      <Header />
      <main className={pathname === routes?.routeBuscar ? "pt-40 pb-32" : "pt-40 pb-8"}>
        <Outlet />
        {isVisibleBtnInforCategorias() && (
          <Button
            type="button"
            onClick={() => {
              return !verificarRouteForTypesStringBtn() ? navigate("/inicio/informacoes-categorias") : navigate("/inicio");
            }}
            className="fixed right-20 bottom-20 bg-white"
          >
            <div className="flex animate-pulse flex-row items-center justify-center gap-2 p-2">
              {!verificarRouteForTypesStringBtn() ? (
                <IconInfoMenu />
              ) : (
                <i className="text-2xl text-blue-400">
                  <FontAwesomeIcon icon={faAngleLeft} beatFade />
                </i>
              )}
              <P
                title={!verificarRouteForTypesStringBtn() ? typeString?.verCategorias : typeString?.voltar}
                className="!text-[16px] text-blue-400"
              />
            </div>
          </Button>
        )}
      </main>
      <Modais />
      <Popups />
    </div>
  );
}
