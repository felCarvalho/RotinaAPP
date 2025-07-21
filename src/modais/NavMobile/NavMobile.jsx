import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../../component/btn";
import { Overlay } from "../../component/overlay";
import { Nav } from "../../component/Nav/Nav";
import { TelasStore } from "../../store/UseTelasFixos";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence } from "framer-motion";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

export function NavMobile() {
  const { isRenderID, closeID } = TelasStore();
  return (
    <>
      <AnimatePresence>
        {isRenderID({ name: "menu-h-mobile", id: 300, status: false }) && (
          <Overlay
            initial={{ x: -500, scale: 0, opacity: 0 }}
            animate={{ x: 0, scale: 1, opacity: 1 }}
            exit={{ x: -500, scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 15, mass: 1, bounce: 0.3 }}
          >
            <div className="absolute right-auto left-0 z-50 flex h-full flex-col items-center justify-start bg-white">
              <Nav classNameUL="p-3 m-2" classNameLI="py-2 px-3 border-b border-blue-50 rounded-full my-2">
                <span className="flex min-h-10 min-w-10 items-center justify-center rounded-full shadow-md shadow-blue-50">
                  <i className="text-blue-400">
                    <FontAwesomeIcon icon={faAngleRight} />
                  </i>
                </span>
              </Nav>
              <div className="absolute right-0 bottom-0 left-0 flex items-center justify-center py-5">
                <Button onClick={() => closeID({ name: "menu-h-mobile", id: 300, status: false })}>
                  <i>
                    <FontAwesomeIcon icon={faX} />
                  </i>
                </Button>
              </div>
            </div>
          </Overlay>
        )}
      </AnimatePresence>
    </>
  );
}
