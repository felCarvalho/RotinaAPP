import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faPen,
  faRightLeft,
  faTrash,
  faPlus,
  faFile,
  faFolder,
} from "@fortawesome/free-solid-svg-icons";
import { useLoaderData, useNavigate, useFetcher } from "react-router";
import { H1 } from "../../component/title";
import { H3 } from "../../component/subTitle";
import type { loader } from "./controllers/loader.server";
import type { dataRascunhos } from "./type.server";
import type { Task, Category } from "../Tasks/type.server";
import { P } from "../../component/paragrafo";
import { Button } from "../../component/btn";
import { useState } from "react";
import { FloatingPortal } from "@floating-ui/react";
import { usePosition } from "../../hooks/UseFloatingUI";

export function Rascunhos() {
  const rascunhos: dataRascunhos = useLoaderData<typeof loader>();
  const dataCategory = rascunhos.data.c;
  const dataTasks = rascunhos.data.t;
  const [isLayout, setLayout] = useState(false);
  const [activeTab, setActiveTab] = useState<"tasks" | "categories">("tasks");
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();
  const fetcher = useFetcher();
  const [isOpen, setIsOpen] = useState(false);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const currentScrollY = e.currentTarget.scrollTop;
    if (currentScrollY > lastScrollY && currentScrollY > 10) {
      setIsVisible(false); // Rolando para baixo
    } else {
      setIsVisible(true); // Rolando para cima
    }
    setLastScrollY(currentScrollY);
  };

  const { refs, floatingStyles } = usePosition({
    offPlacement: "top",
    offSet: 15,
    offShift: { crossAxis: false },
  });

  return (
    <div className="flex h-full flex-col">
      <div className="sticky top-0 z-40 bg-white/80 px-2 py-4 backdrop-blur-md">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex w-min cursor-pointer flex-row items-center gap-2 rounded-full px-2 hover:bg-blue-50"
            >
              <FontAwesomeIcon
                icon={faAngleLeft}
                className="text-blue-400"
                size="lg"
              />
              <H1 title="Rascunhos" className="w-max text-blue-400" />
            </button>
          </div>

          {/* Mobile Tabs */}
          <div className="flex w-full justify-center lg:hidden">
            <div className="flex w-full max-w-xs rounded-xl bg-blue-50 p-1">
              <button
                onClick={() => setActiveTab("tasks")}
                className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all ${
                  activeTab === "tasks"
                    ? "bg-white text-blue-500 shadow-sm"
                    : "text-blue-400 hover:text-blue-500"
                }`}
              >
                Tarefas
              </button>
              <button
                onClick={() => setActiveTab("categories")}
                className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all ${
                  activeTab === "categories"
                    ? "bg-white text-blue-500 shadow-sm"
                    : "text-blue-400 hover:text-blue-500"
                }`}
              >
                Categorias
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`flex flex-1 gap-5 overflow-hidden ${
          isLayout ? "lg:flex-row-reverse" : "lg:flex-row"
        } flex-col lg:flex-row`}
      >
        {/* Coluna de Tarefas */}
        <div
          onScroll={handleScroll}
          className={`scrollbar-hide h-full w-full overflow-y-auto px-2 ${
            activeTab === "tasks" ? "flex" : "hidden lg:flex"
          } flex-col`}
        >
          <div className="mt-6 mb-4 hidden lg:block">
            <H3 title="Tarefas" className="w-max text-2xl text-blue-400" />
          </div>
          <div className="flex flex-col gap-3 py-4 lg:py-0">
            {dataTasks.length ? (
              dataTasks.map((t: Task) => (
                <div
                  key={t.id}
                  className="flex flex-col justify-center gap-2 rounded-2xl border border-slate-100 bg-linear-to-r from-blue-50/60 p-4 shadow-xs"
                >
                  <div className="flex flex-row justify-between gap-4">
                    <div className="flex flex-col justify-center gap-1.5 overflow-hidden">
                      <div className="flex flex-row items-baseline gap-1.5">
                        <H3 title="Título:" className="text-lg text-blue-400" />
                        <P
                          title={t.title ?? "Sem título"}
                          className="truncate font-medium text-blue-500"
                        />
                      </div>
                      <div className="flex flex-row items-baseline gap-1.5">
                        <H3
                          title="Descrição:"
                          className="text-lg text-blue-400"
                        />
                        <P
                          title={t.description ?? "Sem descrição"}
                          className="truncate text-blue-300"
                        />
                      </div>
                    </div>
                    <div className="flex flex-row items-start gap-2">
                      <Button
                        type="button"
                        className="flex h-10 w-10 items-center justify-center p-0!"
                        onClick={() => navigate(`renomear/${t.id}`)}
                      >
                        <FontAwesomeIcon icon={faPen} size="sm" />
                      </Button>
                      <Button
                        type="button"
                        className="flex h-10 w-10 items-center justify-center p-0!"
                        onClick={() =>
                          fetcher.submit(
                            { idTask: t.id, intent: "delete-task" },
                            { method: "DELETE", action: "/home/rascunhos" },
                          )
                        }
                      >
                        <FontAwesomeIcon icon={faTrash} size="sm" />
                      </Button>
                    </div>
                  </div>
                  <Button
                    type="button"
                    className="mt-2 w-full py-2.5 text-sm font-semibold"
                    onClick={() => navigate(`detalhes-tarefa/${t.id}`)}
                  >
                    Ver detalhes
                  </Button>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center py-20">
                <P
                  title="Nenhuma tarefa encontrada"
                  className="text-blue-300"
                />
              </div>
            )}
          </div>
        </div>

        {/* Barra Central de Ações (Desktop Only) */}
        <div className="hidden h-full flex-col items-center justify-between py-10 lg:flex">
          <div className="flex flex-1 items-center">
            <Button
              type="button"
              className="flex aspect-square min-h-11 min-w-11 items-center justify-center p-0!"
              onClick={() => setLayout((s) => !s)}
            >
              <FontAwesomeIcon icon={faRightLeft} size="lg" />
            </Button>
          </div>
        </div>

        {/* Coluna de Categorias */}
        <div
          onScroll={handleScroll}
          className={`scrollbar-hide h-full w-full overflow-y-auto px-2 ${
            activeTab === "categories" ? "flex" : "hidden lg:flex"
          } flex-col`}
        >
          <div className="mt-6 mb-4 hidden lg:block">
            <H3 title="Categorias" className="w-max text-2xl text-blue-400" />
          </div>
          <div className="flex flex-col gap-3 py-4 lg:py-0">
            {dataCategory.length ? (
              dataCategory.map((c: Category) => (
                <div
                  key={c.id}
                  className="flex flex-col justify-center gap-2 rounded-2xl border border-slate-100 bg-linear-to-r from-blue-50/60 p-4 shadow-xs"
                >
                  <div className="flex flex-row justify-between gap-4">
                    <div className="flex flex-col justify-center gap-1.5 overflow-hidden">
                      <div className="flex flex-row items-baseline gap-1.5">
                        <H3 title="Título:" className="text-lg text-blue-400" />
                        <P
                          title={c.title ?? "Sem título"}
                          className="truncate font-medium text-blue-500"
                        />
                      </div>
                      <div className="flex flex-row items-baseline gap-1.5">
                        <H3
                          title="Descrição:"
                          className="text-lg text-blue-400"
                        />
                        <P
                          title={c.description ?? "Sem descrição"}
                          className="truncate text-blue-300"
                        />
                      </div>
                    </div>
                    <div className="flex flex-row items-start gap-2">
                      <Button
                        type="button"
                        className="flex h-10 w-10 items-center justify-center p-0!"
                        onClick={() => navigate(`renomear/${c.id}`)}
                      >
                        <FontAwesomeIcon icon={faPen} size="sm" />
                      </Button>
                      <Button
                        type="button"
                        className="flex h-10 w-10 items-center justify-center p-0!"
                        onClick={() =>
                          fetcher.submit(
                            { idCategory: c.id, intent: "delete-category" },
                            { method: "DELETE", action: "/home/rascunhos" },
                          )
                        }
                      >
                        <FontAwesomeIcon icon={faTrash} size="sm" />
                      </Button>
                    </div>
                  </div>
                  <Button
                    type="button"
                    className="mt-2 w-full py-2.5 text-sm font-semibold"
                    onClick={() => navigate(`detalhes-categoria/${c.id}`)}
                  >
                    Ver detalhes
                  </Button>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center py-20">
                <P
                  title="Nenhuma categoria encontrada"
                  className="text-blue-300"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Botão Flutuante (Floating Action Button) - Centralizado na parte inferior para Mobile, acima do HeaderMobile */}
      <div
        className={`fixed bottom-24 left-1/2 z-50 -translate-x-1/2 transition-opacity duration-300 lg:static lg:bottom-auto lg:left-auto lg:mt-4 lg:mb-10 lg:flex lg:translate-x-0 lg:justify-center ${
          isVisible ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <button
          type="button"
          onClick={() => setIsOpen((s) => !s)}
          ref={(e) => refs.setReference(e)}
          className="flex aspect-square h-12 w-12 cursor-pointer items-center justify-center rounded-full border-none bg-blue-400 text-white shadow-xl outline-2 outline-offset-4 outline-transparent transition-all hover:bg-blue-300 focus:outline-blue-200 lg:h-13 lg:w-13 lg:border lg:border-blue-50 lg:bg-white lg:text-blue-400 lg:hover:bg-blue-50"
        >
          <FontAwesomeIcon
            icon={faPlus}
            size="lg"
            className={isOpen ? "text-white" : "text-white lg:text-blue-400"}
          />
        </button>
      </div>

      {isOpen && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            className="z-50 flex flex-col gap-2 rounded-2xl border border-blue-50 bg-white p-2 shadow-2xs"
          >
            <button
              onClick={() => {
                navigate("tarefa-rascunho");
                setIsOpen(false);
              }}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-2 text-left transition-colors hover:bg-blue-50"
            >
              <i className="w-5 text-center text-blue-400">
                <FontAwesomeIcon icon={faFile} size="lg" />
              </i>
              <P
                title="Criar rascunho de tarefa"
                className="font-medium text-blue-400"
              />
            </button>
            <button
              onClick={() => {
                navigate("categoria-rascunho");
                setIsOpen(false);
              }}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-2 text-left transition-colors hover:bg-blue-50"
            >
              <i className="w-5 text-center text-blue-400">
                <FontAwesomeIcon icon={faFolder} size="lg" />
              </i>
              <P
                title="Criar rascunho de categoria"
                className="font-medium text-blue-400"
              />
            </button>
          </div>
        </FloatingPortal>
      )}
    </div>
  );
}
