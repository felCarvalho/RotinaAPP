import { useNavigate, useFetcher, useParams } from "react-router";
import { Overlay } from "../../component/overlay";
import { Button } from "../../component/btn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { H1 } from "../../component/title";
import { Input } from "../../component/input";
import { P } from "../../component/paragrafo";
import { useMatchesTypeds } from "../../utils/FunctionUtils/FunctionUtils";
import {
  type HandleRascunho,
  handle as handleRascunho,
} from "../../pages/rascunhos/controllers/handle";
import {
  handle as handleTasks,
  type HandleTasks,
} from "../../pages/Tasks/controllers/handle";
import type { dataRascunhos } from "../../pages/rascunhos/type.server";
import type { dataTasks, Category, Task } from "../../pages/Tasks/type.server";
import { useMemo, useState } from "react";

export function RenomearCategoriaTSX() {
  const { id } = useParams();
  const matches = useMatchesTypeds<HandleRascunho | HandleTasks, dataRascunhos | dataTasks>();
  
  const rascunho = matches.find((r) => (r.handle as HandleRascunho) === handleRascunho);
  const tasksMatch = matches.find((r) => (r.handle as HandleTasks)?.id === handleTasks.id);

  const data = useMemo(() => {
    // Try to find in rascunhos first
    if (rascunho && "data" in rascunho.loaderData && "c" in rascunho.loaderData.data) {
      const rData = rascunho.loaderData as dataRascunhos;
      const c = rData.data.c.find((c) => c.id === id);
      const t = rData.data.t.find((t) => t.id === id);
      if (c || t) return { categoria: c, task: t, user: c?.user ?? t?.user, action: "/home/rascunhos" };
    }

    // Then try in tasks
    if (tasksMatch && "data" in tasksMatch.loaderData && Array.isArray(tasksMatch.loaderData.data)) {
      const tData = tasksMatch.loaderData as dataTasks;
      const t = tData.data.find((t: Task) => t.id === id);
      
      // For categories in tasksMatch, we might need to find it inside tasks
      let c: Category | undefined;
      if (t && typeof t.category === "object") {
        c = t.category;
      } else {
        const tWithCat = tData.data.find((task: Task) => 
          typeof task.category === "object" && task.category.id === id
        );
        if (tWithCat && typeof tWithCat.category === "object") {
          c = tWithCat.category;
        }
      }

      if (c || t) return { categoria: c, task: t, user: c?.user ?? t?.user, action: "." };
    }

    return { categoria: null, task: null, user: null, action: "." };
  }, [rascunho, tasksMatch, id]);

  const { categoria, task, user, action } = data;
  const [renomear, setRenomear] = useState<string | null>(null);
  const navigate = useNavigate();
  const fetcher = useFetcher();

  return (
    <div>
      <Overlay>
        <div
          onDoubleClick={() => navigate(-1)}
          className="w-full rounded-[50px] bg-white p-5 shadow-2xl shadow-blue-100 max-md:peer-visited:h-full landscape:overflow-auto"
        >
          <fetcher.Form
            method="PATCH"
            action={action}
            className="flex flex-col gap-5"
          >
            <div className="flex flex-row items-center gap-2">
              <Button
                type="button"
                className="min-h-11! min-w-11!"
                onClick={() => navigate(-1)}
              >
                <i>
                  <FontAwesomeIcon icon={faAngleLeft} />
                </i>
              </Button>
              <H1
                title={
                  categoria?.title ? "Renomear categoria" : "Renomear tarefa"
                }
                className="text-lg! text-blue-400"
              />
            </div>
            <label className="flex flex-col gap-1.5 rounded-2xl border border-solid border-blue-50/85 bg-blue-50/10 p-3 font-semibold text-blue-400">
              <P title="Renomear:" className="text-blue-400" />
              <Input
                type="text"
                defaultValue={categoria?.title ?? task?.title ?? ""}
                onChange={(e) => setRenomear(e.target.value)}
                placeholder="Digite o novo nome"
                name={categoria?.title ? "titleCategory" : "titleTask"}
                className="peer"
              />
              <Input
                name="intent"
                type="hidden"
                value={categoria?.title ? "update-category" : "update-task"}
              />
              <Input
                name={categoria?.title ? "idCategory" : "idTask"}
                type="hidden"
                value={categoria?.id ?? task?.id}
              />
              <Input
                name="idUser"
                type="hidden"
                value={user}
              />
            </label>
            <div className="flex w-full flex-row items-center justify-center gap-5">
              <label>
                <Button
                  type="submit"
                  className="items-cneter flex flex-row gap-1"
                >
                  <i>
                    <FontAwesomeIcon icon={faCheck} />
                  </i>
                  <p className="font-semibold">Confirmar</p>
                </Button>
              </label>
              <label>
                <Button
                  type="reset"
                  className="items-cneter flex flex-row gap-1 bg-gray-400"
                  onClick={() => navigate(-1)}
                >
                  <i>
                    <FontAwesomeIcon icon={faX} />
                  </i>
                  <p className="font-semibold text-white">Cancelar</p>
                </Button>
              </label>
            </div>
          </fetcher.Form>
        </div>
      </Overlay>
    </div>
  );
}

