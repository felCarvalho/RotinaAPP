import { motion } from "framer-motion";
import { forwardRef } from "react";

interface ButtonType {
  children?: React.ReactNode;
  onClick?: () => void;
  type: "button" | "submit" | "reset";
  className?: string;
  status?: boolean;
  layoutId?: string;
  id?: string;
  ariaLabel?: string;
  name?: string;
  value?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonType>(
  (
    {
      children,
      onClick,
      type,
      className,
      status,
      layoutId,
      id,
      ariaLabel,
      name,
      value,
    },
    ref,
  ) => {
    const motionProps = layoutId ? { layoutId } : {};

    return (
      <motion.button
        ref={ref}
        name={name}
        value={value}
        onClick={onClick}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 300 }}
        type={type}
        disabled={status}
        id={id}
        aria-label={ariaLabel}
        {...motionProps}
        className={`${className} cursor-pointer truncate rounded-full border-none bg-blue-500 px-5 py-2.5 text-base font-medium text-white shadow-md shadow-blue-50 outline-2 outline-offset-4 outline-transparent hover:bg-blue-600 focus:outline-blue-300 active:bg-blue-700`}
      >
        {children}
      </motion.button>
    );
  },
);

Button.displayName = "Button";
