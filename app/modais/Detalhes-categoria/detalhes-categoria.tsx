import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../../component/btn";
import { Overlay } from "../../component/overlay";
import { H3 } from "../../component/subTitle";
import { P } from "../../component/paragrafo";
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
      <div className="absolute right-2 left-2 flex flex-col justify-center gap-2 rounded-[50px] p-5 shadow-2xl shadow-blue-50">
        <div className="flex flex-row items-center gap-1 text-blue-400">
          <H3 title="Categoria:" />
          <P
            className="max-w-full truncate text-blue-300"
            title={
              categoriaInfo?.title ??
              categoriaRascunho?.title ??
              "Ops, título indisponível"
            }
          />
        </div>
        <div className="flex flex-row items-center gap-1 text-blue-400">
          <H3 title="Descrição:" />
          <P
            className="max-w-full truncate text-blue-300"
            title={
              categoriaInfo?.description ??
              categoriaRascunho?.description ??
              "Ops, descrição indisponível"
            }
          />
        </div>
        <div className="flex flex-row items-center gap-1 text-blue-400">
          <H3 title="Status:" />
          <P
            className="max-w-full truncate text-blue-300"
            title={
              categoriaInfo?.status ??
              categoriaRascunho?.status ??
              "Ops, situação indisponivel"
            }
          />
        </div>
        <div className="flex flex-row items-center gap-1 text-blue-400">
          <H3 title="ID Categoria:" />
          <P
            className="max-w-full truncate text-blue-300"
            title={
              categoriaInfo?.id ??
              categoriaRascunho?.id ??
              "Ops, id de categoria indisponivel"
            }
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
