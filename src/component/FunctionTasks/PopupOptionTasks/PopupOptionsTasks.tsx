import { faListAlt, faPen, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { parseAsBoolean, parseAsString, useQueryStates } from "nuqs";
import { RotinaStore } from "../../../store/UseRotina";
import { Button } from "../../btn";

export function PopupOptionsTasks({ id }: { id: string }) {
  const { deletarTask } = RotinaStore();
  const [, setQuery] = useQueryStates(
    {
      renomear: parseAsString,
      detalhes: parseAsString,
      modal: parseAsBoolean,
    },
    {
      history: "push",
    },
  );

  return (
    <div className="flex flex-col gap-2">
      <Button
        type="button"
        onClick={() => {
          setTimeout(() => {
            setQuery((s) => ({
              ...s,
              renomear: id,
              modal: true,
            }));
          }, 300);
        }}
        className="flex flex-row gap-2 rounded-full bg-white text-base shadow-sm shadow-blue-50"
      >
        <i className="text-blue-400">
          <FontAwesomeIcon icon={faPen} />
        </i>
        <p className="font-medium text-blue-400">Renomear</p>
      </Button>
      <Button
        type="button"
        onClick={() => {
          deletarTask({ id: id });
        }}
        className="flex flex-row gap-2 rounded-full bg-white text-base shadow-sm shadow-blue-50"
      >
        <i className="text-blue-400">
          <FontAwesomeIcon icon={faX} />
        </i>
        <p className="font-medium text-blue-400">Apagar</p>
      </Button>
      <Button
        type="button"
        onClick={() => {
          setTimeout(() => {
            setQuery((s) => ({
              ...s,
              detalhes: id,
              modal: true,
            }));
          }, 300);
        }}
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
