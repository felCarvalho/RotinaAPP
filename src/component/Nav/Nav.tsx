import { NavLinks } from "../../constants/NavData/NavData";
import { NavLink } from "react-router";
import { useResizeView } from "../../hooks/UseResizeView";
import { P } from "../paragrafo";
import { motion } from "framer-motion";

interface NavTypes {
  classNameUL?: string;
  classNameLI?: string;
  onClick: () => void;
  children?: React.ReactNode;
}

export function Nav({ classNameUL, classNameLI, onClick, children }: NavTypes) {
  const { verificarWidth } = useResizeView();
  return (
    <nav className="w-full">
      <ul className={`${classNameUL} select-none`}>
        {NavLinks.map((l, i) => (
          <motion.li className={`${classNameLI}`} whileTap={{ scale: 0.9, stitchTiles: 300 }} key={i}>
            <NavLink
              onClick={onClick}
              to={l?.link}
              className={({ isActive }) =>
                !isActive
                  ? "flex flex-row items-center justify-between gap-2 text-base font-medium text-blue-400"
                  : "flex flex-row items-center justify-between gap-2 font-normal text-blue-300"
              }
            >
              <span className="flex flex-row items-center justify-between gap-3">
                <i>{l?.icon}</i>
                <P className={`${!verificarWidth({ largura: 360 }) ? "w-40" : ""} truncate text-[18px]`} title={l?.text} />
              </span>
              {children}
            </NavLink>
          </motion.li>
        ))}
      </ul>
    </nav>
  );
}
