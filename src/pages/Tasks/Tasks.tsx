import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEllipsisVertical, faTrash, faPencil, faListAlt, faX, faPen } from "@fortawesome/free-solid-svg-icons";
import { usePosition } from "../../hooks/UseFloatingUI";
import { FloatingPortal } from "@floating-ui/react";
import { useResizeView } from "../../hooks/UseResizeView";
import { Button } from "../../component/btn";
import { RotinaStore } from "../../store/UseRotina";
import { motion } from "framer-motion";
import { parseAsBoolean, parseAsString, useQueryStates } from "nuqs";
import { useState } from "react";
import { P } from "../../component/paragrafo";
import { H3 } from "../../component/subTitle";

export function Tasks() {
  const { verificarWidth } = useResizeView();
  const { updateStatus, deletarTask, dataFiltro, categorias, categoriaTasks } = RotinaStore();
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
  const [, setQuery] = useQueryStates(
    {
      renomear: parseAsString,
      detalhes: parseAsString,
      modal: parseAsBoolean,
    },
    {
      history: "push",
    },
  );

  console.log({ dataFiltro, categoriaTasks });

  function verificarData() {
    return dataFiltro.length > 0 ? true : false;
  }

  return (
    <div>
      {verificarData() ? (
        dataFiltro.map((t) => (
          <div
            key={t?.id}
            className="mx-3 mb-4 flex flex-col gap-4 overflow-hidden rounded-full bg-gradient-to-r from-blue-50 p-3 shadow-sm shadow-blue-50 select-none"
          >
            <div className="mx-3 flex flex-row items-center justify-between">
              <div className="flex flex-row items-center gap-2">
                <div className="flex flex-row items-center">
                  <input
                    type="checkbox"
                    id={t?.id}
                    checked={t?.status}
                    className="peer sr-only"
                    onChange={() => updateStatus({ id: t?.id })}
                  />
                  <motion.label
                    htmlFor={t?.id}
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
                    title={t?.rotina}
                    className={
                      t?.status
                        ? `xs:max-2xs:w-40 3xs:max-4xs:w-50 md:w-96 truncate text-left text-blue-200 italic line-through`
                        : `xs:max-2xs:w-40 3xs:max-4xs:w-50 md:w-96 truncate text-left text-blue-400`
                    }
                  />
                </div>
              </div>
              <div>
                {!verificarWidth({ largura: 500 }) && (
                  <button
                    aria-label="opções"
                    ref={isPopup?.status && isPopup?.id === t?.id ? refs.setReference : null}
                    onClick={() => {
                      setPopup((s) => ({
                        ...s,
                        status: !s?.status,
                        id: t?.id,
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
                            renomear: t?.id,
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
                    <Button type="button" onClick={() => deletarTask({ id: t?.id })} className="min-h-9 min-w-9 !p-0">
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
                      <div className="flex flex-col gap-2">
                        <Button
                          type="button"
                          onClick={() => {
                            setTimeout(() => {
                              setQuery((s) => ({
                                ...s,
                                renomear: isPopup?.id,
                                modal: true,
                              }));
                              setPopup((s) => ({
                                ...s,
                                id: "",
                                status: !s?.status,
                              }));
                            }, 300);
                          }}
                          className="flex flex-row gap-2 rounded-full bg-white text-base shadow-sm shadow-blue-50"
                        >
                          <i className="text-blue-400">
                            <FontAwesomeIcon icon={faPen} />
                          </i>
                          <p className="font-medium text-blue-400">Renomear</p>
                        </Button>
                        <Button
                          type="button"
                          onClick={() => {
                            setPopup((s) => ({
                              ...s,
                              id: "",
                              status: !s?.status,
                            }));
                            deletarTask({ id: isPopup?.id });
                          }}
                          className="flex flex-row gap-2 rounded-full bg-white text-base shadow-sm shadow-blue-50"
                        >
                          <i className="text-blue-400">
                            <FontAwesomeIcon icon={faX} />
                          </i>
                          <p className="font-medium text-blue-400">Apagar</p>
                        </Button>
                        <Button
                          type="button"
                          onClick={() => {
                            setTimeout(() => {
                              setQuery((s) => ({
                                ...s,
                                detalhes: isPopup?.id,
                                modal: true,
                              }));
                              setPopup((s) => ({
                                ...s,
                                id: "",
                                status: !s?.status,
                              }));
                            }, 300);
                          }}
                          className="flex flex-row gap-2 rounded-full bg-white text-base shadow-sm shadow-blue-50"
                        >
                          <i className="text-blue-400">
                            <FontAwesomeIcon icon={faListAlt} />
                          </i>
                          <p className="font-medium text-blue-400">detalhes</p>
                        </Button>
                      </div>
                    </div>
                  )}
                </FloatingPortal>
              </div>
            </div>
            <div className="mx-3 flex flex-row items-center justify-between">
              <div className="flex flex-row items-center justify-center gap-0.5 text-[10px]">
                <H3 title="categoria:" className="text-sm font-medium text-blue-400" />
                <P
                  title={categorias.find((c) => c?.id === t?.categoriaID)?.categoria ?? ""}
                  className="xs:max-2xs:w-8 3xs:max-4xs:w-14 truncate text-sm font-medium text-blue-300"
                />
              </div>
              {verificarWidth({ largura: 700 }) && (
                <div>
                  <Button
                    type="button"
                    onClick={() => {
                      setTimeout(() => {
                        setQuery((s) => ({
                          ...s,
                          detalhes: t?.id,
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

/*
<main
      className="flex flex-col gap-3 px-3"
      onDoubleClick={() =>
        setPopup((s) => ({
          ...s,
          id: "",
          status: false,
        }))
      }
    >

(
        
      )}
    </main>



<Container>
          <p className="text-center font-bold text-blue-400">Nenhuma Rotina Criada</p>
        </Container>





<div className="flex flex-col gap-2">
                        <Button
                          onClick={() => {
                            setQuery((s) => ({
                              ...s,
                              renomear: isPopup?.id,
                              modal: !s?.status,
                            }));
                            setPopup((s) => ({
                              ...s,
                              id: "",
                              status: !s?.status,
                            }));
                          }}
                          className="flex flex-row gap-2 rounded-full bg-white text-base shadow-sm shadow-blue-50"
                        >
                          <i className="text-blue-400">
                            <FontAwesomeIcon icon={faPen} />
                          </i>
                          <p className="font-medium text-blue-400">Renomear</p>
                        </Button>
                        <Button
                          onClick={() => {
                            setPopup((s) => ({
                              ...s,
                              id: "",
                              status: !s?.status,
                            }));
                            deletarTask({ id: isPopup?.id });
                          }}
                          className="flex flex-row gap-2 rounded-full bg-white text-base shadow-sm shadow-blue-50"
                        >
                          <i className="text-blue-400">
                            <FontAwesomeIcon icon={faX} />
                          </i>
                          <p className="font-medium text-blue-400">Apagar</p>
                        </Button>
                        <Button
                          onClick={() => {
                            setQuery((s) => ({
                              ...s,
                              detalhes: isPopup?.id,
                              modal: !s?.status,
                            }));
                            setPopup((s) => ({
                              ...s,
                              id: "",
                              status: !s?.status,
                            }));
                          }}
                          className="flex flex-row gap-2 rounded-full bg-white text-base shadow-sm shadow-blue-50"
                        >
                          <i className="text-blue-400">
                            <FontAwesomeIcon icon={faListAlt} />
                          </i>
                          <p className="font-medium text-blue-400">detalhes</p>
                        </Button>
                      </div> */

/*
                      <main
            className="mx-3 flex flex-col gap-4 rounded-full border border-blue-50 bg-gradient-to-r from-blue-50 p-3 will-change-transform select-none"
            key={t?.id}
          >
            <Container className="mx-3 flex flex-row items-center justify-between">
              <div className="flex flex-row items-center gap-2">
                <div className="flex flex-row items-center">
                  <input
                    type="checkbox"
                    id={t?.id}
                    checked={t?.status}
                    className="peer sr-only"
                    onChange={() => updateStatus({ id: t?.id })}
                  />
                  <motion.label
                    htmlFor={t?.id}
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
                    className={
                      t?.status
                        ? `${!verificarWidth({ largura: 375 }) ? "w-40" : "w-60"} truncate text-left text-blue-200 line-through`
                        : `${!verificarWidth({ largura: 375 }) ? "w-40" : "w-60"} truncate text-left text-blue-400`
                    }
                  >
                    {t?.rotina}
                  </P>
                </div>
              </div>
              <div>
                {!verificarWidth({ largura: 500 }) && (
                  <button
                    aria-label="opções"
                    ref={isPopup?.status && isPopup?.id === t?.id ? refs.setReference : null}
                    onClick={() => {
                      setPopup((s) => ({
                        ...s,
                        status: !s?.status,
                        id: t?.id,
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
                      onClick={() =>
                        setQuery((s) => ({
                          ...s,
                          renomear: t?.id,
                          modal: !s?.status,
                        }))
                      }
                      className="min-h-9 min-w-9 !p-0"
                    >
                      <i>
                        <FontAwesomeIcon icon={faPencil} />
                      </i>
                    </Button>
                    <Button onClick={() => deletarTask({ id: t?.id })} className="min-h-9 min-w-9 !p-0">
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
                      <div className="flex flex-col gap-2">
                        <Button
                          onClick={() => {
                            setQuery((s) => ({
                              ...s,
                              renomear: isPopup?.id,
                              modal: !s?.status,
                            }));
                            setPopup((s) => ({
                              ...s,
                              id: "",
                              status: !s?.status,
                            }));
                          }}
                          className="flex flex-row gap-2 rounded-full bg-white text-base shadow-sm shadow-blue-50"
                        >
                          <i className="text-blue-400">
                            <FontAwesomeIcon icon={faPen} />
                          </i>
                          <p className="font-medium text-blue-400">Renomear</p>
                        </Button>
                        <Button
                          onClick={() => {
                            setPopup((s) => ({
                              ...s,
                              id: "",
                              status: !s?.status,
                            }));
                            deletarTask({ id: isPopup?.id });
                          }}
                          className="flex flex-row gap-2 rounded-full bg-white text-base shadow-sm shadow-blue-50"
                        >
                          <i className="text-blue-400">
                            <FontAwesomeIcon icon={faX} />
                          </i>
                          <p className="font-medium text-blue-400">Apagar</p>
                        </Button>
                        <Button
                          onClick={() => {
                            setQuery((s) => ({
                              ...s,
                              detalhes: isPopup?.id,
                              modal: !s?.status,
                            }));
                            setPopup((s) => ({
                              ...s,
                              id: "",
                              status: !s?.status,
                            }));
                          }}
                          className="flex flex-row gap-2 rounded-full bg-white text-base shadow-sm shadow-blue-50"
                        >
                          <i className="text-blue-400">
                            <FontAwesomeIcon icon={faListAlt} />
                          </i>
                          <p className="font-medium text-blue-400">detalhes</p>
                        </Button>
                      </div>
                    </div>
                  )}
                </FloatingPortal>
              </div>
            </Container>
            <Container className="mx-3 flex flex-row items-center justify-between">
              <div className="flex flex-row items-center justify-center gap-0.5 text-[10px]">
                <h3 className="text-sm font-medium text-blue-400">categoria:</h3>
                <p className="text-sm font-medium text-blue-300">
                  {categorias.map((c) => c?.id === t?.categoriaID && c?.categoria)}
                </p>
              </div>
              {verificarWidth({ largura: 700 }) && (
                <div>
                  <Button
                    onClick={() => {
                      setQuery((s) => ({
                        ...s,
                        detalhes: t?.id,
                        modal: !s?.status,
                      }));
                      setPopup((s) => ({
                        ...s,
                        id: "",
                        status: false,
                      }));
                    }}
                    className="px-3 pt-1 pb-1 text-base font-medium"
                  >
                    <p className="text-white">Ver detalhes</p>
                  </Button>
                </div>
              )}
              <div className="flex flex-row items-center justify-center gap-0.5 text-[10px]">
                <h3 className="text-sm font-medium text-blue-400">data:</h3>
                <p className="text-sm font-medium text-blue-300">20/08/2025</p>
              </div>
            </Container>
          </main>
                     
                       */
