import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../../../component/btn";
import { Overlay } from "../../../component/overlay";
import { RotinaStore } from "../../../store/UseRotina";
import { useQueryStates, parseAsString, parseAsBoolean } from "nuqs";
import { useMemo } from "react";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { P } from "../../../component/paragrafo";
import { H3 } from "../../../component/subTitle";

export function DetalhesRotina() {
  const { tasks } = RotinaStore();
  const [isDetalhes, setDetalhe] = useQueryStates(
    {
      detalhes: parseAsString,
      modal: parseAsBoolean,
    },
    {
      history: "push",
    },
  );

  const { detalhes, modal } = isDetalhes;

  const buscarTask = useMemo(() => {
    return tasks.find((t) => t?.id === detalhes) ?? null;
  }, [tasks, detalhes]);

  function statusCondicionais({ key, value }) {
    switch (key) {
      case "status":
        return value ? "rotina completa" : "rotina incompleta";
      case "deletada":
        return value ? "rrotina já foi deletada" : "rotina nunca foi deletada";

      default:
        return value;
    }
  }

  function statusModal() {
    return detalhes && modal;
  }

  return (
    <>
      {statusModal() && (
        <Overlay initial={{ scale: 0.2, opacity: 0.3 }} animate={{ scale: 1, opacity: 1 }}>
          <div
            className={`absolute right-2 left-2 flex flex-col justify-center gap-2 rounded-[50px] p-5 shadow-2xl shadow-blue-50 ${buscarTask ? "bg-white" : ""}`}
          >
            {buscarTask ? (
              Object.entries(buscarTask).map(([key, value], i) => (
                <div key={key === "id" ? value : i} className="flex flex-row items-center gap-1 text-blue-400">
                  <H3 title={`${key.charAt(0).toLocaleUpperCase() + key.slice(1)}:`} />
                  <P
                    className="max-w-full truncate text-blue-300"
                    title={statusCondicionais({ key: key, value: value }) || "sem informações"}
                  />
                </div>
              ))
            ) : (
              <div className="mx-12 rounded-full bg-blue-50 p-1.5 shadow-sm shadow-blue-100">
                <p className="text-center text-base font-bold text-blue-300">sem tasks encontradas</p>
              </div>
            )}
            <div className="flex w-full items-center justify-center">
              <Button
                onClick={() =>
                  setTimeout(() => {
                    setDetalhe(null);
                  }, 300)
                }
                ariaLabel="Fechar"
                className="min-h-10 min-w-10 !p-0"
              >
                <i>
                  <FontAwesomeIcon icon={faX} />
                </i>
              </Button>
            </div>
          </div>
        </Overlay>
      )}
    </>
  );
}
