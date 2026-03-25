import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../../component/btn";
import { Overlay } from "../../component/overlay";
import { P } from "../../component/paragrafo";
import { H3 } from "../../component/subTitle";
import { useQueryStates, parseAsString } from "nuqs";
import { useMatchesTypeds } from "../../utils/FunctionUtils/FunctionUtils";
import { handle, type Handle } from "../../pages/Tasks/controllers/handle";
import type { dataTasks } from "../../pages/Tasks/type.server";

export function DetalhesRotina() {
  const matches = useMatchesTypeds<Handle, dataTasks>();
  const findHandle = matches.find((s) => s?.handle === handle);
  const data = findHandle?.loaderData.data;
  const [detalhesTask, setDetalhesTask] = useQueryStates(
    {
      detalhes: parseAsString,
    },
    {
      history: "push",
    },
  );

  const findTasksId = data?.data.find((t) => t.id === detalhesTask.detalhes);

  return (
    <>
      {detalhesTask.detalhes && (
        <Overlay
          initial={{ scale: 0.2, opacity: 0.3 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <div className="absolute right-2 left-2 flex flex-col justify-center gap-2 rounded-[50px] p-5 shadow-2xl shadow-blue-50">
            <div
              key={findTasksId?.id}
              className="flex-crow flex items-center gap-1 text-blue-400"
            >
              <H3 title="Rotina:" />
              <P
                className="max-w-full truncate text-blue-300"
                title={findTasksId?.title ?? ""}
              />
            </div>
            <div
              key={findTasksId?.id}
              className="flex flex-row items-center gap-1 text-blue-400"
            >
              <H3 title="Descrição:" />
              <P
                className="max-w-full truncate text-blue-300"
                title={findTasksId?.description ?? ""}
              />
            </div>
            <div
              key={findTasksId?.id}
              className="flex flex-row items-center gap-1 text-blue-400"
            >
              <H3 title="Categoria:" />
              <P
                className="max-w-full truncate text-blue-300"
                title={
                  typeof findTasksId?.category === "object"
                    ? findTasksId?.category?.title
                    : ""
                }
              />
            </div>
            <div
              key={findTasksId?.id}
              className="flex flex-row items-center gap-1 text-blue-400"
            >
              <H3 title="Status:" />
              <P
                className="max-w-full truncate text-blue-300"
                title={
                  findTasksId?.completed === "Concluída"
                    ? "Concluído"
                    : "Incompleta"
                }
              />
            </div>
            <div
              key={findTasksId?.id}
              className="flex flex-row items-center gap-1 text-blue-400"
            >
              <H3 title="ID Rotina:" />
              <P
                className="max-w-full truncate text-blue-300"
                title={findTasksId?.id ?? ""}
              />
            </div>
            <div
              key={findTasksId?.id}
              className="flex flex-row items-center gap-1 text-blue-400"
            >
              <H3 title="ID Categoria:" />
              <P
                className="max-w-full truncate text-blue-300"
                title={
                  typeof findTasksId?.category === "object"
                    ? (findTasksId?.category.id ?? "")
                    : (findTasksId?.category ?? "")
                }
              />
            </div>
            {!findTasksId && (
              <div className="mx-12 rounded-full bg-blue-50 p-1.5 shadow-sm shadow-blue-100">
                <p className="text-center text-base font-bold text-blue-300">
                  sem tasks encontradas
                </p>
              </div>
            )}
            <div className="flex w-full items-center justify-center">
              <Button
                type="reset"
                onClick={() => setDetalhesTask({ detalhes: null })}
                ariaLabel="Fechar"
                className="min-h-10 min-w-10 p-0!"
              >
                <i>
                  <FontAwesomeIcon icon={faX} />
                </i>
              </Button>
            </div>
          </div>
        </Overlay>
      )}
    </>
  );
}
