import { faAngleLeft, faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFetcher, useNavigate } from "react-router";
import { Button } from "../../component/btn";
import { Input } from "../../component/input";
import { P } from "../../component/paragrafo";
import { H3 } from "../../component/subTitle";
import type { createRotina } from "./services/create-rotina.server";
import { H1 } from "~/component/title";
import { useEffect, useState, useEffectEvent } from "react";
import type { FieldErrors } from "./type.server";
import { success, error } from "../../utils/FunctionUtils/FunctionUtils";
import type { Data } from "../../utils/typesGlobals/type.server";
import type { dataTasks } from "../Tasks/type.server";

export function CreateRotina() {
  const fetcher = useFetcher<typeof createRotina>();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<FieldErrors>({
    titleTask: [],
    descriptionTask: [],
    titleCategory: [],
    descriptionCategory: [],
  });

  const exceptionError = useEffectEvent(() => {
    const data = fetcher.data as FieldErrors;
    if (data)
      setErrors((s) => ({
        ...s,
        titleTask: data.titleTask ?? undefined,
        descriptionTask: data.descriptionTask ?? undefined,
        titleCategory: data.titleCategory ?? undefined,
        descriptionCategory: data.descriptionCategory ?? undefined,
      }));
  });

  const serverNotifications = useEffectEvent(() => {
    const notification: dataTasks = fetcher.data as dataTasks;
    if (!notification) {
      return;
    }

    const messageSuccess = notification.notification?.find(
      (s) => s.type === "INFO",
    );
    const messageError = notification.notification?.find(
      (s) => s.type === "ERROR",
    );

    if (messageSuccess) {
      return success({ success: messageSuccess.message });
    }

    if (messageError) {
      return error({ error: messageError.message });
    }
  });

  useEffect(() => {
    if (fetcher.data) {
      exceptionError();
      serverNotifications();
    }
  }, [fetcher.data]);

  return (
    <div className="h-full w-full">
      <div className="flex w-full flex-col">
        <div className="sticky top-0 z-40 mb-6 bg-white/80 px-2 py-4 backdrop-blur-md">
          <button
            onClick={() => navigate(-1)}
            className="flex w-min cursor-pointer flex-row items-center gap-2 rounded-full px-2 hover:bg-blue-50"
          >
            <FontAwesomeIcon
              icon={faAngleLeft}
              className="text-blue-400"
              size="lg"
            />
            <H1 title="Crie sua rotina" className="w-max text-blue-400" />
          </button>
        </div>
        <fetcher.Form
          method="POST"
          className="flex flex-col gap-5"
          action="/home/criar-rotina"
        >
          <div className="flex flex-col gap-4 rounded-3xl border border-solid border-blue-50/85 bg-blue-50/10 p-4">
            <div className="flex flex-col gap-2">
              <H3
                title="Rotina:"
                className={`text-base font-bold ${errors.titleTask?.at(-1) ? "text-red-400!" : "text-blue-400"}`}
              />
              <input type="hidden" name="intent" value="create" />
              <Input
                type="text"
                placeholder="Exemplo: 'Criar uma lading page...'"
                name="titleTask"
                className={
                  errors.titleTask?.at(-1)
                    ? "bg-red-50! text-red-400! placeholder-red-400! outline-red-400!"
                    : ""
                }
              />
              {errors.titleTask?.at(-1) && (
                <P
                  title={errors.titleTask.at(-1) ?? ""}
                  className="text-sm font-medium text-red-400"
                />
              )}
            </div>
            <div className="flex flex-col gap-2">
              <H3
                title="Descrição para rotina:"
                className={`text-base font-bold ${errors.descriptionTask?.at(-1) ? "text-red-400" : "text-blue-400"}`}
              />
              <Input
                type="text"
                placeholder="Exemplo: 'landing page deve ter...'"
                name="descriptionTask"
                className={
                  errors.descriptionTask?.at(-1) ? "border-red-400!" : ""
                }
              />
              {errors.descriptionTask?.at(-1) && (
                <P
                  title={errors.descriptionTask.at(-1) ?? ""}
                  className="text-sm font-medium text-red-400"
                />
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-3xl border border-solid border-blue-50/85 bg-blue-50/10 p-4">
            <div className="flex flex-col gap-2">
              <H3
                title="Categoria:"
                className={`text-base font-bold ${errors.titleCategory?.at(-1) ? "text-red-400!" : "text-blue-400"}`}
              />
              <Input
                type="text"
                name="titleCategory"
                placeholder="Crie sua categoria aqui..."
                className={
                  errors.titleCategory?.at(-1)
                    ? "bg-red-50! text-red-400! placeholder-red-400! outline-red-400!"
                    : ""
                }
              />
              {errors.titleCategory?.at(-1) && (
                <P
                  title={errors.titleCategory.at(-1) ?? ""}
                  className="text-sm font-medium text-red-400"
                />
              )}
            </div>
            <div className="flex flex-col gap-2">
              <H3
                title="Descrição para Categoria:"
                className={`text-base font-bold ${errors.descriptionCategory?.at(-1) ? "text-red-400" : "text-blue-400"}`}
              />
              <Input
                type="text"
                placeholder="Exemplo: 'Essa categoria ficará responsável...'"
                name="descriptionCategory"
                className={
                  errors.descriptionCategory?.at(-1) ? "border-red-400!" : ""
                }
              />
              {errors.descriptionCategory?.at(-1) && (
                <P
                  title={errors.descriptionCategory.at(-1) ?? ""}
                  className="text-sm font-medium text-red-400"
                />
              )}
            </div>
          </div>

          <div className="flex flex-row items-center justify-center gap-5">
            <Button
              type="submit"
              className="flex min-h-11 flex-row items-center gap-2"
              status={fetcher.state === "submitting"}
            >
              <p className="text-base font-medium text-white">
                {fetcher.state === "submitting"
                  ? "Confirmando..."
                  : "Confirmar"}
              </p>
              <i>
                <FontAwesomeIcon icon={faCheck} size="lg" />
              </i>
            </Button>
            <Button
              type="reset"
              className="flex min-h-11 flex-row items-center gap-2 bg-gray-400!"
              onClick={() => {
                setErrors((s) => ({
                  ...s,
                  titleTask: undefined,
                  descriptionTask: undefined,
                  titleCategory: undefined,
                  descriptionCategory: undefined,
                }));
              }}
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
