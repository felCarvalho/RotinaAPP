import { FloatingPortal } from "@floating-ui/react";
import {
  faAngleLeft,
  faAngleUp,
  faCheck,
  faEllipsisVertical,
  faPen,
  faTrash,
  faTrashCanArrowUp,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "../../component/btn";
import { PopupOptionsTasks } from "../../component/FunctionTasks/PopupOptionTasks/PopupOptionsTasks";
import { P } from "../../component/paragrafo";
import { H3 } from "../../component/subTitle";
import { usePosition } from "../../hooks/UseFloatingUI";
import {
  useFetcher,
  useLoaderData,
  useSearchParams,
  useNavigate,
} from "react-router";
import type { dataTasks, Task } from "../Tasks/type.server";
import { H1 } from "../../component/title";

export function SearchTasks() {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const data = useLoaderData<dataTasks>() ?? [];
  const [itemId, setItemId] = useState({
    item: "",
    status: false,
  });
  const [isPopup, setPopup] = useState({
    itemId: "",
    popup: false,
  });
  const { refs, floatingStyles } = usePosition({
    offPlacement: "top-start",
    offSet: 10,
    offShift: {
      crossAxis: false,
    },
  });

  return (
    <div className="flex h-full min-h-[calc(100vh-160px)] flex-col">
      <div className="sticky top-0 z-40 mb-6 bg-white/80 px-2 py-4 backdrop-blur-md">
        <button
          onClick={() => navigate(-1)}
          className="flex w-min cursor-pointer flex-row items-center gap-2 rounded-full px-2 hover:bg-blue-50"
        >
          <FontAwesomeIcon
            icon={faAngleLeft}
            size="lg"
            className="text-blue-400"
          />
          <H1 title="Pesquisar" className="w-max text-blue-400" />
        </button>
      </div>

      <div className="flex flex-1 flex-col">
        {data.data && data.data.length ? (
          data.data.map((t: Task) => (
            <motion.div
              layoutId={t.id}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", duration: 0.4 }}
              key={t.id}
              className="mt-3 flex flex-col items-start justify-between gap-4 overflow-hidden rounded-[25px] bg-linear-to-r from-blue-50/30 p-3 select-none max-sm:flex-row max-sm:items-center"
            >
              <div className="flex flex-col items-start gap-3">
                <div>
                  <div className="flex flex-row items-center gap-1">
                    <H3 title="Rotina:" className="text-blue-400" />
                    <P title={t.title} className="text-blue-300" />
                  </div>
                  <div className="flex flex-row items-center gap-1">
                    <H3
                      title="Categoria:"
                      className="max-w-min truncate text-blue-400/80"
                    />
                    <P
                      title={
                        typeof t.category === "object"
                          ? t.category.title
                          : "Ops, sem categoria"
                      }
                      className="text-blue-300"
                    />
                  </div>
                  <div className="flex flex-row items-center gap-1">
                    <H3 title="Status:" className="truncate text-blue-400/80" />
                    <P title={t.completed} className="text-blue-300" />
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <H3
                      title="Marcar como:"
                      className="truncate text-blue-400/80"
                    />
                    <Button
                      type="button"
                      onClick={() =>
                        fetcher.submit(
                          {
                            completed:
                              t.completed === "Concluída"
                                ? "Incompleta"
                                : "Concluída",
                            idTask: t.id,
                            intent: "update-task",
                          },
                          { method: "PATCH", action: "/home" },
                        )
                      }
                      className={`flex min-h-11 min-w-11 flex-row items-center justify-center gap-2 transition-colors ${
                        t.completed === "Concluída"
                          ? "border border-blue-400 bg-white! text-blue-400 shadow-xs"
                          : "bg-blue-400! text-white"
                      }`}
                    >
                      <i className={""}>
                        <FontAwesomeIcon
                          icon={t.completed === "Concluída" ? faX : faCheck}
                          size="lg"
                          className={
                            t.completed === "Concluída"
                              ? "text-blue-400"
                              : "text-white"
                          }
                        />
                      </i>
                      <P
                        title={
                          t.completed === "Concluída"
                            ? "Incompleta"
                            : "Concluída"
                        }
                        className={
                          t.completed === "Concluída"
                            ? "text-blue-400"
                            : "text-white"
                        }
                      />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start md:hidden">
                <button
                  type="button"
                  aria-label="opções"
                  ref={(el) => {
                    return isPopup.itemId === t.id && isPopup.popup
                      ? refs.setReference(el)
                      : undefined;
                  }}
                  onClick={() =>
                    setPopup((s) => ({ itemId: t.id, popup: !s.popup }))
                  }
                  className="flex aspect-square min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-full bg-white text-blue-400 shadow-md shadow-blue-50"
                >
                  <i>
                    <FontAwesomeIcon icon={faEllipsisVertical} size="lg" />
                  </i>
                </button>
              </div>
              {isPopup.popup && isPopup.itemId === t.id && (
                <FloatingPortal>
                  <div
                    ref={refs.setFloating}
                    style={{ ...floatingStyles }}
                    className="z-50 rounded-3xl bg-white p-3 shadow-2xs shadow-blue-50"
                  >
                    <div
                      onClick={() =>
                        setPopup((s) => ({ itemId: "", popup: !s.popup }))
                      }
                    >
                      <PopupOptionsTasks id={isPopup.itemId} />
                    </div>
                  </div>
                </FloatingPortal>
              )}
              <div className="flex w-full flex-row items-center justify-center">
                <Button
                  type="button"
                  className="flex aspect-square min-h-11 min-w-11 items-center justify-center bg-white p-0!"
                  onClick={() =>
                    setItemId((s) => ({
                      item: t.id,
                      status: !s.status,
                    }))
                  }
                >
                  <i className="text-blue-400">
                    <FontAwesomeIcon icon={faAngleUp} size="lg" />
                  </i>
                </Button>
              </div>
              {t.id === itemId.item && itemId.status && (
                <div className="flex flex-col items-start justify-start">
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <label className="mr-3 flex flex-row items-center gap-2">
                      <H3 title="Apagar rotina:" className="text-blue-400/80" />
                      <Button
                        onClick={() =>
                          fetcher.submit(
                            { intent: "delete-task", idTask: t.id },
                            { method: "PATCH", action: "/home" },
                          )
                        }
                        type="button"
                        className="flex aspect-square min-h-11 min-w-11 items-center justify-center bg-white p-0!"
                      >
                        <i className="text-blue-300">
                          <FontAwesomeIcon icon={faTrash} size="lg" />
                        </i>
                      </Button>
                    </label>
                    <label className="mr-3 flex flex-row items-center gap-2">
                      <H3
                        title="Restaurar rotina:"
                        className="text-blue-400/80"
                      />
                      <Button
                        onClick={() => {}}
                        type="button"
                        className="flex aspect-square min-h-11 min-w-11 items-center justify-center bg-white p-0!"
                      >
                        <i className="text-blue-300">
                          <FontAwesomeIcon icon={faTrashCanArrowUp} size="lg" />
                        </i>
                      </Button>
                    </label>
                    <label className="mr-3 flex flex-row items-center gap-2">
                      <H3
                        title="Renomear rotina:"
                        className="text-blue-400/80"
                      />
                      <Button
                        onClick={() =>
                          navigate({
                            pathname: `/home/renomear/${t.id}`,
                            search: params.toString(),
                          })
                        }
                        type="button"
                        className="flex aspect-square min-h-11 min-w-11 items-center justify-center bg-white p-0!"
                      >
                        <i className="text-blue-300">
                          <FontAwesomeIcon icon={faPen} size="lg" />
                        </i>
                      </Button>
                    </label>
                    <label className="mr-3 flex flex-row items-center gap-2">
                      <H3 title="Ver detalhes:" className="text-blue-400/80" />
                      <Button
                        onClick={() =>
                          navigate({
                            pathname: `/home/detalhes/${t.id}`,
                            search: params.toString(),
                          })
                        }
                        type="button"
                        className="flex min-h-11 min-w-11 items-center justify-center bg-white px-4"
                      >
                        <P title="Detalhes" className="text-blue-400" />
                      </Button>
                    </label>
                  </div>
                </div>
              )}
            </motion.div>
          ))
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center pb-20">
            <P
              title="Nenhuma rotina foi encontrada"
              className="text-xl font-medium text-blue-400"
            />
          </div>
        )}
      </div>
    </div>
  );
}
