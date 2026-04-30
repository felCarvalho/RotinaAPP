import {
  faAngleLeft,
  faCheck,
  faList,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { H1 } from "../../component/title";
import {
  NavLink,
  useSearchParams,
  useNavigate,
  useLocation,
  useFetcher,
} from "react-router";
import { Input } from "../../component/input";
import { P } from "../../component/paragrafo";
import { Button } from "../../component/btn";
import { Overlay } from "../../component/overlay";
import { useMatchesTypeds } from "~/utils/FunctionUtils/FunctionUtils";
import { type HandleTasks, handle } from "../Tasks/controllers/handle";
import type { dataTasks } from "../Tasks/type.server";
import { H3 } from "~/component/subTitle";
import { useState } from "react";

const url = ["/home/adicionar-tarefa"];

export function AdicionarTarefa() {
  const [categorias, setCategorias] = useState({
    id: "",
    title: "",
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const isOpenModal = searchParams.get("categorias");
  const navigate = useNavigate();
  const matches = useMatchesTypeds<HandleTasks, dataTasks>();
  const loaderHome = matches.find((h) => h.handle === handle)?.loaderData;
  const { pathname } = useLocation();
  const fetcher = useFetcher();
  const isAdicionarTarefa = url.includes(pathname);

  return (
    <div className="h-full w-full">
      <div className="sticky top-0 z-40 mb-6 w-full bg-white/80 py-4 px-2 backdrop-blur-md">
        <button
          onClick={() => navigate(-1)}
          className="flex w-min cursor-pointer flex-row items-center gap-2 rounded-full px-2 hover:bg-blue-50"
        >
          <FontAwesomeIcon icon={faAngleLeft} className="text-blue-400" size="lg" />
          <H1
            title={
              isAdicionarTarefa
                ? "Adicione uma tarefa"
                : "Criar tarefa de rascunho"
            }
            className="w-max text-blue-400"
          />
        </button>
      </div>
      <fetcher.Form
        method="POST"
        id="form-criar-tarefa"
        className="flex flex-col gap-3 pt-3"
        action={
          isAdicionarTarefa ? "/home/adicionar-tarefa" : "/home/rascunhos"
        }
      >
        <div className="relative flex h-full flex-col gap-3 rounded-2xl border border-solid border-blue-50/85 bg-blue-50/10 p-3">
          <label className="flex flex-col gap-1">
            <P title="Rotina:" className="text-blue-400" />
            <Input
              type="hidden"
              readOnly
              name="intent"
              value={
                isAdicionarTarefa ? "adicionar-tarefa" : "create-task-rascunho"
              }
            />
            {isAdicionarTarefa && (
              <Input
                type="hidden"
                readOnly
                name="idCategory"
                value={categorias.id ? categorias.id : ""}
              />
            )}
            <Input
              type="text"
              placeholder="Exemplo: 'Criar uma lading page...'"
              name="titleTask"
            />
          </label>
          {isAdicionarTarefa && (
            <label className="flex flex-col gap-1">
              <P title="Categoria:" className="text-blue-400" />
              <Button
                type="button"
                className="flex max-w-min flex-row items-center gap-1.5"
                onClick={() =>
                  setSearchParams({ categorias: "lista-categorias" })
                }
              >
                <i>
                  <FontAwesomeIcon icon={faList} size="lg" />
                </i>
                <p className="min-w-max font-medium">
                  {categorias?.title
                    ? categorias.title
                    : "Selecione uma categoria"}
                </p>
              </Button>
            </label>
          )}
          {isOpenModal && isAdicionarTarefa && (
            <Overlay className="p-5 lg:px-80 lg:py-20">
              <div className="relative h-full w-full rounded-[50px] bg-white shadow-2xs shadow-blue-50">
                <div className="absolute top-0 right-0 left-0 z-10 flex flex-row items-center gap-2 rounded-t-[50px] bg-white/15 p-5 backdrop-blur-3xl">
                  <Button
                    type="button"
                    className="aspect-square flex items-center justify-center min-h-11 min-w-11 p-0!"
                    onClick={() => navigate(-1)}
                  >
                    <i>
                      <FontAwesomeIcon icon={faAngleLeft} size="lg" />
                    </i>
                  </Button>
                  <H1
                    title="Selecionar uma categoria"
                    className="text-2xl text-blue-400"
                  />
                </div>
                <div className="scrollbar-hide absolute top-0 right-0 bottom-5 left-0 z-0 overflow-auto rounded-[50px]">
                  <div className="mx-5 pt-23">
                    {loaderHome?.data.map((c) =>
                      typeof c.category === "object" ? (
                        <div
                          className="mb-2 w-full rounded-2xl border border-blue-50 p-3 shadow-2xs shadow-blue-50 transition-all hover:border-blue-200 hover:bg-blue-50"
                          onClick={() => {
                            setCategorias((s) => ({
                              ...s,
                              id:
                                typeof c.category === "object"
                                  ? c.category.id
                                  : "",
                              title:
                                typeof c.category === "object"
                                  ? c.category.title
                                  : "",
                            }));
                            setSearchParams();
                          }}
                        >
                          <H3
                            className="text-blue-400"
                            key={c.id}
                            title={c.category.title}
                          />
                        </div>
                      ) : null,
                    )}
                  </div>
                </div>
              </div>
            </Overlay>
          )}
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
        <div className="flex w-full flex-row items-center justify-center gap-5">
          <Button
            type="submit"
            className="flex flex-row items-center justify-center gap-1.5"
          >
            <p className="text-base font-medium text-white">Confirmar</p>
            <i>
              <FontAwesomeIcon icon={faCheck} className="text-white" size="lg" />
            </i>
          </Button>
          <Button
            type="reset"
            className="flex flex-row items-center justify-center gap-1.5 bg-gray-400!"
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
