import { faListAlt, faPen, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../../btn";
import { parseAsString, useQueryStates } from "nuqs";
import { useSubmit } from "react-router";

export function PopupOptionsTasks({ id }: { id: string }) {
  const [, setSearchParams] = useQueryStates({
    renomear: parseAsString,
    detalhes: parseAsString,
  });
  const submit = useSubmit();

  return (
    <div className="flex flex-col gap-2">
      <Button
        type="button"
        onClick={() => setSearchParams({ renomear: id })}
        className="flex flex-row gap-2 rounded-full bg-white text-base shadow-sm shadow-blue-50"
      >
        <i className="text-blue-400">
          <FontAwesomeIcon icon={faPen} />
        </i>
        <p className="font-medium text-blue-400">Renomear</p>
      </Button>
      <Button
        type="button"
        className="flex flex-row gap-2 rounded-full bg-white text-base shadow-sm shadow-blue-50"
        onClick={() =>
          submit(
            { intent: "delete", idTask: id },
            { method: "DELETE", action: "/home" },
          )
        }
      >
        <i className="text-blue-400">
          <FontAwesomeIcon icon={faX} />
        </i>
        <p className="font-medium text-blue-400">Apagar</p>
      </Button>
      <Button
        type="submit"
        className="flex flex-row gap-2 rounded-full bg-white text-base shadow-sm shadow-blue-50"
        onClick={() => setSearchParams({ detalhes: id })}
      >
        <i className="text-blue-400">
          <FontAwesomeIcon icon={faListAlt} />
        </i>
        <p className="font-medium text-blue-400">detalhes</p>
      </Button>
    </div>
  );
}
