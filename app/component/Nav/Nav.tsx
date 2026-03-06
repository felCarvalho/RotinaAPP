import { NavLink } from "react-router";
import { P } from "../paragrafo";
import { motion } from "framer-motion";

export function Nav({
  classNameUL,
  classNameLI,
  onClick,
  children,
}: {
  classNameUL: string;
  classNameLI: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <nav className="w-full">
      <ul className={`${classNameUL} select-none`}>
        <motion.li
          className={`${classNameLI}`}
          whileTap={{ scale: 0.9, stitchTiles: 300 }}
          key={""}
        >
          <NavLink
            onClick={onClick}
            to={""}
            className={({ isActive }) =>
              !isActive
                ? "flex flex-row items-center justify-between gap-2 text-base font-medium text-blue-400"
                : "flex flex-row items-center justify-between gap-2 font-normal text-blue-300"
            }
          >
            <span className="flex flex-row items-center justify-between gap-3">
              <i>{""}</i>
              <P className={``} title={""} />
            </span>
            {children}
          </NavLink>
        </motion.li>
      </ul>
    </nav>
  );
}
