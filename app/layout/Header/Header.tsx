import { useNavigate, useLocation, NavLink } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { P } from "../../component/paragrafo";
import { NAV_LINKS } from "../../utils/constants/navigation";

export function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [openBar, setOpenBar] = useState<string>("");

  return (
    <nav
      aria-label="Navegação principal"
      className={`sticky top-0 z-50 hidden h-screen shrink-0 flex-col items-center justify-start border-r border-blue-100/50 bg-blue-50/30 transition-all lg:flex`}
    >
      {/* Container Fixo do Botão de Toggle */}
      <div className="sticky top-0 z-10 flex w-full items-center justify-center bg-transparent py-5">
        <button
          type="button"
          aria-label="Toggle Menu"
          aria-expanded={!!openBar.trim()}
          aria-controls="sidebar-nav-list"
          className="flex aspect-square min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-full border border-blue-50 bg-white hover:bg-blue-100"
          onClick={() => setOpenBar((s) => (s.trim() ? "" : "open"))}
        >
          {openBar.trim() ? (
            <div className="relative h-6 w-6">
              <span className="absolute top-1/2 left-0 h-0.5 w-6 -translate-y-1/2 rotate-45 rounded-full bg-blue-400" />
              <span className="absolute top-1/2 left-0 h-0.5 w-6 -translate-y-1/2 -rotate-45 rounded-full bg-blue-400" />
            </div>
          ) : (
            <div className="flex h-5 w-5 flex-col items-center justify-center gap-1.5">
              <span className="h-0.5 w-6 rounded-full bg-blue-400" />
              <span className="h-0.5 w-6 rounded-full bg-blue-400" />
              <span className="h-0.5 w-6 rounded-full bg-blue-400" />
            </div>
          )}
        </button>
      </div>

      {/* Container de Scroll dos Links */}
      <div
        id="sidebar-nav-list"
        className="scrollbar-hide flex w-full flex-1 flex-col gap-5 overflow-y-auto px-4 pb-5"
      >
        {NAV_LINKS.map((s) => {
          const isActive =
            pathname === `/${s.link}` ||
            (s.link !== "home" && pathname.includes(s.link));

          return (
            <div key={s.link} className="w-full">
              <NavLink
                to={s.link}
                end={s.link === "home"}
                className={`flex cursor-pointer flex-row items-center rounded-full p-1 ${
                  openBar.trim()
                    ? isActive
                      ? "border border-blue-100 bg-white"
                      : "border border-blue-50 bg-white hover:bg-blue-50"
                    : isActive
                      ? "border border-blue-100 bg-blue-50/20"
                      : "border border-transparent hover:bg-white"
                } ${openBar.trim() ? "justify-start gap-4" : "justify-center"}`}
              >
                <span
                  aria-hidden="true"
                  className="flex aspect-square min-h-11 min-w-11 items-center justify-center"
                >
                  <FontAwesomeIcon
                    icon={s.icon}
                    size="lg"
                    className={isActive ? "text-blue-500" : "text-blue-400"}
                  />
                </span>
                {openBar.trim() && (
                  <P
                    title={s.title}
                    className={`font-medium ${isActive ? "text-blue-500" : "text-blue-400"}`}
                  />
                )}
              </NavLink>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
