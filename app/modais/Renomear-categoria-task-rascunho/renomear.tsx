import { useNavigate, useFetcher } from "react-router";
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
  handle,
} from "../../pages/rascunhos/controllers/handle";
import type { dataRascunhos } from "../../pages/rascunhos/type.server";
import type { dataTasks, Category, Task } from "../../pages/Tasks/type.server";
import { useState } from "react";

export function RenomearCategoriaTSX() {
  const matches = useMatchesTypeds<HandleRascunho, dataRascunhos>();
  const matchesRascunho = matches.find((h) => h.handle === handle);
  const loaderRascunho = matchesRascunho?.loaderData;
  const paramsIdRascunho = matchesRascunho?.params.id;
  const task = loaderRascunho?.data.t.find((t) => t.id === paramsIdRascunho);
  const category = loaderRascunho?.data.c.find(
    (c) => c.id === paramsIdRascunho,
  );
  const [renomear, setRenomear] = useState<string | null>(null);
  const fetcher = useFetcher();
  const navigate = useNavigate();

  return (
    <div>
      <Overlay>
        <div
          onDoubleClick={() => navigate(-1)}
          className="w-full rounded-[50px] bg-white p-5 shadow-2xl shadow-blue-100 max-md:peer-visited:h-full landscape:overflow-auto"
        >
          <fetcher.Form
            method="PATCH"
            action="/home/rascunhos"
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
                title={task?.title ? "Renomear tarefa" : "Renomear categoria"}
                className="text-lg! text-blue-400"
              />
            </div>
            <label className="flex flex-col gap-1.5 rounded-2xl border border-solid border-blue-50/85 bg-blue-50/10 p-3 font-semibold text-blue-400">
              <P title="Renomear:" className="text-blue-400" />
              <Input
                type="text"
                defaultValue={renomear ?? task?.title ?? category?.title ?? ""}
                onChange={(e) => setRenomear(e.target.value)}
                placeholder="Digite o novo nome"
                name={task?.title ? "titleTask" : "titleCategory"}
                className="peer"
              />
              <Input
                name="intent"
                type="hidden"
                value={task?.title ? "update-task" : "update-category"}
              />
              <Input
                name={task?.title ? "idTask" : "idCategory"}
                type="hidden"
                value={task?.id ?? category?.id ?? ""}
              />
              <Input
                name="idUser"
                type="hidden"
                value={task?.user ?? category?.user ?? ""}
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
