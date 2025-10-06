import { faAngleDown, faAngleUp, faCheck, faTrash, faTrashCanArrowUp, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useState } from "react";
import { Button } from "../../component/btn";
import { P } from "../../component/paragrafo";
import { H3 } from "../../component/subTitle";
import { RotinaStore } from "../../store/UseRotina";
import { useResizeView } from "../../hooks/UseResizeView";

export function InfoCategorias() {
  const [isOpen, setOpen] = useState<string>("");
  const {
    porcentagemTasksStatus,
    buscarIdUserTask,
    buscarIdUserCategoria,
    categoriaMenuConcluida,
    categoriaMenuIncompleta,
    categoriaMenuDeletar,
    categoriaMenuRestaurar,
    lixeira,
  } = RotinaStore();
  const { verificarWidth } = useResizeView();

  //funções auxiliares
  const taskUser = useCallback(
    ({ categoriaID }: { categoriaID: string }) => buscarIdUserTask().filter((t) => t?.categoriaID === categoriaID),
    [buscarIdUserTask],
  );

  const taskUserDeletada = useCallback(
    ({ categoriaID }: { categoriaID: string }) => lixeira.filter((t) => t?.categoriaID === categoriaID),
    [lixeira],
  );

  const verificarOption = useCallback(({ categoriaID }: { categoriaID: string }) => isOpen === categoriaID, [isOpen]);

  const categorias = buscarIdUserCategoria();

  return (
    <div className="mx-15 min-w-dvh bg-blue-50/10">
      <div className="relative my-10">
        {categorias.map((c) => (
          <div
            key={c?.id}
            className="my-5 flex flex-col items-start justify-start rounded-3xl bg-gradient-to-r from-blue-50/30 px-3 py-4 shadow-md shadow-blue-50"
          >
            <div className="flex flex-row items-center justify-start gap-2">
              <H3 title="categoria:" className="text-blue-400" />
              <P title={c?.categoria} className="text-blue-300" />
            </div>
            <div className="flex flex-row items-center justify-start gap-2">
              <H3 title="categoriaID:" className="text-blue-400" />
              <P title={c?.id} className="text-blue-300" />
            </div>
            <div className="flex flex-row items-center justify-start gap-2">
              <H3 title="Nº rotinas:" className="text-blue-400" />
              <P title={`${taskUser({ categoriaID: c?.id }).length}`} className="text-blue-300" />
            </div>
            <div className="flex flex-row items-center justify-start gap-2">
              <H3 title="Nº rotinas deletas:" className="text-blue-400" />
              <P title={`${taskUserDeletada({ categoriaID: c?.id }).length}`} className="text-blue-300" />
            </div>
            <div className="flex flex-row items-center justify-start gap-2">
              <H3 title="rotinas concluidas:" className="text-blue-400" />
              <P title={`${porcentagemTasksStatus(c?.id, true)}`} className="text-blue-300" />
            </div>
            <div className="flex flex-row items-center justify-start gap-2">
              <H3 title="rotinas incompletas:" className="text-blue-400" />
              <P title={`${porcentagemTasksStatus(c?.id, false)}`} className="text-blue-300" />
            </div>
            <div className="my-3 w-full text-center">
              <Button onClick={() => setOpen((s) => (s !== c?.id ? c?.id : ""))} type="button" className="bg-white">
                <i className="text-blue-400">
                  <FontAwesomeIcon icon={!verificarOption({ categoriaID: c?.id }) ? faAngleDown : faAngleUp} />
                </i>
              </Button>
            </div>
            {verificarOption({ categoriaID: c?.id }) && (
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <label className="mr-3 flex flex-row items-center gap-2">
                  <H3 title="marcar todas como:" className="text-blue-400" />
                  <Button
                    onClick={() => categoriaMenuConcluida(c?.id)}
                    type="button"
                    className="flex flex-row items-center gap-2 bg-white !py-1"
                  >
                    <i className="text-blue-300">
                      <FontAwesomeIcon icon={faCheck} />
                    </i>
                    <P title="Concluidas" className="text-2xs text-blue-400" />
                  </Button>
                </label>
                <label className="mr-3 flex flex-row items-center gap-2">
                  <H3 title="marcar todas como:" className="text-blue-400" />
                  <Button
                    onClick={() => categoriaMenuIncompleta(c?.id)}
                    type="button"
                    className="flex flex-row items-center gap-2 bg-white !py-1"
                  >
                    <i className="text-blue-300">
                      <FontAwesomeIcon icon={faX} />
                    </i>
                    <P title="Incompletas" className="text-2xs text-blue-400" />
                  </Button>
                </label>
                <label className="mr-3 flex flex-row items-center gap-2">
                  <H3 title="marcar todas como:" className="text-blue-400" />
                  <Button
                    onClick={() => categoriaMenuRestaurar(c?.id)}
                    type="button"
                    className="flex flex-row items-center gap-2 bg-white !py-1"
                  >
                    <i className="text-blue-300">
                      <FontAwesomeIcon icon={faTrashCanArrowUp} />
                    </i>
                    <P title="Restaurar" className="text-2xs text-blue-400" />
                  </Button>
                </label>
                <label className="mr-3 flex flex-row items-center gap-2">
                  <H3 title="apagar todas:" className="text-blue-400" />
                  <Button
                    onClick={() => categoriaMenuDeletar(c?.id)}
                    type="button"
                    className="flex flex-row items-center gap-2 bg-white !py-1"
                  >
                    <i className="text-2xs text-blue-300">
                      <FontAwesomeIcon icon={faTrash} />
                    </i>
                    <P title="Apagar" className="text-2xs text-blue-400" />
                  </Button>
                </label>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
