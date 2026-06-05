import { Overlay } from "../../component/overlay";
import { Input } from "../../component/input";
import { Button } from "../../component/btn";
import { P } from "../../component/paragrafo";
import { H1 } from "../../component/title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { useFetcher, useNavigate } from "react-router";
import { useMatchesTypeds } from "../../utils/FunctionUtils/FunctionUtils";
import { useState } from "react";
import type { dataCategorias } from "../../pages/infoCategorias/type.server";
import {
  type HandleCategorias,
  handle,
} from "../../pages/infoCategorias/controllers/handle";

export function RenomearCategoriaTSX() {
  const matches = useMatchesTypeds<HandleCategorias, dataCategorias>();
  const matchesInfoCategorias = matches.find(
    (s) => s?.handle?.id === handle.id,
  );
  const loaderInfoCategorias = matchesInfoCategorias?.loaderData;
  const paramsIdInfoCategorias = matchesInfoCategorias?.params?.id;
  const categoria = loaderInfoCategorias?.data.find(
    (c) => c.id === paramsIdInfoCategorias,
  );
  const [renomear, setRenomear] = useState<string | null>(null);
  const fetcher = useFetcher();
  const navigate = useNavigate();

  return (
    <Overlay>
      <div
        onDoubleClick={() => navigate(-1)}
        className="flex w-[90%] min-w-0 max-w-lg flex-col justify-center gap-4 rounded-[50px] bg-white p-6 shadow-2xs shadow-blue-100 max-md:h-full md:relative md:mx-auto md:w-[90%] md:max-w-2xl landscape:overflow-auto"
      >
        <fetcher.Form
          method="PATCH"
          action="/home/categorias"
          id="task-update-form"
          className="flex flex-col gap-5"
        >
          <div className="mb-6 flex flex-row items-center gap-2">
            <Button
              type="button"
              className="flex aspect-square min-h-11 min-w-11 items-center justify-center rounded-full p-0!"
              onClick={() => navigate(-1)}
            >
              <span aria-hidden="true">
                <FontAwesomeIcon icon={faAngleLeft} size="lg" />
              </span>
            </Button>
            <H1 title="Renomear categoria" className="text-2xl text-blue-400" />
          </div>
          <label className="flex flex-col gap-1.5 rounded-3xl border border-solid border-blue-50/85 bg-blue-50/10 p-4 font-semibold text-blue-400">
            <P title="Renomear:" className="text-blue-400" />
            <Input
              type="text"
              defaultValue={renomear ?? categoria?.title}
              onChange={(e) => setRenomear(e.target.value)}
              placeholder="Digite o novo nome da categoria"
              name="titleCategory"
              className="peer"
            />
            <input name="intent" type="hidden" value="update-title-category" />
            <input
              name="idCategory"
              type="hidden"
              value={categoria?.id ?? ""}
            />
          </label>
          <div className="flex w-full flex-row items-center justify-center gap-5">
            <Button
              type="submit"
              className="flex min-h-11 flex-row items-center gap-2"
            >
              <span aria-hidden="true">
                <FontAwesomeIcon icon={faCheck} size="lg" />
              </span>
              <p className="font-semibold text-white">Confirmar</p>
            </Button>
            <Button
              type="reset"
              className="flex min-h-11 flex-row items-center gap-2 bg-gray-500"
              onClick={() => navigate(-1)}
            >
              <span aria-hidden="true">
                <FontAwesomeIcon icon={faX} size="lg" />
              </span>
              <p className="font-semibold text-white">Cancelar</p>
            </Button>
          </div>
        </fetcher.Form>
      </div>
    </Overlay>
  );
}
