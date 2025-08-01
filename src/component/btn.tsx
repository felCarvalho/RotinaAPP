import { motion } from "framer-motion";

interface ButtonType {
  children?: React.ReactNode;
  onClick?: () => void;
  type: "button" | "submit" | "reset";
  className?: string;
  status?: boolean;
  layoutId?: string;
  id?: string;
  ariaLabel?: string;
};

export function Button({ children, onClick, type, className, status, layoutId, id, ariaLabel }: ButtonType) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300 }}
      type={type}
      disabled={status}
      layoutId={layoutId}
      id={id}
      aria-label={ariaLabel}
      className={`${className} cursor-pointer rounded-full border-none bg-blue-400 px-3 py-1.5 text-base text-white shadow-md shadow-blue-50 outline-2 outline-offset-4 outline-transparent transition-discrete will-change-auto focus:outline-blue-200 active:bg-blue-200`}
    >
      {children}
    </motion.button>
  );
}
