import { motion, HTMLMotionProps } from "framer-motion";

type H1 = HTMLMotionProps<"h1"> & {
  children?: React.ReactNode;
  title: string;
  className?: string;
};

//esse componente serve para situações onde você declara o Title da pagina ou do app
export function H1({ children, title, className, ...props }: H1) {
  return (
    <motion.h1 {...props} className={`${className} text-3xl font-medium tracking-wide text-shadow-blue-100 text-shadow-sm`}>
      {title}
      {children}
    </motion.h1>
  );
}
