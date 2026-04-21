import { NavLink, useFetcher, useLocation } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { H1 } from "../../component/title";
import { Input } from "../../component/input";
import { P } from "../../component/paragrafo";
import { Button } from "../../component/btn";

const url = ["/home/adicionar-categoria"];

export function AdicionarCategoria() {
  const fetcher = useFetcher();
  const { pathname } = useLocation();
  const isAdicionarCategoria = url.includes(pathname);

  return (
    <div className="h-full w-full">
      <div className="w-full">
        <NavLink
          to="/home"
          className="flex w-min flex-row items-center gap-2 rounded-full px-2 hover:bg-blue-50"
        >
          <FontAwesomeIcon icon={faAngleLeft} className="text-blue-400" />
          <H1
            title={
              isAdicionarCategoria
                ? "Adicione uma Categoria"
                : "Criar categoria de rascunho"
            }
            className="w-max text-lg! text-blue-400"
          />
        </NavLink>
      </div>
      <fetcher.Form
        method="POST"
        action={
          isAdicionarCategoria
            ? "/home/adicionar-categoria"
            : "/home/rascunhos"
        }
        className="flex flex-col gap-3 pt-3"
      >
        <div className="flex h-full flex-col gap-2.5 rounded-2xl border border-solid border-blue-50/85 bg-blue-50/10 p-3">
          <label className="flex flex-col gap-1">
            <P title="Categoria:" className="text-blue-400" />
            <input
              type="hidden"
              placeholder="Exemplo: 'Criar uma lading page...'"
              name="intent"
              value={
                isAdicionarCategoria
                  ? "adicionar-categoria"
                  : "create-category-rascunho"
              }
            />
            <Input
              type="text"
              placeholder="Exemplo: 'Criar uma lading page...'"
              name="titleCategory"
            />
          </label>
          <label className="flex flex-col gap-1">
            <P title="Descrição para cateegoria:" className="text-blue-400" />
            <Input
              type="text"
              className=""
              placeholder="Exemplo: 'landing page deve ter...'"
              name="descriptionCategory"
            />
          </label>
        </div>
        <div className="flex w-full flex-row items-center justify-center gap-5">
          <Button
            type="submit"
            className="flex flex-row items-center justify-center gap-1.5"
          >
            <p className="text-base font-medium text-white">Confirmar</p>
            <i>
              <FontAwesomeIcon icon={faCheck} className="text-white" />
            </i>
          </Button>
          <Button
            type="reset"
            className="flex flex-row items-center justify-center gap-1.5 bg-gray-400!"
          >
            <p className="text-base font-medium text-white">cancelar</p>
            <FontAwesomeIcon icon={faX} className="text-white" />
          </Button>
        </div>
        <div>
          <P title="" />
        </div>
      </fetcher.Form>
    </div>
  );
}
