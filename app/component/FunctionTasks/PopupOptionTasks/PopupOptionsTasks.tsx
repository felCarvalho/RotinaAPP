import { faListAlt, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../../btn";
import { useSubmit, useNavigate } from "react-router";

export function PopupOptionsTasks({ id }: { id: string }) {
  const submit = useSubmit();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-2 p-1">
      <Button
        type="button"
        onClick={() => navigate(`detalhes/${id}`)}
        className="flex flex-row items-center gap-3 rounded-full bg-white! text-blue-400! shadow-2xs border border-blue-50"
      >
        <FontAwesomeIcon icon={faListAlt} size="lg" />
        <span className="font-medium text-blue-400">Ver detalhes</span>
      </Button>

      <Button
        type="button"
        onClick={() => navigate(`renomear/${id}`)}
        className="flex flex-row items-center gap-3 rounded-full bg-white! text-blue-400! shadow-2xs border border-blue-50"
      >
        <FontAwesomeIcon icon={faPen} size="lg" />
        <span className="font-medium text-blue-400">Renomear</span>
      </Button>

      <Button
        type="button"
        className="flex flex-row items-center gap-3 rounded-full bg-white! text-blue-400! shadow-2xs border border-blue-50"
        onClick={() =>
          submit(
            { intent: "delete-task", idTask: id },
            { method: "DELETE", action: "/home" },
          )
        }
      >
        <FontAwesomeIcon icon={faTrash} size="lg" />
        <span className="font-medium text-blue-400">Apagar</span>
      </Button>
    </div>
  );
}
