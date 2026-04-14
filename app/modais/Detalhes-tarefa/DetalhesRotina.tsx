import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../../component/btn";
import { Overlay } from "../../component/overlay";
import { P } from "../../component/paragrafo";
import { H3 } from "../../component/subTitle";
import { useMatchesTypeds } from "../../utils/FunctionUtils/FunctionUtils";
import type { dataTasks } from "../../pages/Tasks/type.server";
import type { dataRascunhos } from "../../pages/rascunhos/type.server";
import { useNavigate } from "react-router";

export function DetalhesRotina() {
  const matches = useMatchesTypeds<unknown, unknown>();
  const findHome = matches.find((h) => h.pathname.includes("/home"));
  const findRascunhos = matches.find((r) => r.pathname.includes("/rascunhos"));
  const paramsRascunhos = findRascunhos?.params.id;
  const paramsHome = findHome?.params.id;
  const loaderHome = findHome?.loaderData as dataTasks;
  const loaderRascunhos = findRascunhos?.loaderData as dataRascunhos;
  const dataHome = paramsHome
    ? loaderHome.data.find((t) => t.id === paramsHome)
    : null;
  const dataRascunhos = paramsRascunhos
    ? loaderRascunhos.data.t.find((t) => t.id === paramsRascunhos)
    : null;
  const navigate = useNavigate();

  return (
    <Overlay
      initial={{ scale: 0.2, opacity: 0.3 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      <div className="absolute right-2 left-2 flex flex-col justify-center gap-2 rounded-[50px] p-5 shadow-2xl shadow-blue-50">
        <div className="flex-crow flex items-center gap-1 text-blue-400">
          <H3 title="Rotina:" />
          <P
            className="max-w-full truncate text-blue-300"
            title={
              dataHome?.title ??
              dataRascunhos?.title ??
              "Ops, título indisponível"
            }
          />
        </div>
        <div className="flex flex-row items-center gap-1 text-blue-400">
          <H3 title="Descrição:" />
          <P
            className="max-w-full truncate text-blue-300"
            title={
              dataHome?.description ??
              dataRascunhos?.description ??
              "Ops, descrição indisponível"
            }
          />
        </div>
        <div className="flex flex-row items-center gap-1 text-blue-400">
          <H3 title="Categoria:" />
          <P className="max-w-full truncate text-blue-300" title={""} />
        </div>
        <div className="flex flex-row items-center gap-1 text-blue-400">
          <H3 title="Status:" />
          <P
            className="max-w-full truncate text-blue-300"
            title={
              dataHome?.completed ??
              dataRascunhos?.completed ??
              "Ops, situação indisponivel"
            }
          />
        </div>
        <div className="flex flex-row items-center gap-1 text-blue-400">
          <H3 title="ID Rotina:" />
          <P
            className="max-w-full truncate text-blue-300"
            title={dataHome?.id ?? dataRascunhos?.id ?? "Ops, id indisponivel"}
          />
        </div>
        <div className="flex flex-row items-center gap-1 text-blue-400">
          <H3 title="ID Categoria:" />
          <P
            className="max-w-full truncate text-blue-300"
            title={"Ops, id de categoria indisponivel"}
          />
        </div>
        <div className="flex w-full items-center justify-center">
          <Button
            type="reset"
            ariaLabel="Fechar"
            className="min-h-10 min-w-10 p-0!"
            onClick={() => navigate(-1)}
          >
            <i>
              <FontAwesomeIcon icon={faX} />
            </i>
          </Button>
        </div>
      </div>
    </Overlay>
  );
}
