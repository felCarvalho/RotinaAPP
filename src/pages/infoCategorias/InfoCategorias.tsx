import { faAngleDown, faAngleUp, faCheck, faPen, faTrash, faTrashCanArrowUp, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../../component/btn";
import { P } from "../../component/paragrafo";
import { H3 } from "../../component/subTitle";
import { RotinaStore } from "../../store/UseRotina";
import { parseAsBoolean, parseAsString, useQueryStates } from "nuqs";
import { motion, AnimatePresence } from "framer-motion";

export function InfoCategorias() {
  const [isIcon, setIsIcon] = useState<string>("");
  const {
    porcentagemTasksStatus,
    buscarIdUserTask,
    dataCategoriasFiltro,
    filtragemCategorias,
    categoriaMenuConcluida,
    categoriaMenuIncompleta,
    categoriaMenuDeletar,
    categoriaMenuRestaurar,
    lixeira,
  } = RotinaStore();
  const [query, setQuery] = useQueryStates(
    {
      renomear: parseAsString,
      categoria: parseAsString,
      modal: parseAsBoolean,
    },
    {
      history: "push",
    },
  );

  //funções auxiliares
  const taskUser = useCallback(
    ({ categoriaID }: { categoriaID: string }) => buscarIdUserTask().filter((t) => t?.categoriaID === categoriaID),
    [buscarIdUserTask],
  );

  const taskUserDeletada = useCallback(
    ({ categoriaID }: { categoriaID: string }) => lixeira.filter((t) => t?.categoriaID === categoriaID),
    [lixeira],
  );

  const verificarOption = useCallback(({ categoriaID }: { categoriaID: string }) => isIcon === categoriaID, [isIcon]);

  useEffect(() => {
    filtragemCategorias({ categoria: query?.categoria ?? "todas" });
  }, [filtragemCategorias]);

  return (
    <AnimatePresence>
      <div className="min-h-dvh w-full bg-blue-50/10 p-5">
        <div className="relative my-10">
          {dataCategoriasFiltro.map((c) => (
            <motion.div
              layoutId={c?.id}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", duration: 0.4 }}
              key={c?.id}
              className="my-5 flex w-full flex-col items-start justify-start rounded-3xl bg-gradient-to-r from-blue-50/30 px-3 py-4 shadow-md shadow-blue-50"
            >
              <div className="flex w-full flex-col items-start justify-start gap-2.5">
                <div className="flex flex-row items-center gap-1.5">
                  <H3 title="Informações da categoria:" className="!text-md text-blue-400" />
                  <P title={`${c?.categoria}`} className="!text-md w-20 truncate text-blue-300" />
                </div>
                <div className="flex flex-col items-start justify-start">
                  <div className="flex flex-row items-center justify-start gap-2">
                    <H3 title="categoria:" className="text-blue-400/80" />
                    <P title={c?.categoria} className="w-20 truncate text-blue-300/80" />
                  </div>
                  <div className="flex w-full flex-row items-center justify-start gap-2">
                    <H3 title="categoriaID:" className="text-blue-400/80" />
                    <P title={c?.id} className="w-20 truncate text-blue-300/80" />
                  </div>
                  <div className="flex flex-row items-center justify-start gap-2">
                    <H3 title="Nº rotinas:" className="text-blue-400/80" />
                    <P title={`${taskUser({ categoriaID: c?.id }).length}`} className="w-20 truncate text-blue-300/80" />
                  </div>
                  <div className="flex flex-row items-center justify-start gap-2">
                    <H3 title="Nº rotinas deletas:" className="text-blue-400/80" />
                    <P title={`${taskUserDeletada({ categoriaID: c?.id }).length}`} className="w-20 truncate text-blue-300/80" />
                  </div>
                  <div className="flex flex-row items-center justify-start gap-2">
                    <H3 title="rotinas concluidas:" className="text-blue-400/80" />
                    <P title={`${porcentagemTasksStatus(c?.id, true)}`} className="w-20 truncate text-blue-300/80" />
                  </div>
                  <div className="flex flex-row items-center justify-start gap-2">
                    <H3 title="rotinas incompletas:" className="text-blue-400/80" />
                    <P title={`${porcentagemTasksStatus(c?.id, false)}`} className="w-20 truncate text-blue-300/80" />
                  </div>
                </div>
              </div>
              <div className="my-3 w-full text-center">
                <Button onClick={() => setIsIcon((s) => (s !== c?.id ? c?.id : ""))} type="button" className="bg-white">
                  <i className="text-blue-400">
                    <FontAwesomeIcon icon={!verificarOption({ categoriaID: c?.id }) ? faAngleDown : faAngleUp} />
                  </i>
                </Button>
              </div>
              {verificarOption({ categoriaID: c?.id }) && (
                <div className="flex flex-col items-start justify-start">
                  <div className="flex flex-row items-center gap-1.5">
                    <H3 title="Funções para categoria:" className="!text-md text-blue-400" />
                    <P title={`${c?.categoria}`} className="!text-md text-blue-300" />
                  </div>
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <label className="mr-3 flex flex-row items-center gap-2">
                      <H3 title="Marcar todas como:" className="text-blue-400/80" />
                      <Button
                        onClick={() => categoriaMenuConcluida(c?.id)}
                        type="button"
                        className="flex flex-row items-center gap-2 bg-white !py-1"
                      >
                        <i className="text-blue-300">
                          <FontAwesomeIcon icon={faCheck} />
                        </i>
                        <P title="Concluidas" className="text-2xs text-blue-400/80" />
                      </Button>
                    </label>
                    <label className="mr-3 flex flex-row items-center gap-2">
                      <H3 title="Marcar todas como:" className="text-blue-400/80" />
                      <Button
                        onClick={() => categoriaMenuIncompleta(c?.id)}
                        type="button"
                        className="flex flex-row items-center gap-2 bg-white !py-1"
                      >
                        <i className="text-blue-300">
                          <FontAwesomeIcon icon={faX} />
                        </i>
                        <P title="Incompletas" className="text-2xs text-blue-400/80" />
                      </Button>
                    </label>
                    <label className="mr-3 flex flex-row items-center gap-2">
                      <H3 title="Apagar todas:" className="text-blue-400/80" />
                      <Button
                        onClick={() => categoriaMenuDeletar(c?.id)}
                        type="button"
                        className="flex flex-row items-center gap-2 bg-white !py-1"
                      >
                        <i className="text-2xs text-blue-300">
                          <FontAwesomeIcon icon={faTrash} />
                        </i>
                        <P title="Apagar" className="text-2xs text-blue-400/80" />
                      </Button>
                    </label>
                    <label className="mr-3 flex flex-row items-center gap-2">
                      <H3 title="Restaurar todas:" className="text-blue-400/80" />
                      <Button
                        onClick={() => categoriaMenuRestaurar(c?.id)}
                        type="button"
                        className="flex flex-row items-center gap-2 bg-white !py-1"
                      >
                        <i className="text-blue-300">
                          <FontAwesomeIcon icon={faTrashCanArrowUp} />
                        </i>
                        <P title="Restaurar" className="text-2xs text-blue-400/80" />
                      </Button>
                    </label>
                    <label className="mr-3 flex flex-row items-center gap-2">
                      <H3 title="Renomear categoria:" className="text-blue-400/80" />
                      <Button
                        onClick={() =>
                          setTimeout(() => {
                            setQuery((s) => ({
                              ...s,
                              renomear: c?.id,
                              modal: true,
                            }));
                          }, 300)
                        }
                        type="button"
                        className="flex flex-row items-center gap-2 bg-white !py-1"
                      >
                        <i className="text-2xs text-blue-300">
                          <FontAwesomeIcon icon={faPen} />
                        </i>
                        <P title="renomear" className="text-2xs text-blue-400/80" />
                      </Button>
                    </label>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatePresence>
  );
}
