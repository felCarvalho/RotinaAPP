import { motion, type HTMLMotionProps } from "framer-motion";

interface OverlayType extends HTMLMotionProps<"div"> {
  children?: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  ariaLabelledby?: string;
}

export function Overlay({
  children,
  className,
  ariaLabel,
  ariaLabelledby,
  ...props
}: OverlayType) {
  return (
    <motion.div
      {...props}
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      className={`${className} fixed top-0 right-0 bottom-0 left-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-md select-none`}
    >
      {children}
    </motion.div>
  );
}
