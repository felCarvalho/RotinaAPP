import { FloatingPortal } from "@floating-ui/react";
import {
  faCheck,
  faEllipsisVertical,
  faTrash,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "../../component/btn";
import { PopupOptionsTasks } from "../../component/FunctionTasks/PopupOptionTasks/PopupOptionsTasks";
import { P } from "../../component/paragrafo";
import { H3 } from "../../component/subTitle";
import { useMatchesTypeds } from "../../utils/FunctionUtils/FunctionUtils";
import type { Handle } from "./controllers/handle";
import type { dataTasks } from "./type.server";
import { useFetcher } from "react-router";
import { usePosition } from "~/hooks/UseFloatingUI";
import { parseAsString, useQueryStates } from "nuqs";
import type { updateTasks } from "./service/update.server";
import type { deleteTasks } from "./service/delete.server";

export function Tasks() {
  const matches = useMatchesTypeds<Handle, dataTasks>();
  const findHandle = matches.find((s) => s?.handle);

  console.log(findHandle);

  return (
    <>
      <div className="h-full pt-36">
        <div
          key={""}
          className="mx-3 mb-4 flex flex-col gap-4 overflow-hidden rounded-full bg-linear-to-r from-blue-50/60 p-3 select-none"
        >
          <div className="mx-3 flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-2">
              <div className="flex flex-row items-center">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  name="status"
                  id={""}
                  checked={true}
                  onChange={() => {}}
                />
                <motion.label
                  htmlFor={""}
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
                <P title={""} className="text-blue-400" />
              </div>
            </div>
            <div>
              <button
                type="button"
                aria-label="opções"
                ref={(el) => {
                  /*
                                                                            if (t.publicId === isPopup.publicId) refs.setReference(el);
                                                                          }}
                                                                          onClick={() =>
                                                                            setIsPopup((s) => ({
                                                                              ...s,
                                                                              status: !s.status,
                                                                              publicId: t.publicId,
                                                                            }))*/
                }}
                className="flex min-h-10 lg:hidden min-w-10 cursor-pointer items-center justify-center rounded-full bg-white text-blue-400 shadow-md shadow-blue-50"
              >
                <i>
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </i>
              </button>
              <div className="flex flex-row items-center justify-center gap-2">
                <Button
                  type="button"
                  onClick={() => {}}
                  className="min-h-9 min-w-9 p-0!"
                >
                  <i>
                    <FontAwesomeIcon icon={faPen} />
                  </i>
                </Button>
                <Button
                  type="button"
                  onClick={() => {}}
                  className=" min-h-9 min-w-9 p-0!"
                >
                  <i>
                    <FontAwesomeIcon icon={faTrash} />
                  </i>
                </Button>
              </div>

              <FloatingPortal>
                <div className="z-50 rounded-3xl bg-white p-3 shadow-2xs shadow-blue-50">
                  <span onClick={() => {}}>
                    <PopupOptionsTasks id={""} />
                  </span>
                </div>
              </FloatingPortal>
            </div>
          </div>
          <div className="mx-3 flex flex-row items-center justify-between">
            <div className="flex flex-row items-center justify-center gap-0.5 text-[10px]">
              <H3
                title="categoria:"
                className="text-sm font-medium text-blue-400"
              />
              <P
                title={""}
                className="xs:max-2xs:w-8 3xs:max-4xs:w-14 truncate text-sm font-medium text-blue-300"
              />
            </div>
            <div>
              <Button
                type="button"
                onClick={() => {}}
                className="px-3 pt-1 pb-1 text-base font-medium"
              >
                <p className="text-white">Ver detalhes</p>
              </Button>
            </div>
            <div className="flex flex-row items-center justify-center gap-0.5 text-[10px]">
              <H3
                title="categoria"
                className="text-sm font-medium text-blue-400"
              />
              <P
                title="20/05/1025"
                className="text-sm font-medium text-blue-300"
              />
            </div>
          </div>
        </div>
        <div className="my-10 p-2 text-center">
          <P
            title="Nenhuma Rotina encontrada!"
            className="mx-3 text-2xl! text-blue-400 shadow-blue-100 text-shadow-md!"
          />
        </div>
      </div>
    </>
  );
}
