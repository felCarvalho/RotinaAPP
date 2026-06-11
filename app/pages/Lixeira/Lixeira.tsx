import {
  faAngleLeft,
  faTrashArrowUp,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFetcher, useLoaderData, useNavigate } from "react-router";
import { H3 } from "../../component/subTitle";
import { P } from "../../component/paragrafo";
import { Button } from "../../component/btn";
import type { loader } from "./controllers/loader.server";
import type { Task } from "../Tasks/type.server";

export function LixeiraJSX() {
  const data = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const fetcher = useFetcher();

  const tasks: Task[] = data?.data ?? [];

  return (
    <div className="h-full w-full">
      {/* Cabeçalho fixo — responsivo: margem/padding escalam */}
      <div className="sticky top-0 z-40 mb-4 bg-white/80 px-2 py-3 backdrop-blur-md sm:mb-6 sm:py-4">
        <button
          onClick={() => navigate(-1)}
          className="flex w-min cursor-pointer flex-row items-center gap-1.5 rounded-full px-2 hover:bg-blue-50 sm:gap-2"
          type="button"
        >
          <FontAwesomeIcon
            icon={faAngleLeft}
            className="text-blue-400"
            size="lg"
          />
          <span className="w-max text-xl font-medium tracking-wide text-blue-400 sm:text-2xl lg:text-3xl">
            Lixeira
          </span>
        </button>
      </div>

      {/* Lista de tarefas deletadas */}
      {tasks.length ? (
        tasks.map((t: Task) => (
          <div className="pt-2 sm:pt-3" key={t.id}>
            <div className="mb-3 flex flex-col gap-1.5 overflow-hidden rounded-3xl border border-blue-50 bg-linear-to-r from-blue-50/60 p-2 transition-colors select-none hover:bg-blue-50/70 sm:mb-4 sm:gap-2 sm:p-3">
              {/* Linha 1: título + botão restaurar */}
              <div className="mx-2 flex flex-row items-center justify-between gap-2 sm:mx-3 sm:gap-4">
                <div className="flex min-w-0 flex-row items-center gap-2 overflow-hidden">
                  <P
                    title={t.title ?? "Sem título"}
                    className="truncate text-blue-400"
                  />
                </div>

                <div className="flex shrink-0 flex-row items-center">
                  <fetcher.Form method="POST">
                    <input type="hidden" name="idTask" value={t.id} />
                    <input type="hidden" name="intent" value="restore-task" />
                    <Button
                      type="submit"
                      className="flex min-h-11 flex-row items-center gap-1.5 px-3! text-sm! sm:gap-2 sm:px-5! sm:text-base!"
                    >
                      <span aria-hidden="true">
                        <FontAwesomeIcon icon={faTrashArrowUp} size="sm" />
                      </span>
                      <p className="text-white">Restaurar</p>
                    </Button>
                  </fetcher.Form>
                </div>
              </div>

              {/* Linha 2: categoria + data de exclusão */}
              <div className="mx-2 flex flex-row items-center justify-between gap-2 overflow-hidden sm:mx-3">
                <div className="flex min-w-0 flex-1 flex-row items-center justify-start gap-1">
                  <H3
                    title="categoria:"
                    className="xs:block hidden shrink-0 font-medium text-blue-400"
                  />
                  <span className="truncate text-sm font-medium text-blue-500 sm:text-base">
                    {typeof t.category === "object"
                      ? t.category.title
                      : (t.category ?? "Sem categoria")}
                  </span>
                </div>

                <div className="flex flex-1 flex-row items-center justify-end gap-1">
                  <H3
                    title="Deletada em:"
                    className="hidden shrink-0 font-medium text-blue-400 sm:block"
                  />
                  <P
                    title={t.deleteAt ?? "Data indisponível"}
                    className="font-medium text-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex h-40 w-full items-center justify-center sm:h-60">
          <div className="flex flex-col items-center gap-3">
            <span
              aria-hidden="true"
              className="text-2xl text-blue-300 sm:text-3xl"
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </span>
            <H3
              title="Lixeira vazia! Nenhuma tarefa foi deletada."
              className="text-center text-blue-400"
            />
          </div>
        </div>
      )}
    </div>
  );
}
