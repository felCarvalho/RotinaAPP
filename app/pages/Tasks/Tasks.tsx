import { FloatingPortal } from "@floating-ui/react";
import {
  faCheck,
  faEllipsisVertical,
  faTrash,
  faPen,
  faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { Button } from "../../component/btn";
import { PopupOptionsTasks } from "../../component/FunctionTasks/PopupOptionTasks/PopupOptionsTasks";
import { P } from "../../component/paragrafo";
import { H3 } from "../../component/subTitle";
import { H1 } from "../../component/title";
import { useMatchesTypeds } from "../../utils/FunctionUtils/FunctionUtils";
import { handle, type HandleTasks } from "./controllers/handle";
import type { dataTasks, Task } from "./type.server";
import { useFetcher, useNavigate, NavLink } from "react-router";
import { usePosition } from "../../hooks/UseFloatingUI";
import { useState } from "react";

export function Tasks() {
  const matches = useMatchesTypeds<HandleTasks, dataTasks>();
  const findHandle = matches.find((s) => s?.handle === handle);
  const data = findHandle?.loaderData;
  const fetcher = useFetcher();
  const [isPopup, setPopup] = useState({
    popup: false,
    itemId: "",
  });
  const { refs, floatingStyles } = usePosition({
    offPlacement: "top-start",
    offSet: 10,
    offShift: {
      crossAxis: false,
    },
  });
  const navigate = useNavigate();

  return (
    <div className="h-full w-full">
      <div className="sticky top-0 z-40 mb-6 bg-white/80 py-4 px-2 backdrop-blur-md">
        <button
          onClick={() => navigate("/login")}
          className="flex w-min cursor-pointer flex-row items-center gap-2 rounded-full px-2 hover:bg-blue-50"
        >
          <FontAwesomeIcon
            icon={faAngleLeft}
            className="text-blue-400"
            size="lg"
          />
          <H1 title="Inicio" className="w-max text-blue-400" />
        </button>
      </div>
      {data?.data.length ? (
        data.data.map((t: Task) => (
          <div className="pt-3" key={t.id}>
            <div className="mb-4 flex flex-col gap-2 overflow-hidden rounded-3xl border border-slate-100 bg-linear-to-r from-blue-50/60 p-3 select-none">
              <div className="mx-3 flex flex-row items-center justify-between">
                <div className="flex flex-row items-center gap-2">
                  <div className="flex flex-row items-center">
                    <input
                      type="checkbox"
                      className="peer sr-only"
                      name="status"
                      id={t.id}
                      form="task-update-form"
                      defaultChecked={
                        t.completed === "Concluída" ? true : false
                      }
                      onChange={(e) =>
                        fetcher.submit(
                          {
                            completed: e.target.checked
                              ? "Concluída"
                              : "Incompleta",
                            idTask: t.id,
                            idUser: t.user,
                            intent: "update-task",
                          },
                          {
                            method: "PATCH",
                            action: "/home",
                          },
                        )
                      }
                    />
                    <motion.label
                      htmlFor={t.id}
                      className="flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-full bg-white text-center peer-checked:bg-blue-400"
                      whileTap={{ scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      aria-label={""}
                    >
                      <i className="text-white">
                        <FontAwesomeIcon icon={faCheck} size="lg" />
                      </i>
                    </motion.label>
                  </div>
                  <div>
                    <P title={t.title} className="text-blue-400" />
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    aria-label="opções"
                    className="flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-full bg-white text-blue-400 shadow-md shadow-blue-50 lg:hidden"
                    ref={(e) => {
                      return isPopup.itemId === t.id && isPopup.popup
                        ? refs.setReference(e)
                        : undefined;
                    }}
                    onClick={() =>
                      setPopup((s) => ({ itemId: t.id, popup: !s.popup }))
                    }
                  >
                    <i>
                      <FontAwesomeIcon icon={faEllipsisVertical} size="lg" />
                    </i>
                  </button>
                  <div className="flex flex-row items-center justify-center gap-2 max-md:hidden">
                    <Button
                      type="button"
                      className="flex aspect-square min-h-11 min-w-11 items-center justify-center p-0!"
                      onClick={() => navigate(`renomear/${t.id}`)}
                    >
                      <i>
                        <FontAwesomeIcon icon={faPen} size="lg" />
                      </i>
                    </Button>
                    <Button
                      type="button"
                      className="flex aspect-square min-h-11 min-w-11 items-center justify-center p-0!"
                      onClick={() =>
                        fetcher.submit(
                          {
                            idTask: t.id,
                            intent: "delete-task",
                          },
                          {
                            method: "DELETE",
                            action: "/home",
                          },
                        )
                      }
                    >
                      <i>
                        <FontAwesomeIcon icon={faTrash} size="lg" />
                      </i>
                    </Button>
                  </div>
                  {isPopup.popup && (
                    <FloatingPortal>
                      <div
                        style={{ ...floatingStyles }}
                        ref={refs.setFloating}
                        onClick={() =>
                          setPopup((s) => ({
                            ...s,
                            popup: !s.popup,
                            itemId: "",
                          }))
                        }
                        className="z-50 rounded-3xl bg-white p-3 shadow-2xs shadow-blue-50"
                      >
                        <span>
                          <PopupOptionsTasks id={t.id} />
                        </span>
                      </div>
                    </FloatingPortal>
                  )}
                </div>
              </div>
              <div className="mx-3 flex flex-row items-center justify-between gap-2 overflow-hidden">
                <div className="flex min-w-0 flex-1 flex-row items-center justify-start gap-1 text-base">
                  <H3
                    title="categoria:"
                    className="xs:block hidden shrink-0 font-medium text-blue-400"
                  />
                  <NavLink
                    to={`/home/info-categoria/${typeof t.category === "object" ? t.category.id : t.category}`}
                    className="truncate font-medium text-blue-300 hover:underline"
                  >
                    {typeof t.category === "object"
                      ? t.category.title
                      : t.category}
                  </NavLink>
                </div>

                <div className="hidden flex-1 items-center justify-center p-2 md:flex">
                  <Button
                    type="button"
                    className="font-medium"
                    onClick={() => navigate(`detalhes/${t.id}`)}
                  >
                    <p className="text-white">Ver detalhes</p>
                  </Button>
                </div>

                <div className="flex flex-1 flex-row items-center justify-end gap-1 text-base">
                  <H3
                    title="Criada em:"
                    className="hidden font-medium text-blue-400 sm:block"
                  />
                  <P title={t.createAt} className="font-medium text-blue-300" />
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <H3
            title="Ops, nenhuma tarefa foi encontrada!"
            className="text-blue-400"
          />
        </div>
      )}
    </div>
  );
}
