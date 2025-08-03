import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faListAlt, faPen, faX } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../../component/btn";
import { H3 } from "../../component/subTitle";
import { P } from "../../component/paragrafo";
import { RotinaStore } from "../../store/UseRotina";
import { usePosition } from "../../hooks/UseFloatingUI";
import { useResizeView } from "../../hooks/UseResizeView";
import { parseAsBoolean, parseAsString, useQueryStates } from "nuqs";
import { useState } from "react";
import { FloatingPortal } from "@floating-ui/react";
import { AnimatePresence, motion } from "framer-motion";

export function SearchTasks() {
  const [isPopup, setPopup] = useState({
    isOpen: false,
    id: "",
  });
  const [, setSearch] = useQueryStates(
    {
      renomear: parseAsString,
      detalhes: parseAsString,
      modal: parseAsBoolean,
    },
    {
      history: "push",
    },
  );
  const { dataSearch, categorias, updateStatus, deletarTask } = RotinaStore();
  const { verificarWidth } = useResizeView();
  const { refs, floatingStyles } = usePosition({
    offPlacement: "top-start",
    offSet: 2,
    offShift: {
      mainAxis: true,
      crossAxis: false,
    },
  });

  function verificarDataSearch() {
    return dataSearch.length > 0;
  }

  return (
    <AnimatePresence>
      {verificarDataSearch() ? (
        dataSearch.map((t) => (
          <motion.div
            layoutId={t?.id}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1, opacity: 0 }}
            transition={{ type: "spring", delay: 0.3 }}
            key={t?.id}
            className="mx-3 mb-4 flex flex-row items-center justify-between gap-4 overflow-hidden rounded-[25px] bg-gradient-to-r from-blue-50 p-3 shadow-sm shadow-blue-50 select-none"
          >
            <div className="flex flex-col items-start gap-1.5">
              <div className="flex flex-row items-center gap-1">
                <H3 title="Rotina:" className="text-blue-400" />
                <P
                  title={t?.rotina}
                  className={`${!verificarWidth({ largura: 375 }) ? "w-20" : "w-50"} ${t?.status && "italic line-through"} truncate text-blue-300`}
                />
              </div>
              <div className="flex flex-row items-center gap-1">
                <H3 title="Categoria:" className={`max-w-min truncate text-blue-400`} />
                <P
                  title={categorias.find((c) => c?.id === t?.categoriaID)?.categoria ?? ""}
                  className={`${!verificarWidth({ largura: 375 }) ? "w-20" : "w-50"} truncate text-blue-300`}
                />
              </div>
              <div className="flex flex-row items-center gap-1">
                <H3 title="CategoriaID:" className={`max-w-min truncate text-blue-400`} />
                <P
                  title={t?.categoriaID}
                  className={`${!verificarWidth({ largura: 375 }) ? "w-20" : "w-50"} truncate text-blue-300`}
                />
              </div>
              <div className="flex flex-row items-center gap-1">
                <H3 title="Status:" className="max-w-min truncate text-blue-400" />
                <motion.p transition={{ type: "spring", stiffness: 200 }} className="font-medium text-blue-300">
                  {t?.status ? "rotina concluida" : "rotina incompleta"}
                </motion.p>
              </div>
              <div className="flex flex-row items-center gap-1">
                <H3 title="Marcar como:" className="text-blue-400" />
                <Button
                  type="button"
                  onClick={() => updateStatus({ id: t?.id })}
                  className={`border border-blue-50 text-[13px] font-semibold ${!t?.status ? "bg-blue-400" : "bg-white"}`}
                >
                  <p className={t?.status ? "text-blue-300" : "text-white"}>
                    {t?.status ? "rotina incompleta" : "rotina concluída"}
                  </p>
                </Button>
              </div>
            </div>
            <div className="flex flex-col items-start">
              <button
                aria-label="opções"
                ref={isPopup?.isOpen && isPopup?.id === t?.id ? refs.setReference : null}
                onClick={() => {
                  setPopup((s) => ({
                    ...s,
                    isOpen: !s.isOpen,
                    id: t?.id,
                  }));
                }}
                className="flex min-h-10 min-w-10 cursor-pointer items-center justify-center rounded-full bg-white text-blue-400 shadow-md shadow-blue-50"
              >
                <i>
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </i>
              </button>
            </div>
            <FloatingPortal>
              {isPopup?.isOpen && (
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
                          setSearch((s) => ({
                            ...s,
                            renomear: isPopup?.id,
                            modal: !s,
                          }));
                          setPopup((s) => ({
                            ...s,
                            id: "",
                            isOpen: false,
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
                          isOpen: false,
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
                          setSearch((s) => ({
                            ...s,
                            detalhes: isPopup?.id,
                            modal: !s,
                          }));
                          setPopup((s) => ({
                            ...s,
                            id: "",
                            isOpen: false,
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
          </motion.div>
        ))
      ) : (
        <div className="my-10 p-2 text-center">
          <P title="Vamos lá, pesquise alguma Rotina!" className="mx-3 !text-2xl text-blue-400 shadow-blue-100 !text-shadow-md" />
        </div>
      )}
    </AnimatePresence>
  );
}
/*<div className="my-10 p-2 text-center">
            <P
              title="Vamos lá, pesquise alguma Rotina!"
              className="mx-3 !text-2xl text-blue-400 shadow-blue-100 !text-shadow-md"
            />
          </div> */
