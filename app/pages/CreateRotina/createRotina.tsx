import {
  faAngleLeft,
  faAngleRight,
  faCheck,
  faFax,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { NavLink, useFetcher, useNavigate } from "react-router";
import { error, success, warning } from "~/utils/FunctionUtils/FunctionUtils";
import { Button } from "../../component/btn";
import { HeaderContent } from "../../component/headerContent";
import { Input } from "../../component/input";
import { P } from "../../component/paragrafo";
import type { createRotina } from "./services/createTasks.server";
import { H1 } from "~/component/title";
import { Overlay } from "../../component/overlay";

export function CreateRotina() {
  const [isPopupOption, setIsPopupOption] = useState(false);
  const [category, setCategory] = useState("");
  const [isInputCategory, setIsInputCategory] = useState(false);
  const fetcher = useFetcher<typeof createRotina>();
  const navigate = useNavigate();

  function setIsCategory({ category }: { category: string }) {
    if (!category) return;
    setIsPopupOption((s) => !s);
    setCategory((s) => (s !== category ? category : s));
  }

  function setInputCategory() {
    setIsInputCategory((s) => !s);
    setCategory("");
    setIsPopupOption(false);
  }

  const validation =
    fetcher.data?.type === "ERROR_VALIDATION" ? fetcher.data?.errors : null;
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
      <div className="flex w-full flex-col gap-3">
        <div className="">
          <NavLink
            to="/home"
            className="flex w-min flex-row items-center gap-2 rounded-full px-2 hover:bg-blue-50"
          >
            <FontAwesomeIcon icon={faAngleLeft} className="text-blue-400" />
            <H1
              title="Crie sua rotina"
              className="w-max text-lg! text-blue-400"
            />
          </NavLink>
        </div>
        <fetcher.Form
          method="POST"
          className="flex flex-col gap-3"
          action="/home/criar-rotina"
        >
          <div className="flex h-full flex-col gap-2.5 rounded-2xl border border-solid border-blue-50/85 bg-blue-50/10 p-3">
            <label className="flex flex-col gap-1">
              <P title="Rotina:" className="text-blue-400" />
              <input
                type="hidden"
                placeholder="Exemplo: 'Criar uma lading page...'"
                name="intent"
                value="criar"
              />
              <Input
                type="text"
                placeholder="Exemplo: 'Criar uma lading page...'"
                name="titleTask"
              />
            </label>
            <label className="flex flex-col gap-1">
              <P title="Descrição para rotina:" className="text-blue-400" />
              <Input
                type="text"
                className=""
                placeholder="Exemplo: 'landing page deve ter...'"
                name="descriptionTask"
              />
            </label>
          </div>
          <div className="flex flex-col gap-2.5 rounded-2xl border border-solid border-blue-50/85 bg-blue-50/10 p-3">
            <div className="">
              <label className="flex flex-col gap-1">
                <P title="Categoria:" className="text-blue-400" />
                <Input
                  type="text"
                  name="titleCategory"
                  placeholder="Crie sua categoria aqui..."
                />
              </label>
            </div>
            <label className="flex flex-col gap-1">
              <P title="Descrição para Categoria:" className="text-blue-400" />
              <Input
                type="text"
                className=""
                placeholder="Exemplo: 'Essa categoria fica´rá responsável...'"
                name="descriptionCategory"
              />
            </label>
          </div>
          <div className="flex flex-row items-center justify-center gap-5">
            <Button type="submit" className="flex flex-row justify-start gap-2">
              <p className="text-base font-medium text-white">confirmar</p>
              <i>
                <FontAwesomeIcon icon={faCheck} />
              </i>
            </Button>
            <Button
              type="reset"
              className="flex flex-row justify-start gap-2 bg-gray-400"
            >
              <p className="text-base font-medium text-white">cancelar</p>
              <i>
                <FontAwesomeIcon icon={faX} />
              </i>
            </Button>
          </div>
        </fetcher.Form>
      </div>
      <div></div>
    </div>
  );
}

{
  /*
    {!isInputCategory && (
      <label className="flex max-w-min flex-col gap-1">
        <P title="Categoria:" className="text-blue-400" />
        <Button
          type="button"
          onClick={() => setIsPopupOption((s) => !s)}
          className="flex flex-row justify-start gap-2"
        >
          <p className="xs:max-2xs:w-20 3xs:max-4xs:w-20 truncate text-base font-medium text-white">
            {category || "Selecionar"}
          </p>
          <i>
            <FontAwesomeIcon icon={faAngleRight} />
          </i>
        </Button>
      </label>
    )} */
  /*
    {isPopupOption && (
      <div className="absolute top-40 rounded-3xl bg-white p-3 shadow-xs shadow-blue-100">
        <div className="flex max-w-min flex-col gap-2">
          <Button
            type="button"
            className="bg-white text-left font-medium shadow-sm shadow-blue-50"
            onClick={() => setIsCategory({ category: "Trabalho" })}
          >
            <P title="Traballho" className="text-blue-400" />
          </Button>
          <Button
            type="button"
            className="bg-white text-left font-medium shadow-sm shadow-blue-50"
            onClick={() => setIsCategory({ category: "Estudos" })}
          >
            <P title="Estudos" className="text-blue-400" />
          </Button>
          <Button
            type="button"
            className="bg-white text-left font-medium shadow-sm shadow-blue-50"
            onClick={() => setIsCategory({ category: "Finanças" })}
          >
            <P title="Finanças" className="text-blue-400" />
          </Button>
          <Button
            type="button"
            className="bg-white text-left font-medium shadow-sm shadow-blue-50"
            onClick={() => setIsCategory({ category: "Lazer" })}
          >
            <P title="Lazer" className="text-blue-400" />
          </Button>
          <Button
            type="button"
            className="bg-white text-left font-medium shadow-sm shadow-blue-50"
            onClick={() => setIsCategory({ category: "Saúde" })}
          >
            <P title="Saúde" className="text-blue-400" />
          </Button>
          <Button
            type="button"
            className="flex flex-row items-center gap-2 text-left font-medium shadow-sm shadow-blue-50"
            onClick={() => setInputCategory()}
          >
            <P
              title="Criar categoria"
              className="whitespace-nowrap text-white"
            />
            <i>
              <FontAwesomeIcon icon={faAngleRight} />
            </i>
          </Button>
        </div>
      </div>
    )} */
}
