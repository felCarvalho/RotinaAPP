import {
  faAngleLeft,
  faCheck,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useFetcher, useNavigate } from "react-router";
import { error, success, warning } from "~/utils/FunctionUtils/FunctionUtils";
import { Button } from "../../component/btn";
import { Input } from "../../component/input";
import { P } from "../../component/paragrafo";
import { H3 } from "../../component/subTitle";
import type { createRotina } from "./services/create-rotina.server";
import { H1 } from "~/component/title";

export function CreateRotina() {
  const fetcher = useFetcher<typeof createRotina>();
  const navigate = useNavigate();

  const errorServer =
    fetcher.data?.type === "ERROR_SERVER" ? fetcher.data?.data : null;
  const errorInternal =
    fetcher.data?.type === "ERROR_INTERNAL" ? fetcher.data?.data : null;
  const successMessage =
    fetcher.data?.type === "SUCCESS" ? fetcher.data?.data : null;

  useEffect(() => {
    if (successMessage) {
      success({ success: successMessage.message });
      return;
    }

    if (errorServer) {
      error({ error: errorServer.message });
      return;
    }

    if (errorInternal) {
      warning({ warning: errorInternal.message });
    }
  }, [errorServer, errorInternal, successMessage]);

  return (
    <div className="h-full w-full">
      <div className="flex w-full flex-col">
        <div className="sticky top-0 z-40 mb-6 bg-white/80 py-4 px-2 backdrop-blur-md">
          <button
            onClick={() => navigate(-1)}
            className="flex w-min cursor-pointer flex-row items-center gap-2 rounded-full px-2 hover:bg-blue-50"
          >
            <FontAwesomeIcon icon={faAngleLeft} className="text-blue-400" size="lg" />
            <H1
              title="Crie sua rotina"
              className="w-max text-blue-400"
            />
          </button>
        </div>
        <fetcher.Form
          method="POST"
          className="flex flex-col gap-5"
          action="/home/criar-rotina"
        >
          <div className="flex flex-col gap-4 rounded-3xl border border-solid border-blue-50/85 bg-blue-50/10 p-4">
            <div className="flex flex-col gap-2">
              <H3 title="Rotina:" className="text-base font-bold text-blue-400" />
              <input type="hidden" name="intent" value="create" />
              <Input
                type="text"
                placeholder="Exemplo: 'Criar uma lading page...'"
                name="titleTask"
              />
            </div>
            <div className="flex flex-col gap-2">
              <H3 title="Descrição para rotina:" className="text-base font-bold text-blue-400" />
              <Input
                type="text"
                placeholder="Exemplo: 'landing page deve ter...'"
                name="descriptionTask"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-3xl border border-solid border-blue-50/85 bg-blue-50/10 p-4">
            <div className="flex flex-col gap-2">
              <H3 title="Categoria:" className="text-base font-bold text-blue-400" />
              <Input
                type="text"
                name="titleCategory"
                placeholder="Crie sua categoria aqui..."
              />
            </div>
            <div className="flex flex-col gap-2">
              <H3 title="Descrição para Categoria:" className="text-base font-bold text-blue-400" />
              <Input
                type="text"
                placeholder="Exemplo: 'Essa categoria ficará responsável...'"
                name="descriptionCategory"
              />
            </div>
          </div>

          <div className="flex flex-row items-center justify-center gap-5">
            <Button type="submit" className="flex min-h-11 flex-row items-center gap-2">
              <p className="text-base font-medium text-white">Confirmar</p>
              <i>
                <FontAwesomeIcon icon={faCheck} size="lg" />
              </i>
            </Button>
            <Button
              type="reset"
              className="flex min-h-11 flex-row items-center gap-2 bg-gray-400!"
              onClick={() => navigate(-1)}
            >
              <p className="text-base font-medium text-white">Cancelar</p>
              <i>
                <FontAwesomeIcon icon={faX} size="lg" />
              </i>
            </Button>
          </div>
        </fetcher.Form>
      </div>
    </div>
  );
}
