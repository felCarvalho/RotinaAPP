import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Config } from "../../pages/Configuracao/Config";
import { Button } from "../../component/btn";
import { Overlay } from "../../component/overlay";
import { DataConfig } from "../../constants/DataConfig/DataConfig";
import { useResizeView } from "../../hooks/UseResizeView";
import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { Outlet, useLocation } from "react-router";

export function LayoutConfig() {
  const { verificarWidth } = useResizeView();
  const location = useLocation();
  const [isLayoutDesktop, setLayoutDesktop] = useState(false);

  const verificarLayoutDesktop = useCallback(() => {
    return isLayoutDesktop ? "flex-row-reverse" : "flex-row";
  }, [isLayoutDesktop]);

  const verificarRoute = useCallback(() => {
    return DataConfig.some((l) => l?.link === location.pathname);
  }, [location]);

  return (
    <Overlay
      initial={{ y: 500, scale: 0, opacity: 0 }}
      animate={{ y: 0, scale: 1, opacity: 1 }}
      exit={{ y: 500, scale: 0, opacity: 0 }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 1, bounce: 0.3 }}
    >
      {verificarWidth({ largura: 1000 }) && (
        <div className={`flex h-full w-full items-center !justify-start gap-5 p-5 ${verificarLayoutDesktop()}`}>
          <div className="h-full w-full">
            <Config />
          </div>
          <div className="min-h-max">
            <Button type="button" onClick={() => setLayoutDesktop((s) => !s)}>
              <i>
                <FontAwesomeIcon icon={faArrowRightArrowLeft} />
              </i>
            </Button>
          </div>
          <div className="h-full w-full">{<Outlet />}</div>
        </div>
      )}
      {!verificarWidth({ largura: 1000 }) && (
        <div className="flex h-full w-full items-center !justify-start gap-10 p-5">
          <motion.div
            animate={verificarRoute() ? { y: -1000 } : { y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="h-full w-full"
          >
            <Config />
          </motion.div>
          <motion.div
            animate={!verificarRoute() ? { y: 1000 } : { y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="absolute top-5 right-5 bottom-5 left-5 rounded-[50px] !bg-white shadow-md shadow-blue-50"
          >
            <Outlet />
          </motion.div>
        </div>
      )}
    </Overlay>
  );
}
