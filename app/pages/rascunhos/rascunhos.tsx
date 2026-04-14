import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faPen,
  faRightLeft,
  faTrash,
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

export function Rascunhos() {
  const rascunhos: dataRascunhos = useLoaderData<typeof loader>();
  const dataCategory = rascunhos.data.c;
  const dataTasks = rascunhos.data.t;
  const notification = rascunhos.notification;
  const code = rascunhos.code;
  const [isLayout, setLayout] = useState(false);
  const navigate = useNavigate();
  const fetcher = useFetcher();

  return (
    <div className="h-full">
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
            ? "flex h-full flex-row items-center justify-center gap-5"
            : "flex h-full flex-row-reverse items-center justify-center gap-5"
        }
      >
        <div className="h-full w-full">
          <div className="mt-10">
            <H1 title="Tarefas" className="w-max text-sm! text-blue-400" />
          </div>
          {dataTasks.length ? (
            dataTasks.map((t: Task) => (
              <div className="my-2 flex flex-col justify-center gap-2 rounded-2xl border border-slate-100 bg-linear-to-r from-blue-50/60 p-3">
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
        <div>
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
        <div className="h-full w-full">
          <div className="mt-10">
            <H1 title="Categorias" className="w-max text-sm! text-blue-400" />
          </div>
          {dataCategory.length ? (
            dataCategory.map((c: Category) => (
              <div className="my-2 flex flex-col justify-center gap-2 rounded-2xl border border-slate-100 bg-linear-to-r from-blue-50/60 p-3">
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
    </div>
  );
}

/*
{data.length &&
  data.map((t) => (
    <div>
      <div></div>
    </div>
  ))}*/
