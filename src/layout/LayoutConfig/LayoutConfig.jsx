import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Config } from "../../pages/Configuracao/Config";
import { Button } from "../../component/btn";
import { Overlay } from "../../component/overlay";
import { useResizeView } from "../../hooks/UseResizeView";
import { LayoutStore } from "../../store/UseLayout";
import { useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Outlet } from "react-router";

export function LayoutConfig() {
  const { setLayout, isLayout } = LayoutStore();

  const layout = useCallback(() => {
    return isLayout?.isDesktopLayout ? "flex-row-reverse" : "flex-row";
  }, [isLayout]);

  const { verificarWidth } = useResizeView();

  useEffect(() => {
    localStorage.setItem("isLayout", JSON.stringify(isLayout));
  }, [isLayout]);

  return (
    <Overlay
      initial={{ y: 500, scale: 0, opacity: 0 }}
      animate={{ y: 0, scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 1, bounce: 0.3 }}
    >
      {verificarWidth({ largura: 800 }) && (
        <div className={`flex h-full w-full items-center !justify-start gap-5 p-5 ${layout()}`}>
          <div className="h-full w-full">
            <Config setLayout={{ setLayout, isLayout }} />
          </div>
          <div className="min-h-max">
            <Button onClick={() => setLayout({ isDesktopLayout: !isLayout?.isDesktopLayout })}>
              <i>
                <FontAwesomeIcon icon={faArrowRightArrowLeft} />
              </i>
            </Button>
          </div>
          <div className="h-full w-full">{<Outlet context={{ setLayout, isLayout }} /> ?? "conteudo zero"}</div>
        </div>
      )}
      {!verificarWidth({ largura: 799 }) && (
        <div className="flex h-full w-full items-center !justify-start gap-5 p-5">
          <motion.div
            initial={{ y: 0 }}
            animate={isLayout?.isMobileLayout ? { y: -700 } : { y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="h-full w-full"
          >
            <Config setLayout={{ setLayout, isLayout }} />
          </motion.div>
          {isLayout?.isMobileLayout && (
            <motion.div
              initial={{ y: 700 }}
              animate={{ y: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="absolute top-0 right-0 bottom-0 left-0 m-5 rounded-[50px] bg-white shadow-md shadow-blue-50"
            >
              <Outlet context={{ setLayout, isLayout }} />
            </motion.div>
          )}
        </div>
      )}
    </Overlay>
  );
}

/*
 try {
      const layoutStorage = localStorage.getItem("isLayout");
      return JSON.parse(layoutStorage);
    } catch (e) {
      return { isMobileLayout: false, isDesktopLayout: false };
    } */
