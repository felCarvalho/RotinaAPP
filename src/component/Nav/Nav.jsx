import { NavLinks } from "../../constants/NavData/NavData";
import { NavLink } from "react-router";
import { motion } from "framer-motion";
import { Button } from "../btn";
import { useResizeView } from "../../hooks/UseResizeView";
import { P } from "../paragrafo";

export function Nav() {
  const { verificarWidth } = useResizeView();
  return (
    <nav className="w-full p-2">
      <ul className="px-5">
        {NavLinks.map((l, i) => (
          <motion.li className="my-3" whileTap={{ scale: 0.9, stitchTiles: 300 }} key={i}>
            <NavLink
              className={({ isActive, isTransitioning }) =>
                isTransitioning
                  ? "justify-betweenfont-normal flex flex-row items-center opacity-85"
                  : isActive
                    ? "flex flex-row items-center justify-between text-base font-medium text-blue-400"
                    : "flex flex-row items-center justify-between font-normal text-blue-100"
              }
            >
              <span className="flex flex-row items-start justify-between gap-3">
                {l?.icon}
                <P className={`${!verificarWidth({ largura: 360 }) ? "w-40" : ""} truncate text-[18px]`} title={l?.link} />
              </span>
              <Button ariaLabel="acessar link" className="text-rigth bg-transparent">
                <i className="text-blue-400">{l?.genericIcon}</i>
              </Button>
            </NavLink>
          </motion.li>
        ))}
      </ul>
    </nav>
  );
}
