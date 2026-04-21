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
import { NavLink, useLoaderData, useNavigate } from "react-router";
import { H1 } from "../../component/title";
import type { loader } from "./controllers/loader.server";
import type { dataRascunhos } from "./type.server";
import type { Task, Category } from "../Tasks/type.server";
import { P } from "../../component/paragrafo";
import { Button } from "../../component/btn";
import { useState } from "react";
import { useFetcher } from "react-router";
import { FloatingPortal } from "@floating-ui/react";
import { usePosition } from "../../hooks/UseFloatingUI";

export function Rascunhos() {
  const rascunhos: dataRascunhos = useLoaderData<typeof loader>();
  const dataCategory = rascunhos.data.c;
  const dataTasks = rascunhos.data.t;
  const [isLayout, setLayout] = useState(false);
  const navigate = useNavigate();
  const fetcher = useFetcher();
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles } = usePosition({
    offPlacement: "top",
    offSet: 15,
    offShift: { crossAxis: false },
  });

  return (
    <div className="flex h-full flex-col">
      <div className="">
        <NavLink
          to="/home"
          className="flex w-min flex-row items-center gap-2 rounded-full px-2 hover:bg-blue-50"
        >
          <FontAwesomeIcon icon={faAngleLeft} className="text-blue-400" />
          <H1 title="Rascunhos" className="w-max text-lg! text-blue-400" />
        </NavLink>
      </div>
      <div
        className={
          !isLayout
            ? "flex flex-1 flex-row items-center justify-center gap-5"
            : "flex flex-1 flex-row-reverse items-center justify-center gap-5"
        }
      >
        <div className="scrollbar-hide h-full w-full overflow-y-auto">
          <div className="mt-10">
            <H1 title="Tarefas" className="w-max text-sm! text-blue-400" />
          </div>
          {dataTasks.length ? (
            dataTasks.map((t: Task) => (
              <div
                key={t.id}
                className="my-2 flex flex-col justify-center gap-2 rounded-2xl border border-slate-100 bg-linear-to-r from-blue-50/60 p-3"
              >
                <div className="flex flex-row justify-between rounded-2xl">
                  <div className="flex flex-col justify-center gap-1.5">
                    <div className="flex flex-row items-center gap-1.5">
                      <H1
                        title="Titulo:"
                        className="text-base! text-blue-400"
                      />
                      <P
                        title={t.title ?? "Ops, título não disponível"}
                        className={"text-blue-400"}
                      />
                    </div>
                    <div className="flex flex-row items-center gap-1.5">
                      <H1
                        title="Descrição:"
                        className="text-base! text-blue-400"
                      />
                      <P
                        title={t.description ?? "Ops, descrição não disponível"}
                        className="text-blue-300"
                      />
                    </div>
                  </div>
                  <div className="flex flex-row items-center justify-center gap-2">
                    <div>
                      <Button
                        type="button"
                        className="min-h-9 min-w-9 p-0!"
                        onClick={() => navigate(`renomear/${t.id}`)}
                      >
                        <i>
                          <FontAwesomeIcon icon={faPen} />
                        </i>
                      </Button>
                    </div>
                    <div>
                      <Button
                        type="button"
                        className="min-h-9 min-w-9 p-0!"
                        onClick={() =>
                          fetcher.submit(
                            {
                              idTask: t.id,
                              intent: "delete-task",
                            },
                            {
                              method: "DELETE",
                              action: "/home/rascunhos",
                            },
                          )
                        }
                      >
                        <i>
                          <FontAwesomeIcon icon={faTrash} />
                        </i>
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="w-full text-center">
                  <Button
                    type="button"
                    className="px-3 pt-1 pb-1 text-base font-medium"
                    onClick={() => navigate(`detalhes-tarefa/${t.id}`)}
                  >
                    <p className="text-white">Ver detalhes</p>
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <P
                title="Ops, nenhuma tarefa foi encontrada"
                className="text-blue-400"
              />
            </div>
          )}
        </div>
        <div className="flex h-full flex-col items-center justify-between py-10">
          <div className="flex flex-1 items-center">
            <Button
              type="button"
              className="min-h-9 min-w-9 p-0!"
              onClick={() => setLayout((s) => !s)}
            >
              <i>
                <FontAwesomeIcon icon={faRightLeft} />
              </i>
            </Button>
          </div>
          <div
            onClick={() => setIsOpen((s) => !s)}
            ref={(e) => refs.setReference(e)}
          >
            <Button
              type="button"
              className="flex min-h-13 min-w-13 cursor-pointer items-center justify-center rounded-full bg-white! p-0! shadow-lg"
            >
              <FontAwesomeIcon
                icon={faPlus}
                className={`text-xl text-blue-400 transition-transform ${isOpen ? "rotate-45" : ""}`}
              />
            </Button>
          </div>
        </div>
        <div className="scrollbar-hide h-full w-full overflow-y-auto">
          <div className="mt-10">
            <H1 title="Categorias" className="w-max text-sm! text-blue-400" />
          </div>
          {dataCategory.length ? (
            dataCategory.map((c: Category) => (
              <div
                key={c.id}
                className="my-2 flex flex-col justify-center gap-2 rounded-2xl border border-slate-100 bg-linear-to-r from-blue-50/60 p-3"
              >
                <div className="flex flex-row justify-between rounded-2xl">
                  <div className="flex flex-col justify-center gap-1.5">
                    <div className="flex flex-row items-center gap-1.5">
                      <H1
                        title="Titulo:"
                        className="text-base! text-blue-400"
                      />
                      <P
                        title={c.title ?? "Ops, título não disponível"}
                        className={"text-blue-400"}
                      />
                    </div>
                    <div className="flex flex-row items-center gap-1.5">
                      <H1
                        title="Descrição:"
                        className="text-base! text-blue-400"
                      />
                      <P
                        title={c.description ?? "Ops, descrição não disponível"}
                        className="text-blue-300"
                      />
                    </div>
                  </div>
                  <div className="flex flex-row items-center justify-center gap-2">
                    <div>
                      <Button
                        type="button"
                        className="min-h-9 min-w-9 p-0!"
                        onClick={() => navigate(`renomear/${c.id}`)}
                      >
                        <i>
                          <FontAwesomeIcon icon={faPen} />
                        </i>
                      </Button>
                    </div>
                    <div>
                      <Button
                        type="button"
                        className="min-h-9 min-w-9 p-0!"
                        onClick={() =>
                          fetcher.submit(
                            {
                              idCategory: c.id,
                              intent: "delete-category",
                            },
                            {
                              method: "DELETE",
                              action: "/home/rascunhos",
                            },
                          )
                        }
                      >
                        <i>
                          <FontAwesomeIcon icon={faTrash} />
                        </i>
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="w-full text-center">
                  <Button
                    type="button"
                    className="px-3 pt-1 pb-1 text-base font-medium"
                    onClick={() => navigate(`detalhes-categoria/${c.id}`)}
                  >
                    <p className="text-white">Ver detalhes</p>
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <P
                title="Ops, nenhuma categoria foi encontrada"
                className="text-blue-400"
              />
            </div>
          )}
        </div>
      </div>

      {isOpen && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            className="z-50 flex flex-col gap-2 rounded-2xl border border-blue-50 bg-white p-2 shadow-xl"
          >
            <button
              onClick={() => {
                navigate("tarefa-rascunho");
                setIsOpen(false);
              }}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-2 text-left transition-colors hover:bg-blue-50"
            >
              <i className="w-5 text-center text-blue-400">
                <FontAwesomeIcon icon={faFile} />
              </i>
              <P
                title="Criar tarefa de rascunho"
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
                <FontAwesomeIcon icon={faFolder} />
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
