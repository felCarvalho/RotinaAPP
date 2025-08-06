import { motion } from "framer-motion";

interface RadioType {
  children?: React.ReactNode;
  id?: string;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  ariaLabel?: string;
  classNameRadio?: string;
  classNameLabel?: string;
}

export function Radio({ children, id, checked, onChange, ariaLabel, classNameRadio, classNameLabel }: RadioType) {
  return (
    <motion.label
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring" }}
      htmlFor={id}
      className={`${classNameLabel} relative flex items-center`}
    >
      <input
        type="checkbox"
        checked={checked}
        id={id}
        onChange={onChange}
        aria-label={ariaLabel}
        className={`${classNameRadio} peer h-6 w-6 appearance-none rounded-full border-1 border-blue-100 bg-white outline-0 outline-offset-4 focus:outline-2 focus:outline-blue-50`}
      />
      {children ?? <span className="absolute top-1 left-1 h-4 w-4 rounded-full peer-checked:bg-blue-400"></span>}
    </motion.label>
  );
}
