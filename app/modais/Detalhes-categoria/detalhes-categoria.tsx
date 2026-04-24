import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../../component/btn";
import { Overlay } from "../../component/overlay";
import { H3 } from "../../component/subTitle";
import { P } from "../../component/paragrafo";
import { H1 } from "../../component/title";
import { useNavigate } from "react-router";
import { useMatchesTypeds } from "../../utils/FunctionUtils/FunctionUtils";
import type { dataRascunhos } from "../../pages/rascunhos/type.server";
import type { dataCategorias } from "../../pages/infoCategorias/type.server";

export function DetalhesCategoriaTSX() {
  const matches = useMatchesTypeds<unknown, unknown>();
  const matchesInfoCategorias = matches.find((i) =>
    i.pathname.includes("home/categorias"),
  );
  const matchesRascunhos = matches.find((s) =>
    s.pathname.includes("home/rascunhos"),
  );
  const loaderInfoCategorias =
    matchesInfoCategorias?.loaderData as dataCategorias;
  const loaderRascunhos = matchesRascunhos?.loaderData as dataRascunhos;
  const paramsIdRascunho = matchesRascunhos?.params.id;
  const paramsIdInfoCategoria = matchesInfoCategorias?.params.id;
  const categoriaInfo = paramsIdInfoCategoria
    ? loaderInfoCategorias.data.find((ci) => ci.id === paramsIdInfoCategoria)
    : null;

  const categoriaRascunho = paramsIdRascunho
    ? loaderRascunhos.data.c.find((cs) => cs.id === paramsIdRascunho)
    : null;

  const navigate = useNavigate();

  return (
    <Overlay
      initial={{ scale: 0.2, opacity: 0.3 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      <div className="w-[95%] min-w-[350px] md:min-w-[1000px] md:max-w-7xl flex flex-col justify-center gap-4 rounded-[50px] bg-white p-6 shadow-2xl shadow-blue-100 md:relative md:mx-auto">
        <div className="mb-4 flex flex-row items-center justify-start">
          <H1 title="Detalhes da Categoria" className="text-2xl text-blue-400" />
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex flex-row items-center gap-2 text-blue-400 whitespace-nowrap overflow-hidden">
            <H3 title="Categoria:" className="text-base font-bold shrink-0" />
            <P
              className="truncate text-blue-300"
              title={
                categoriaInfo?.title ??
                categoriaRascunho?.title ??
                "Ops, título indisponível"
              }
            />
          </div>
          <div className="flex flex-row items-center gap-2 text-blue-400 whitespace-nowrap overflow-hidden">
            <H3 title="Descrição:" className="text-base font-bold shrink-0" />
            <P
              className="truncate text-blue-300"
              title={
                categoriaInfo?.description ??
                categoriaRascunho?.description ??
                "Ops, descrição indisponível"
              }
            />
          </div>
          <div className="flex flex-row items-center gap-2 text-blue-400 whitespace-nowrap overflow-hidden">
            <H3 title="Status:" className="text-base font-bold shrink-0" />
            <P
              className="truncate text-blue-300"
              title={
                categoriaInfo?.status ??
                categoriaRascunho?.status ??
                "Ops, situação indisponivel"
              }
            />
          </div>
          <div className="flex flex-row items-center gap-2 text-blue-400 whitespace-nowrap overflow-hidden">
            <H3 title="ID Categoria:" className="text-base font-bold shrink-0" />
            <P
              className="truncate text-blue-300"
              title={
                categoriaInfo?.id ??
                categoriaRascunho?.id ??
                "Ops, id de categoria indisponivel"
              }
            />
          </div>
        </div>

        <div className="flex w-full items-center justify-center pt-2">
          <Button
            type="reset"
            ariaLabel="Fechar"
            className="aspect-square flex items-center justify-center min-h-11 min-w-11 p-0! rounded-full"
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
