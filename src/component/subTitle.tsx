import { motion, HTMLMotionProps } from "framer-motion";

type H3 = HTMLMotionProps<"h3"> & {
  children?: React.ReactNode;
  title: string;
  className?: string;
};
//esse componente serve para situações onde... 'Ex: "categoria: criar uma landing page"
//'categoria fica envolvida pelo h3 já pré estilizado
export function H3({ children, title, className, ...props }: H3) {
  return (
    <motion.h3 {...props} className={`${className} text-sm font-medium tracking-wide text-shadow-blue-100 text-shadow-xs`}>
      {children} {title}
    </motion.h3>
  );
}

//text-sm font-medium tracking-wide text-shadow-blue-50 text-shadow-sm
