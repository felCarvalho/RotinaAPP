import { Input } from "./input";
import { Button } from "./btn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

interface SearchFloat {
  onBack: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export function SearchFloatBar({ onBack, onChange, value }: SearchFloat) {
  return (
    <motion.form
      className="fixed right-5 bottom-15 left-5 flex items-center justify-center gap-5"
      initial={{ y: 100, scaleX: 0, opacity: 0 }}
      animate={{ y: 0, scaleX: 1, opacity: 1 }}
      exit={{ y: 100, scaleX: 0, opacity: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 15, mass: 1, duration: 0.5 }}
    >
      <Button onClick={onBack} type="button" className="flex flex-row items-center justify-center gap-2">
        <i>
          <FontAwesomeIcon icon={faAngleLeft} />
        </i>
        <p className="font-medium">Voltar</p>
      </Button>
      <Input
        type=""
        onChange={onChange}
        value={value}
        placeholder="Pesquise suas Rotinas..."
        className="border-blue-100 bg-white/80 opacity-95 !shadow-2xl shadow-blue-100 backdrop-blur-3xl placeholder:font-semibold placeholder:tracking-wide focus:border-white focus:bg-white/90 focus:outline-white"
      />
    </motion.form>
  );
}
