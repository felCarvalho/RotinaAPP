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
          className="w-[90%] min-w-[320px] md:min-w-[750px] md:max-w-5xl flex flex-col justify-center gap-4 rounded-[50px] bg-white p-6 shadow-2xl shadow-blue-100 max-md:peer-visited:h-full landscape:overflow-auto md:relative md:mx-auto"
        >
          <fetcher.Form
            method="PATCH"
            action="/home/rascunhos"
            className="flex flex-col gap-5"
          >
            <div className="mb-6 flex flex-row items-center gap-2">
              <Button
                type="button"
                className="aspect-square flex items-center justify-center min-h-11 min-w-11 p-0! rounded-full"
                onClick={() => navigate(-1)}
              >
                <i>
                  <FontAwesomeIcon icon={faAngleLeft} size="lg" />
                </i>
              </Button>
              <H1
                title={task?.title ? "Renomear tarefa" : "Renomear categoria"}
                className="text-2xl text-blue-400"
              />
            </div>
            <label className="flex flex-col gap-1.5 rounded-3xl border border-solid border-blue-50/85 bg-blue-50/10 p-4 font-semibold text-blue-400">
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
                  className="flex min-h-11 flex-row items-center gap-2"
                >
                  <i>
                    <FontAwesomeIcon icon={faCheck} size="lg" />
                  </i>
                  <p className="font-semibold text-white">Confirmar</p>
                </Button>
              </label>
              <label>
                <Button
                  type="reset"
                  className="flex min-h-11 flex-row items-center gap-2 bg-gray-400"
                  onClick={() => navigate(-1)}
                >
                  <i>
                    <FontAwesomeIcon icon={faX} size="lg" />
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
