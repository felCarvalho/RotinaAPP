import { motion, type HTMLMotionProps } from "framer-motion";

type H1 = HTMLMotionProps<"h1"> & {
  children?: React.ReactNode;
  title: string;
  className?: string;
};

//esse componente serve para situações onde você declara o Title da pagina ou do app
export function H1({ children, title, className, ...props }: H1) {
  return (
    <motion.h1
      {...props}
      className={`${className} truncate text-xl sm:text-2xl lg:text-3xl font-medium tracking-wide`}
    >
      {title}
      {children}
    </motion.h1>
  );
}
