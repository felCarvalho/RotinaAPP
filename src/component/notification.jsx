import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Notification() {
  return (
    <motion.div classNamesName="absolute right-0 left-0 top-10 bottom-0 w-full p-5">
      <motion.div className="flex w-full flex-row items-center justify-center">
        <i>
          <FontAwesomeIcon icon={{}} />
        </i>

        <h2 className="text-blue-200">{}</h2>
      </motion.div>
    </motion.div>
  );
}
