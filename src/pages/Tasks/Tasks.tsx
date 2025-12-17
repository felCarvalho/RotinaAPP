import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEllipsisVertical, faTrash, faPencil } from "@fortawesome/free-solid-svg-icons";
import { usePosition } from "../../hooks/UseFloatingUI";
import { FloatingPortal } from "@floating-ui/react";
import { useResizeView } from "../../hooks/UseResizeView";
import { Button } from "../../component/btn";
import { motion } from "framer-motion";
import { parseAsBoolean, parseAsString, useQueryStates } from "nuqs";
import { useEffect, useState } from "react";
import { P } from "../../component/paragrafo";
import { H3 } from "../../component/subTitle";
import { PopupOptionsTasks } from "../../component/FunctionTasks/PopupOptionTasks/PopupOptionsTasks";
import axios from "axios";
import { useNavigate } from "react-router";

interface Task {
  id: number;
  publicId: string;
  title: string;
  description: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

enum Status {
  Concluída = "Concluída",
  Pendente = "Pendente",
}

export function Tasks() {
  const [dataFiltro, setDataFiltro] = useState<Task[]>([]);
  const [error, setError] = useState("");
  const { verificarWidth } = useResizeView();
  const navigate = useNavigate();
  const { refs, floatingStyles } = usePosition({
    offPlacement: "top-start",
    offSet: 2,
    offShift: {
      crossAxis: false,
      mainAxis: true,
    },
  });
  const [isPopup, setPopup] = useState({
    id: "",
    status: false,
  });
  const [query, setQuery] = useQueryStates(
    {
      renomear: parseAsString,
      detalhes: parseAsString,
      categoria: parseAsString,
      modal: parseAsBoolean,
    },
    {
      history: "push",
    },
  );

  async function buscarTarefas() {
    try {
      const response = await axios.get("/home", {
        baseURL: import.meta.env.VITE_LOCAL_URL,
        withCredentials: true,
      });

      const { data, status } = response;

      return {
        data: data,
        status: status,
        success: status === 200,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return { data: error?.response?.data, status: error?.response?.status, success: false };
      }

      return { data: "Erro desconhecido", status: 500, success: false };
    }
  }

  useEffect(() => {
    async function getTarefas() {
      const responseGetTarefas = await buscarTarefas();

      if (responseGetTarefas.success) {
        setDataFiltro(responseGetTarefas.data);
        return;
      }

      if (!responseGetTarefas.success) {
        setError("Erro ao buscar tarefas");
        navigate("/auth/login");
        console.log("Erro ao buscar tarefas");
      }
    }

    getTarefas();
  }, []);

  function verificarData() {
    return dataFiltro.length > 0;
  }

  const array: Task[] = [];

  console.log(dataFiltro);

  return (
    <div>
      {verificarData() ? (
        array.map((t) => (
          <div
            key={t?.id}
            className="mx-3 mb-4 flex flex-col gap-4 overflow-hidden rounded-full bg-gradient-to-r from-blue-50/60 p-3 shadow-sm shadow-blue-50 select-none"
          >
            <div className="mx-3 flex flex-row items-center justify-between">
              <div className="flex flex-row items-center gap-2">
                <div className="flex flex-row items-center">
                  <input
                    type="checkbox"
                    id={t?.publicId}
                    checked={t?.status === Status.Concluída || t?.status === Status.Pendente}
                    className="peer sr-only"
                  />
                  <motion.label
                    htmlFor={t?.publicId}
                    className="min-h-5 min-w-6 cursor-pointer rounded-full bg-white text-center peer-checked:bg-blue-400"
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    aria-label={t?.status ? "concluido" : "incompleto"}
                  >
                    <i className="text-white">
                      <FontAwesomeIcon icon={faCheck} />
                    </i>
                  </motion.label>
                </div>
                <div>
                  <P
                    title={t?.title}
                    className={
                      t?.status === Status.Concluída
                        ? `xs:max-2xs:w-40 3xs:max-4xs:w-50 truncate text-left text-blue-200 italic line-through md:w-96`
                        : `xs:max-2xs:w-40 3xs:max-4xs:w-50 truncate text-left text-blue-400 md:w-96`
                    }
                  />
                </div>
              </div>
              <div>
                {!verificarWidth({ largura: 500 }) && (
                  <button
                    aria-label="opções"
                    ref={isPopup?.status && isPopup?.id === t?.publicId ? refs.setReference : null}
                    onClick={() => {
                      setPopup((s) => ({
                        ...s,
                        status: !s?.status,
                        id: t?.publicId,
                      }));
                    }}
                    className="flex min-h-10 min-w-10 cursor-pointer items-center justify-center rounded-full bg-white text-blue-400 shadow-md shadow-blue-50"
                  >
                    <i>
                      <FontAwesomeIcon icon={faEllipsisVertical} />
                    </i>
                  </button>
                )}
                {verificarWidth({ largura: 700 }) && (
                  <div className="flex flex-row items-center justify-center gap-2">
                    <Button
                      type="button"
                      onClick={() =>
                        setTimeout(() => {
                          setQuery((s) => ({
                            ...s,
                            renomear: t?.publicId,
                            modal: true,
                          }));
                        }, 300)
                      }
                      className="min-h-9 min-w-9 !p-0"
                    >
                      <i>
                        <FontAwesomeIcon icon={faPencil} />
                      </i>
                    </Button>
                    <Button type="button" className="min-h-9 min-w-9 !p-0">
                      <i>
                        <FontAwesomeIcon icon={faTrash} />
                      </i>
                    </Button>
                  </div>
                )}
                <FloatingPortal>
                  {isPopup?.status && (
                    <div
                      className="z-50 rounded-3xl bg-white p-3 shadow-2xs shadow-blue-50"
                      ref={refs.setFloating}
                      style={floatingStyles}
                    >
                      <span
                        onClick={() =>
                          setPopup((s) => ({
                            ...s,
                            id: "",
                            status: !s?.status,
                          }))
                        }
                      >
                        <PopupOptionsTasks id={isPopup?.id} />
                      </span>
                    </div>
                  )}
                </FloatingPortal>
              </div>
            </div>
            <div className="mx-3 flex flex-row items-center justify-between">
              <div className="flex flex-row items-center justify-center gap-0.5 text-[10px]">
                <H3 title="categoria:" className="text-sm font-medium text-blue-400" />
                <P title={"categoria"} className="xs:max-2xs:w-8 3xs:max-4xs:w-14 truncate text-sm font-medium text-blue-300" />
              </div>
              {verificarWidth({ largura: 700 }) && (
                <div>
                  <Button
                    type="button"
                    onClick={() => {
                      setTimeout(() => {
                        setQuery((s) => ({
                          ...s,
                          detalhes: t?.publicId,
                          modal: true,
                        }));
                        setPopup((s) => ({
                          ...s,
                          id: "",
                          status: false,
                        }));
                      }, 300);
                    }}
                    className="px-3 pt-1 pb-1 text-base font-medium"
                  >
                    <p className="text-white">Ver detalhes</p>
                  </Button>
                </div>
              )}
              <div className="flex flex-row items-center justify-center gap-0.5 text-[10px]">
                <H3 title="categoria" className="text-sm font-medium text-blue-400" />
                <P title="20/05/1025" className="text-sm font-medium text-blue-300" />
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="my-10 p-2 text-center">
          <P title="Nenhuma Rotina encontrada!" className="mx-3 !text-2xl text-blue-400 shadow-blue-100 !text-shadow-md" />
        </div>
      )}
    </div>
  );
}
