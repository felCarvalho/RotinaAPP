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
      className={`${className} truncate text-base font-medium tracking-wide`}
    >
      {children}
      {title}
    </motion.p>
  );
}
