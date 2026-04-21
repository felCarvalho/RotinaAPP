import { Overlay } from "../../component/overlay";
import { Input } from "../../component/input";
import { Button } from "../../component/btn";
import { P } from "../../component/paragrafo";
import { H1 } from "../../component/title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { useFetcher, useNavigate } from "react-router";
import { useMatchesTypeds } from "../../utils/FunctionUtils/FunctionUtils";
import type { dataTasks } from "../../pages/Tasks/type.server";
import { useState } from "react";

export function RenomearTarefaTSX() {
  //carregando dados de rotas
  const matches = useMatchesTypeds<unknown, unknown>();

  //buscando as rotas especificas
  const loaderHome = matches.find((h) => h.pathname.includes("/home"));

  //selecionando os params
  const paramsHome = loaderHome?.params.id;

  //seleciona os data
  const dataHome = loaderHome?.loaderData as dataTasks;

  //buscando as task pelo id da url
  const task = dataHome?.data.find((t) => t.id === paramsHome);

  //state local para renomear a task
  const [renomear, setRenomear] = useState<string | null>(null);

  //para navegação
  const navigate = useNavigate();
  //form
  const fetcher = useFetcher();

  return (
    <>
      <Overlay>
        <div
          onDoubleClick={() => navigate(-1)}
          className="w-full rounded-[50px] bg-white p-5 shadow-2xl shadow-blue-100 max-md:peer-visited:h-full landscape:overflow-auto"
        >
          <fetcher.Form
            method="PATCH"
            action="/home"
            id="task-update-form"
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
                title={"Renomear rotina"}
                className="text-lg! text-blue-400"
              />
            </div>
            <label className="flex flex-col gap-1.5 rounded-2xl border border-solid border-blue-50/85 bg-blue-50/10 p-3 font-semibold text-blue-400">
              <P title="Renomear:" className="text-blue-400" />
              <Input
                type="text"
                defaultValue={task?.title ?? ""}
                onChange={(e) => setRenomear(e.target.value)}
                placeholder="Digite o novo nome da rotina"
                name="titleTask"
                form="task-update-form"
                className="peer"
              />
              <input name="intent" type="hidden" value="update-task" />
              <input name="idTask" type="hidden" value={paramsHome ?? ""} />
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
    </>
  );
}
