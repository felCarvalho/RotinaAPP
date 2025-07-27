import { motion } from "framer-motion";

export function Overlay({ children, className, ...props }) {
  return (
    <motion.div
      {...props}
      className={`${className} fixed top-0 right-0 bottom-0 left-0 z-50 flex items-center justify-center backdrop-blur-3xl select-none`}
    >
      {children}
    </motion.div>
  );
}
