import { useFetcher, useLocation, useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { H1 } from "../../component/title";
import { Input } from "../../component/input";
import { P } from "../../component/paragrafo";
import { Button } from "../../component/btn";

const url = ["/home/adicionar-categoria"];

export function AdicionarCategoria() {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isAdicionarCategoria = url.includes(pathname);

  return (
    <div className="h-full w-full">
      <div className="sticky top-0 z-40 mb-6 w-full bg-white/80 py-4 px-2 backdrop-blur-md">
        <button
          onClick={() => navigate(-1)}
          className="flex w-min cursor-pointer flex-row items-center gap-2 rounded-full px-2 hover:bg-blue-50"
        >
          <FontAwesomeIcon
            icon={faAngleLeft}
            className="text-blue-400"
            size="lg"
          />
          <H1
            title={
              isAdicionarCategoria
                ? "Adicione uma Categoria"
                : "Criar categoria de rascunho"
            }
            className="w-max text-blue-400"
          />
        </button>
      </div>
      <fetcher.Form
        method="POST"
        action={
          isAdicionarCategoria ? "/home/adicionar-categoria" : "/home/rascunhos"
        }
        className="flex flex-col gap-3 pt-3"
      >
        <div className="flex h-full flex-col gap-2.5 rounded-2xl border border-solid border-blue-50/85 bg-blue-50/10 p-3">
          <label className="flex flex-col gap-1">
            <P title="Categoria:" className="text-blue-400" />
            <input
              type="hidden"
              name="intent"
              value={
                isAdicionarCategoria
                  ? "adicionar-categoria"
                  : "create-category-rascunho"
              }
            />
            <input
              type="hidden"
              name="status"
              value={isAdicionarCategoria ? "Ativa" : "Inativa"}
            />
            <Input
              type="text"
              placeholder="Exemplo: 'Criar uma lading page...'"
              name="titleCategory"
            />
          </label>
          <label className="flex flex-col gap-1">
            <P title="Descrição para categoria:" className="text-blue-400" />
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
              <FontAwesomeIcon
                icon={faCheck}
                className="text-white"
                size="lg"
              />
            </i>
          </Button>
          <Button
            type="reset"
            className="flex flex-row items-center justify-center gap-1.5 bg-gray-400!"
            onClick={() => navigate(-1)}
          >
            <p className="text-base font-medium text-white">cancelar</p>
            <FontAwesomeIcon icon={faX} className="text-white" size="lg" />
          </Button>
        </div>
        <div>
          <P title="" />
        </div>
      </fetcher.Form>
    </div>
  );
}
