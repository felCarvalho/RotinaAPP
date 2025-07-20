import { motion } from "framer-motion";

export function Input({ value, name, className, onChange, type, placeholder, status, layoutId, checked, id, ...props }) {
  return (
    <motion.input
      type={type}
      onChange={onChange}
      whileTap={{ scale: 0.9, stitchTiles: 300 }}
      transition={{ type: "spring" }}
      className={`${className} w-full rounded-full border border-blue-50 p-2.5 indent-1.5 text-base text-blue-900 shadow-sm shadow-blue-50 outline-offset-4 transition-discrete will-change-auto placeholder:text-sm placeholder:text-blue-300 focus:bg-blue-50 focus:shadow-none focus:outline-blue-50`}
      value={value}
      placeholder={placeholder}
      disabled={status}
      name={name}
      checked={checked}
      id={id}
      layoutId={layoutId}
      {...props}
    />
  );
}
