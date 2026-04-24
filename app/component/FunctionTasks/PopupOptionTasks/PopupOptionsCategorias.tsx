import { faCheck, faPen, faTrash, faX, faListAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../../btn";
import { useSubmit, useNavigate } from "react-router";

export function PopupOptionsCategorias({ id }: { id: string }) {
  const submit = useSubmit();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-2 p-1">
      <Button
        type="button"
        onClick={() => navigate(`detalhes-categoria/${id}`)}
        className="flex flex-row items-center gap-3 rounded-full bg-white! text-blue-400! shadow-2xs border border-blue-50"
      >
        <FontAwesomeIcon icon={faListAlt} size="lg" />
        <span className="font-medium">Ver detalhes</span>
      </Button>

      <Button
        type="button"
        onClick={() => navigate(`renomear/${id}`)}
        className="flex flex-row items-center gap-3 rounded-full bg-white! text-blue-400! shadow-2xs border border-blue-50"
      >
        <FontAwesomeIcon icon={faPen} size="lg" />
        <span className="font-medium">Renomear</span>
      </Button>

      <Button
        type="button"
        className="flex flex-row items-center gap-3 rounded-full bg-white! text-blue-400! shadow-2xs border border-blue-50"
        onClick={() =>
          submit(
            {
              idCategory: id,
              intent: "delete-category-task-category",
            },
            {
              method: "DELETE",
              action: "/home/categorias",
            },
          )
        }
      >
        <FontAwesomeIcon icon={faTrash} size="lg" />
        <span className="font-medium">Apagar</span>
      </Button>

      <Button
        type="button"
        className="flex flex-row items-center gap-3 rounded-full bg-white! text-blue-400! shadow-2xs border border-blue-50"
        onClick={() =>
          submit(
            {
              idCategory: id,
              completed: "Concluída",
              intent: "update-status-task-category",
            },
            {
              method: "PATCH",
              action: "/home/categorias",
            },
          )
        }
      >
        <FontAwesomeIcon icon={faCheck} size="lg" />
        <span className="font-medium">Concluída</span>
      </Button>

      <Button
        type="button"
        className="flex flex-row items-center gap-3 rounded-full bg-white! text-blue-400! shadow-2xs border border-blue-50"
        onClick={() =>
          submit(
            {
              idCategory: id,
              completed: "Incompleta",
              intent: "update-status-task-category",
            },
            {
              method: "PATCH",
              action: "/home/categorias",
            },
          )
        }
      >
        <FontAwesomeIcon icon={faX} size="lg" />
        <span className="font-medium">Incompleta</span>
      </Button>
    </div>
  );
}
