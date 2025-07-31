import { Button } from "../../component/btn";
import { Input } from "../../component/input";
import { Overlay } from "../../component/overlay";
import { HeaderContent } from "../../component/headerContent";
import { RotinaStore } from "../../store/UseRotina";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { useQueryStates, parseAsString, parseAsBoolean } from "nuqs";
import { useCallback, useEffect, useMemo, useState } from "react";

export function Renomear() {
  const { tasks, renomearTask } = RotinaStore();
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
  const [value, setValue] = useState({ renomear: "" });

  const buscarTask = useMemo(() => {
    return tasks.find((t) => t?.id === renomear) ?? null;
  }, [tasks, renomear]);

  function Handle(e) {
    const { name, value } = e.target;

    setValue((p) => ({
      ...p,
      [name]: value,
    }));
  }

  function verificarRenoemar({ value }) {
    return !value?.renomear.trim();
  }

  useEffect(() => {
    if (buscarTask) {
      setValue((p) => ({
        ...p,
        renomear: buscarTask?.rotina,
      }));
    }
  }, [buscarTask]);

  function onSubmit(e) {
    e.preventDefault();

    if (verificarRenoemar({ value: value })) {
      return;
    }

    renomearTask({ id: renomear, task: value?.renomear });
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
              title="Renomear Rotina"
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
                <Input name="renomear" placeholder="renomear rotina..." value={value?.renomear} onChange={Handle} />
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
