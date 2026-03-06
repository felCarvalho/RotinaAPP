import { faListAlt, faPen, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../../btn";

export function PopupOptionsTasks({ id }: { id: string }) {
  return (
    <div className="flex flex-col gap-2">
      <Button
        type="button"
        onClick={() => {}}
        className="flex flex-row gap-2 rounded-full bg-white text-base shadow-sm shadow-blue-50"
      >
        <i className="text-blue-400">
          <FontAwesomeIcon icon={faPen} />
        </i>
        <p className="font-medium text-blue-400">Renomear</p>
      </Button>
      <Button
        type="button"
        onClick={() => {}}
        className="flex flex-row gap-2 rounded-full bg-white text-base shadow-sm shadow-blue-50"
      >
        <i className="text-blue-400">
          <FontAwesomeIcon icon={faX} />
        </i>
        <p className="font-medium text-blue-400">Apagar</p>
      </Button>
      <Button
        type="button"
        onClick={() => {}}
        className="flex flex-row gap-2 rounded-full bg-white text-base shadow-sm shadow-blue-50"
      >
        <i className="text-blue-400">
          <FontAwesomeIcon icon={faListAlt} />
        </i>
        <p className="font-medium text-blue-400">detalhes</p>
      </Button>
    </div>
  );
}
