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
            <H1 title="Renomear categoria" className="text-lg! text-blue-400" />
          </div>
          <label className="flex flex-col gap-1.5 rounded-2xl border border-solid border-blue-50/85 bg-blue-50/10 p-3 font-semibold text-blue-400">
            <P title="Renomear:" className="text-blue-400" />
            <Input
              type="text"
              defaultValue={renomear ?? categoria?.title}
              onChange={(e) => setRenomear(e.target.value)}
              placeholder="Digite o novo nome da categoria"
              name="titleCategory"
              className="peer"
            />
            <input name="intent" type="hidden" value="update-category" />
            <input
              name="idCategory"
              type="hidden"
              value={categoria?.id ?? ""}
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
  );
}
