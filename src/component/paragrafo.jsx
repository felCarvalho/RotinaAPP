import { motion } from "framer-motion";

export function P({ children, title, className, ...props }) {
  return (
    <motion.p {...props} className={`${className} text-sm font-medium tracking-wide text-shadow-blue-50 text-shadow-xs`}>
      {children}
      {title}
    </motion.p>
  );
}
