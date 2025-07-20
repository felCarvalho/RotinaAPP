import { motion } from "framer-motion";

export function Loading({ title, className, children }) {
  return (
    <motion.div>
      <div className={className}>
        <h3 className="text-2xl font-medium tracking-wide text-blue-400">{title}</h3>
        <div className="min-w-full">{children}</div>
      </div>
    </motion.div>
  );
}
