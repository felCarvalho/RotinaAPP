import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../../component/btn";
import { Overlay } from "../../component/overlay";
import { H3 } from "../../component/subTitle";
import { P } from "../../component/paragrafo";
import { useNavigate } from "react-router";
import { useMatchesTypeds } from "../../utils/FunctionUtils/FunctionUtils";
import {
  type HandleRascunho,
  handle,
} from "../../pages/rascunhos/controllers/handle";
import type { dataRascunhos } from "../../pages/rascunhos/type.server";

export function DetalhesCategoriaTSX() {
  const matches = useMatchesTypeds<HandleRascunho, dataRascunhos>();
  const findRascunho = matches.find((r) => r.handle === handle);
  const paramsRascunho = matches.find((p) => p.params.id);
  const loaderData = findRascunho?.loaderData;
  const categoria =
    loaderData?.data.c.find((c) => c.id === paramsRascunho?.params.id) ?? null;
  const navigate = useNavigate();

  return (
    <Overlay
      initial={{ scale: 0.2, opacity: 0.3 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      <div className="absolute right-2 left-2 flex flex-col justify-center gap-2 rounded-[50px] p-5 shadow-2xl shadow-blue-50">
        <div className="flex-crow flex items-center gap-1 text-blue-400">
          <H3 title="Categoria:" />
          <P
            className="max-w-full truncate text-blue-300"
            title={categoria?.title ?? "Ops, título indisponível"}
          />
        </div>
        <div className="flex flex-row items-center gap-1 text-blue-400">
          <H3 title="Descrição:" />
          <P
            className="max-w-full truncate text-blue-300"
            title={categoria?.description ?? "Ops, descrição indisponível"}
          />
        </div>
        <div className="flex flex-row items-center gap-1 text-blue-400">
          <H3 title="Status:" />
          <P
            className="max-w-full truncate text-blue-300"
            title={categoria?.status ?? "Ops, situação indisponivel"}
          />
        </div>
        <div className="flex flex-row items-center gap-1 text-blue-400">
          <H3 title="ID Categoria:" />
          <P
            className="max-w-full truncate text-blue-300"
            title={categoria?.id ?? "Ops, id de categoria indisponivel"}
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
