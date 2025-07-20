import { motion } from "framer-motion";

//esse componente serve para situações onde você declara o Title da pagina ou do app
export function H1({ children, title, className, ...props }) {
  return (
    <motion.h1 {...props} className={`${className} text-3xl font-medium tracking-wide text-shadow-blue-100 text-shadow-sm`}>
      {title}
      {children}
    </motion.h1>
  );
}

//
