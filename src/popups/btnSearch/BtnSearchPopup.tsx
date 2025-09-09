import { Button } from "../../component/btn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { ScrollStore } from "../../store/UseScroll";
import { useNavigate, useLocation } from "react-router";
import { motion, AnimatePresence } from "framer-motion";

export function BtnSearchPopup() {
  const { scrollOn } = ScrollStore();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <>
      <AnimatePresence>
        {pathname !== "/inicio/buscar" && scrollOn?.isScroll && (
          <motion.div
            initial={{ y: 100, scaleX: 0, opacity: 0 }}
            animate={{ y: 0, scaleX: 1, opacity: 1 }}
            exit={{ y: 100, scaleX: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, mass: 1, duration: 0.5 }}
            className="fixed bottom-15 z-40 flex w-full justify-center"
          >
            <Button
              type="button"
              onClick={() => navigate("/inicio/buscar")}
              className="flex max-w-full flex-row items-center gap-2 bg-white/80 opacity-95 backdrop-blur-3xl"
            >
              <i className="text-blue-400">
                <FontAwesomeIcon icon={faSearch} />
              </i>
              <p className="text-base font-medium tracking-wide text-blue-400">Pesquisar</p>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
