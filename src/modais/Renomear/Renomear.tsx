import { faAngleLeft, faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { parseAsBoolean, parseAsString, useQueryStates } from "nuqs";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../../component/btn";
import { HeaderContent } from "../../component/headerContent";
import { Input } from "../../component/input";
import { Overlay } from "../../component/overlay";
import { useGeneratorUUID } from "../../hooks/UseGeneratorID";
import { RotinaStore } from "../../store/UseRotina";

interface tarefa {
  rotina: string;
  descricao: string;
  id: string;
  idUser: string;
  status: boolean;
  deletada: boolean;
  categoriaID: string;
  data: string;
}

interface dataCategoria {
  categoria: string;
  id: string;
  idUser: string;
}

enum typeRenomear {
  typeCategory = "categoria",
  typeTasks = "rotina",
}

interface typeRenomearValue {
  tipo: string;
  value: string;
}

export function Renomear() {
  const { buscarIdUserTask, buscarIdUserCategoria, renomearTask, renomearCategoria, data } = RotinaStore();
  const [query, setQuery] = useQueryStates(
    {
      renomear: parseAsString,
      modal: parseAsBoolean,
    },
    {
      history: "push",
    },
  );
  const { renomear, modal } = query;
  const [valueRenomear, setValueRenomear] = useState<typeRenomearValue>({
    tipo: "",
    value: "",
  });
  const generatorID = useGeneratorUUID();

  const verificarIdTasks = useCallback(() => {
    return buscarIdUserTask().some((s) => s?.id === renomear);
  }, [buscarIdUserTask, renomear]);

  const verificarIdCategoria = useCallback(() => {
    return buscarIdUserCategoria().some((s) => s?.id === renomear);
  }, [buscarIdUserCategoria, renomear]);

  const buscandoIdTasks = useCallback(
    ({ tasks }: { tasks: tarefa[] }) => {
      if (verificarIdTasks()) {
        const buscarTasksID: string | null = tasks.find((t) => t?.id === renomear)?.rotina ?? null;

        return buscarTasksID ?? null;
      }

      return null;
    },
    [verificarIdTasks],
  );

  const buscandoIdCategoria = useCallback(
    ({ categoria }: { categoria: dataCategoria[] }) => {
      if (verificarIdCategoria()) {
        const buscarCategoriaID: string | null = categoria.find((t) => t?.id === renomear)?.categoria ?? null;

        return buscarCategoriaID ?? null;
      }

      return null;
    },
    [verificarIdCategoria],
  );

  function verificarRenoemar({ value, id }: { value: string; id: string | null }) {
    if (!value.trim() || !id) {
      return false;
    }

    return { value, id };
  }

  useEffect(() => {
    const categoriaID = buscandoIdCategoria({ categoria: buscarIdUserCategoria() });
    const tasksID = buscandoIdTasks({ tasks: buscarIdUserTask() });

    if (categoriaID) {
      setValueRenomear((s) => ({
        ...s,
        value: categoriaID,
        tipo: typeRenomear?.typeCategory,
      }));
      return;
    }

    if (tasksID) {
      setValueRenomear((s) => ({
        ...s,
        value: tasksID,
        tipo: typeRenomear?.typeTasks,
      }));
      return;
    }
  }, [buscandoIdCategoria, buscandoIdTasks, renomear, buscarIdUserTask, buscarIdUserCategoria, setValueRenomear]);

  function titleRenomear() {
    switch (valueRenomear?.tipo) {
      case typeRenomear?.typeCategory:
        return "Renomear categoria";
      case typeRenomear?.typeTasks:
        return "Renomear rotina";

      default:
        return "Ops, feche o modal e abra de novo";
    }
  }

  function Handle(e: React.ChangeEvent<HTMLInputElement>) {
    setValueRenomear((s) => ({
      ...s,
      value: e.target.value,
    }));
  }

  function onSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    const validar = verificarRenoemar({ value: valueRenomear?.value, id: renomear });

    if (!validar) {
      return;
    }

    const categoriaID = generatorID({ prefixo: "@category", sufixo: `@${valueRenomear?.value}` });

    if (valueRenomear?.tipo === typeRenomear?.typeTasks) renomearTask({ task: validar?.value, id: validar?.id });
    if (valueRenomear?.tipo === typeRenomear?.typeCategory)
      renomearCategoria({ newNameCategoria: validar?.value, id: validar?.id, newId: categoriaID });
    setTimeout(() => {
      setQuery(null);
    }, 300);
  }

  const statusModal = useCallback(() => {
    return renomear && modal;
  }, [renomear, modal]);

  return (
    <>
      {statusModal() && (
        <Overlay initial={{ scale: 0.2, opacity: 0.3 }} animate={{ scale: 1, opacity: 1 }}>
          <div className="absolute right-2 left-2 rounded-[50px] bg-white shadow-2xl shadow-blue-100">
            <HeaderContent
              title={`${titleRenomear()}`}
              iconBack={faAngleLeft}
              iconClosed={faX}
              btnBack={() =>
                setTimeout(() => {
                  setQuery(null);
                }, 300)
              }
              btnClosed={() =>
                setTimeout(() => {
                  setQuery(null);
                }, 300)
              }
              classNameHeaderDiv="!backdrop-blur-none"
            />
            <form className="mt-20 px-5" onSubmit={onSubmit}>
              <label className="flex flex-col gap-1">
                <p className="text-base text-blue-400">Renomear:</p>
                <Input
                  type="text"
                  name="renomear"
                  placeholder="renomear rotina..."
                  value={valueRenomear?.value}
                  onChange={Handle}
                  autoFocus
                />
              </label>
              <div className="mt-10 mb-5 flex flex-row items-center justify-center gap-5">
                <Button type="submit" className="flex flex-row justify-start gap-2 bg-blue-400 font-medium">
                  <p>Confirmar</p>
                  <i>
                    <FontAwesomeIcon icon={faCheck} />
                  </i>
                </Button>
                <Button
                  type="reset"
                  onClick={() =>
                    setTimeout(() => {
                      setQuery(null);
                    }, 300)
                  }
                  className="flex flex-row justify-start gap-2 bg-gray-400 font-medium"
                >
                  <p>Cancelar</p>
                  <i>
                    <FontAwesomeIcon icon={faX} />
                  </i>
                </Button>
              </div>
            </form>
          </div>
        </Overlay>
      )}
    </>
  );
}
