import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../../component/btn";
import { Overlay } from "../../component/overlay";
import { P } from "../../component/paragrafo";
import { H3 } from "../../component/subTitle";
import { H1 } from "../../component/title";
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
      <div className="w-[95%] min-w-[350px] md:min-w-[1000px] md:max-w-7xl flex flex-col justify-center gap-4 rounded-[50px] bg-white p-6 shadow-2xl shadow-blue-100 md:relative md:mx-auto">
        <div className="mb-4 flex flex-row items-center justify-start">
          <H1 title="Detalhes da Rotina" className="text-blue-400" />
        </div>
        
        <div className="flex flex-col gap-3">
          <div className="flex flex-row items-center gap-2 text-blue-400 whitespace-nowrap overflow-hidden">
            <H3 title="Rotina:" className="text-base font-bold shrink-0" />
            <P
              className="truncate text-blue-300"
              title={
                dataHome?.title ??
                dataRascunhos?.title ??
                "Ops, título indisponível"
              }
            />
          </div>
          <div className="flex flex-row items-center gap-2 text-blue-400 whitespace-nowrap overflow-hidden">
            <H3 title="Descrição:" className="text-base font-bold shrink-0" />
            <P
              className="truncate text-blue-300"
              title={
                dataHome?.description ??
                dataRascunhos?.description ??
                "Ops, descrição indisponível"
              }
            />
          </div>
          <div className="flex flex-row items-center gap-2 text-blue-400 whitespace-nowrap overflow-hidden">
            <H3 title="Categoria:" className="text-base font-bold shrink-0" />
            <P
              className="truncate text-blue-300"
              title={
                typeof dataHome?.category === "object"
                  ? dataHome?.category?.title
                  : typeof dataRascunhos?.category === "object"
                    ? dataRascunhos?.category?.title
                    : "Sem categoria"
              }
            />
          </div>
          <div className="flex flex-row items-center gap-2 text-blue-400 whitespace-nowrap overflow-hidden">
            <H3 title="Status:" className="text-base font-bold shrink-0" />
            <P
              className="truncate text-blue-300"
              title={
                dataHome?.completed ??
                dataRascunhos?.completed ??
                "Ops, situação indisponivel"
              }
            />
          </div>
          <div className="flex flex-row items-center gap-2 text-blue-400 whitespace-nowrap overflow-hidden">
            <H3 title="ID Rotina:" className="text-base font-bold shrink-0" />
            <P
              className="truncate text-blue-300"
              title={dataHome?.id ?? dataRascunhos?.id ?? "Ops, id indisponivel"}
            />
          </div>
          <div className="flex flex-row items-center gap-2 text-blue-400 whitespace-nowrap overflow-hidden">
            <H3 title="ID Categoria:" className="text-base font-bold shrink-0" />
            <P
              className="truncate text-blue-300"
              title={
                typeof dataHome?.category === "object"
                  ? dataHome?.category?.id
                  : typeof dataRascunhos?.category === "object"
                    ? dataRascunhos?.category?.id
                    : "Ops, id de categoria indisponivel"
              }
            />
          </div>
        </div>

        <div className="flex w-full items-center justify-center pt-2">
          <Button
            type="reset"
            ariaLabel="Fechar"
            className="aspect-square flex items-center justify-center min-h-11 min-w-11 p-0!"
            onClick={() => navigate(-1)}
          >
            <i>
              <FontAwesomeIcon icon={faX} size="lg" />
            </i>
          </Button>
        </div>
      </div>
    </Overlay>
  );
}
