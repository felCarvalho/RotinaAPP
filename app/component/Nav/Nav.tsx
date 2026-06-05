import { NavLink } from "react-router";
import { P } from "../paragrafo";
import { motion } from "framer-motion";

export function Nav({
  classNameUL,
  classNameLI,
  onClick,
  children,
  to,
  title,
}: {
  classNameUL?: string;
  classNameLI?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  to: string;
  title?: string;
}) {
  return (
    <nav className="w-full">
      <div className={`${classNameUL} select-none`}>
        <motion.div
          className={`${classNameLI}`}
          whileTap={{ scale: 0.9, stitchTiles: 300 }}
          key={to}
        >
          <NavLink
            onClick={onClick}
            to={to}
            className={({ isActive }) =>
              !isActive
                ? "flex flex-row items-center justify-between gap-2 text-base font-medium text-blue-400"
                : "flex flex-row items-center justify-between gap-2 font-normal text-blue-500"
            }
          >
            <span className="flex min-w-0 flex-row items-center justify-between gap-3">
              <span aria-hidden="true"></span>
              <P className="min-w-0" title={title ?? ""} />
            </span>
            {children}
          </NavLink>
        </motion.div>
      </div>
    </nav>
  );
}
