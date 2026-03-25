import { FloatingPortal } from "@floating-ui/react";
import {
  faCheck,
  faEllipsisVertical,
  faTrash,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { Button } from "../../component/btn";
import { PopupOptionsTasks } from "../../component/FunctionTasks/PopupOptionTasks/PopupOptionsTasks";
import { P } from "../../component/paragrafo";
import { H3 } from "../../component/subTitle";
import { useMatchesTypeds } from "../../utils/FunctionUtils/FunctionUtils";
import { handle, type Handle } from "./controllers/handle";
import type { dataTasks, Task } from "./type.server";
import { parseAsString, useQueryStates } from "nuqs";
import { useFetcher } from "react-router";
import { usePosition } from "../../hooks/UseFloatingUI";
import { useState } from "react";
/*import { useFetcher } from "react-router";
import { usePosition } from "~/hooks/UseFloatingUI";
import type { updateTasks } from "./service/update.server";
import type { deleteTasks } from "./service/delete.server";*/

export function Tasks() {
  const matches = useMatchesTypeds<Handle, dataTasks>();
  const findHandle = matches.find((s) => s?.handle === handle);
  const data = findHandle?.loaderData.data;
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

  const [, setSearchParams] = useQueryStates(
    {
      renomear: parseAsString,
      detalhes: parseAsString,
    },
    {
      history: "push",
    },
  );

  console.log(data);

  return (
    <>
      {data?.data &&
        data.data.map((t: Task) => (
          <div className="" key={t.id}>
            <div className="mb-4 flex flex-col gap-4 overflow-hidden rounded-full bg-linear-to-r from-blue-50/60 p-3 select-none">
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
                            intent: "update",
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
                      className="min-h-5 min-w-6 cursor-pointer rounded-full bg-white text-center peer-checked:bg-blue-400"
                      whileTap={{ scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      aria-label={""}
                    >
                      <i className={"text-white"}>
                        <FontAwesomeIcon icon={faCheck} className={""} />
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
                    className="flex min-h-10 min-w-10 cursor-pointer items-center justify-center rounded-full bg-white text-blue-400 shadow-md shadow-blue-50 lg:hidden"
                    ref={(e) => {
                      return isPopup.itemId === t.id && isPopup.popup
                        ? refs.setReference(e)
                        : undefined;
                    }}
                    onClick={() =>
                      setPopup({ itemId: t.id, popup: !isPopup.popup })
                    }
                  >
                    <i>
                      <FontAwesomeIcon icon={faEllipsisVertical} />
                    </i>
                  </button>
                  <div className="flex flex-row items-center justify-center gap-2 max-md:hidden">
                    <Button
                      type="button"
                      className="min-h-9 min-w-9 p-0!"
                      onClick={() => setSearchParams({ renomear: t.id })}
                    >
                      <i>
                        <FontAwesomeIcon icon={faPen} />
                      </i>
                    </Button>
                    <Button
                      type="button"
                      className="min-h-9 min-w-9 p-0!"
                      onClick={() =>
                        fetcher.submit(
                          {
                            idTask: t.id,
                            intent: "delete",
                          },
                          {
                            method: "DELETE",
                            action: "/home",
                          },
                        )
                      }
                    >
                      <i>
                        <FontAwesomeIcon icon={faTrash} />
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
              <div className="mx-3 flex flex-row items-center justify-between">
                <div className="flex flex-row items-center justify-center gap-0.5 text-[10px]">
                  <H3
                    title="categoria:"
                    className="text-sm font-medium text-blue-400"
                  />
                  <P
                    title={
                      typeof t.category === "object"
                        ? t.category.title
                        : t.category
                    }
                    className="xs:max-2xs:w-8 3xs:max-4xs:w-14 truncate text-sm font-medium text-blue-300"
                  />
                </div>
                <div>
                  <Button
                    type="button"
                    className="px-3 pt-1 pb-1 text-base font-medium"
                    onClick={() => setSearchParams({ detalhes: t.id })}
                  >
                    <p className="text-white">Ver detalhes</p>
                  </Button>
                </div>
                <div className="flex flex-row items-center justify-center gap-0.5 text-[10px]">
                  <H3
                    title="Criada em:"
                    className="mr-1 text-sm font-medium text-blue-400"
                  />
                  <P
                    title={t.createAt}
                    className="text-sm font-medium text-blue-300"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}

/*
if (t.publicId === isPopup.publicId)
  refs.setReference(el);
}}
onClick={() =>
setIsPopup((s) => ({
  ...s,
  status: !s.status,
  publicId: t.publicId,
}))
}*/
