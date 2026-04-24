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
    <div
      className={`sticky top-0 z-50 h-screen shrink-0 hidden lg:flex flex-col items-center justify-start bg-blue-50/30 border-r border-blue-100/50 transition-all`}
    >
      {/* Container Fixo do Botão de Toggle */}
      <div className="w-full flex items-center justify-center py-5 sticky top-0 bg-transparent z-10">
        <button
          type="button"
          aria-label="Toggle Menu"
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
      <div className="scrollbar-hide flex-1 w-full overflow-y-auto px-4 flex flex-col gap-5 pb-5">
        {NAV_LINKS.map((s) => {
          const isActive = pathname === `/${s.link}` || (s.link !== "home" && pathname.includes(s.link));
          
          return (
            <div key={s.link} className="w-full">
              <NavLink
                to={s.link}
                end={s.link === "home"}
                className={`flex flex-row items-center p-1 rounded-full cursor-pointer ${
                  openBar.trim() 
                    ? (isActive ? "border-blue-100 bg-white border" : "bg-white border-blue-50 border hover:bg-blue-50") 
                    : (isActive ? "border-blue-100 border bg-blue-50/20" : "border border-transparent border hover:bg-white")
                } ${openBar.trim() ? "justify-start gap-4" : "justify-center"}`}
              >
                <i className="flex aspect-square min-h-11 min-w-11 items-center justify-center">
                  <FontAwesomeIcon 
                    icon={s.icon} 
                    size="lg" 
                    className={isActive ? "text-blue-300" : "text-blue-400"}
                  />
                </i>
                {openBar.trim() && (
                  <P 
                    title={s.title} 
                    className={`font-medium ${isActive ? "text-blue-300" : "text-blue-400"}`} 
                  />
                )}
              </NavLink>
            </div>
          );
        })}
      </div>
    </div>
  );
}
