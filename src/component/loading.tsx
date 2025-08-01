import { motion } from "framer-motion";

interface loadingType {
  title: string;
  className?: string;
  children?: React.ReactNode;
}

export function Loading({ title, className, children }: loadingType) {
  return (
    <motion.div>
      <div className={className}>
        <h3 className="text-2xl font-medium tracking-wide text-blue-400">{title}</h3>
        <div className="min-w-full">{children}</div>
      </div>
    </motion.div>
  );
}
