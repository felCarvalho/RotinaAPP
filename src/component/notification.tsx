import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Notification() {
  return (
    <motion.div className="absolute top-10 right-0 bottom-0 left-0 w-full p-5">
      <motion.div className="flex w-full flex-row items-center justify-center">
        <i></i>

        <h2 className="text-blue-200">{}</h2>
      </motion.div>
    </motion.div>
  );
}
