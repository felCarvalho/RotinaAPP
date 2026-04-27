import { Button } from "../../../btn";
import { P } from "../../../paragrafo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FILTER_STATUS_OPTIONS } from "../../../../utils/constants/filters";

export function PopupFilterStatus() {
  return (
    <div className="flex flex-col gap-2 min-w-[160px]">
      {FILTER_STATUS_OPTIONS.map((option) => (
        <Button
          key={option.value}
          type="button"
          className="flex w-full flex-row items-center gap-3 bg-white hover:bg-blue-50 transition-colors py-2 px-4 shadow-none!"
        >
          <FontAwesomeIcon icon={option.icon} className="text-blue-400 w-5" />
          <P title={option.title} className="text-blue-900 font-medium" />
        </Button>
      ))}
    </div>
  );
}
