import { NavLink, useLocation } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { NAV_LINKS } from "../../utils/constants/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { H3 } from "../../component/subTitle";
import { P } from "../../component/paragrafo";

export function HeaderMobile() {
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Barra Inferior Horizontal */}
      {!isMenuOpen && (
        <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-20 items-center border-t border-blue-50 bg-white/90 backdrop-blur-lg lg:hidden">
          <div className="scrollbar-hide flex h-full flex-1 items-center gap-4 overflow-x-auto px-4 pb-1">
            {NAV_LINKS.map((s) => {
              const isActive = pathname === `/${s.link}` || (s.link !== "home" && pathname.includes(s.link));
              return (
                <NavLink
                  key={s.link}
                  to={s.link}
                  end={s.link === "home"}
                  className="flex shrink-0 flex-col items-center justify-center gap-1"
                >
                  <i className={`flex aspect-square min-h-11 min-w-11 items-center justify-center rounded-full transition-all border ${
                    isActive ? "border-blue-100 bg-white text-blue-300" : "border-transparent text-blue-400"
                  }`}>
                    <FontAwesomeIcon icon={s.icon} size="lg" />
                  </i>
                  <span className={`text-[10px] font-medium transition-colors ${isActive ? "text-blue-300" : "text-blue-400"} whitespace-nowrap`}>
                    {s.title}
                  </span>
                </NavLink>
              );
            })}
          </div>

          {/* Botão Hambúrguer Fixo */}
          <div className="flex h-full w-20 items-center justify-center border-l border-blue-50 bg-white/90 px-2 backdrop-blur-lg shrink-0">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="flex flex-col items-center justify-center gap-1"
            >
              <i className="flex aspect-square min-h-11 min-w-11 items-center justify-center rounded-full border border-blue-50 bg-white text-blue-400 active:bg-blue-50">
                <FontAwesomeIcon icon={faBars} size="lg" />
              </i>
              <span className="text-[10px] font-medium text-blue-400">Menu</span>
            </button>
          </div>
        </nav>
      )}

      {/* Menu Overlay Fullscreen (Sem sombras) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="fixed inset-0 z-50 flex flex-col bg-white lg:hidden"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-blue-50 bg-white">
              <div className="flex flex-col">
                <H3 title="Navegação" className="text-lg font-bold text-blue-400" />
                <P title="Selecione uma opção" className="text-xs text-blue-300" />
              </div>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="flex aspect-square min-h-11 min-w-11 items-center justify-center rounded-full border border-blue-50 bg-white text-blue-400 active:scale-90"
              >
                <FontAwesomeIcon icon={faXmark} size="lg" />
              </button>
            </div>

            <div className="flex flex-col gap-3 overflow-y-auto p-4 flex-1 scrollbar-hide bg-blue-50/5">
              {NAV_LINKS.map((s) => {
                const isActive = pathname === `/${s.link}` || (s.link !== "home" && pathname.includes(s.link));
                return (
                  <NavLink
                    key={s.link}
                    to={s.link}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex flex-row items-center gap-4 rounded-3xl p-4 transition-all border ${
                      isActive 
                        ? "border-blue-100 bg-white" 
                        : "bg-white border-blue-50 hover:bg-blue-50"
                    }`}
                  >
                    <div className={`flex aspect-square min-h-12 min-w-12 items-center justify-center rounded-2xl bg-blue-50/50 ${isActive ? "text-blue-300" : "text-blue-400"}`}>
                      <FontAwesomeIcon icon={s.icon} size="lg" />
                    </div>
                    <div className="flex flex-col overflow-hidden">
                      <span className={`text-base font-medium ${isActive ? "text-blue-300" : "text-blue-400"}`}>{s.title}</span>
                      <span className={`text-xs truncate font-normal ${isActive ? "text-blue-300/80" : "text-blue-300"}`}>{s.description}</span>
                    </div>
                  </NavLink>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
