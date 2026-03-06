import { motion, type HTMLMotionProps } from "framer-motion";

interface OverlayType extends HTMLMotionProps<"div"> {
  children?: React.ReactNode;
  className?: string;
}

export function Overlay({ children, className, ...props }: OverlayType) {
  return (
    <motion.div
      {...props}
      className={`${className} fixed top-0 bottom-0 flex items-center justify-center right-0 left-0 z-50  backdrop-blur-3xl select-none`}
    >
      {children}
    </motion.div>
  );
}
