import { type HTMLMotionProps, motion } from "framer-motion";

interface typeP extends HTMLMotionProps<"p"> {
  children?: React.ReactNode;
  title: string;
  className?: string;
}

export function P({ children, title, className, ...props }: typeP) {
  return (
    <motion.p
      {...props}
      className={`${className} text-base font-medium tracking-wide text-shadow-blue-50 text-shadow-xs`}
    >
      {children}
      {title}
    </motion.p>
  );
}
