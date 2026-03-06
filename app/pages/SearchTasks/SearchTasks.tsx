import { FloatingPortal } from "@floating-ui/react";
import {
  faAngleDown,
  faAngleUp,
  faCheck,
  faEllipsisVertical,
  faPen,
  faTrash,
  faTrashCanArrowUp,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Button } from "../../component/btn";
import { PopupOptionsTasks } from "../../component/FunctionTasks/PopupOptionTasks/PopupOptionsTasks";
import { P } from "../../component/paragrafo";
import { H3 } from "../../component/subTitle";
import { usePosition } from "../../hooks/UseFloatingUI";
import { parseAsBoolean, parseAsString, useQueryStates } from "nuqs";
import { faOrcid } from "@fortawesome/free-brands-svg-icons";

export function SearchTasks() {
  return (
    <AnimatePresence>
      <motion.div
        layoutId={""}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: "spring", duration: 0.4 }}
        key={""}
        className="mx-3 mb-4 flex flex-col items-start justify-between gap-4 overflow-hidden rounded-[25px] bg-linear-to-r from-blue-50/30 p-3 shadow-sm shadow-blue-50 select-none max-sm:flex-row max-sm:items-center"
      >
        <div className="flex flex-col items-start gap-3">
          <div>
            <H3 title="Informações sobre Rotinna" className="text-blue-400" />
          </div>
          <div>
            <div className="flex flex-row items-center gap-1">
              <H3 title="Rotina:" className="text-blue-400/80" />
              <P title={""} className={""} />
            </div>
            <div className="flex flex-row items-center gap-1">
              <H3
                title="Categoria:"
                className="max-w-min truncate text-blue-400/80"
              />
              <P title={""} className={""} />
            </div>
            <div className="flex flex-row items-center gap-1">
              <H3
                title="CategoriaID:"
                className="max-w-min truncate text-blue-400/80"
              />
              <P title={""} />
            </div>
            <div className="flex flex-row items-center gap-1">
              <H3 title="Status:" className="truncate text-blue-400/80" />
              <motion.p
                transition={{ type: "spring", stiffness: 200 }}
                className="font-medium text-blue-300/80"
              ></motion.p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <H3 title="Marcar como:" className="truncate text-blue-400/80" />
              <Button type="button" onClick={() => {}} className={""}>
                <i className={""}>
                  <FontAwesomeIcon icon={faOrcid} />
                </i>
                <P title={""} className={""} />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start">
          <button
            aria-label="opções"
            onClick={() => {}}
            className="flex min-h-10 min-w-10 cursor-pointer items-center justify-center rounded-full bg-white text-blue-400 shadow-md shadow-blue-50"
          >
            <i>
              <FontAwesomeIcon icon={faEllipsisVertical} />
            </i>
          </button>
        </div>

        <FloatingPortal>
          <div className="z-50 rounded-3xl bg-white p-3 shadow-2xs shadow-blue-50">
            <div onClick={() => {}}>
              <PopupOptionsTasks id={""} />
            </div>
          </div>
        </FloatingPortal>

        <div className="flex w-full flex-row items-center justify-center">
          <Button type="button" className="bg-white" onClick={() => {}}>
            <i className="text-blue-400">
              <FontAwesomeIcon icon={faAngleUp} />
            </i>
          </Button>
        </div>

        <div className="flex flex-col items-start justify-start">
          <div className="flex flex-row items-center gap-1.5">
            <H3
              title="Funções para Rotina"
              className="text-md! text-blue-400"
            />
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <label className="mr-3 flex flex-row items-center gap-2">
              <H3 title="Apagar rotina:" className="text-blue-400/80" />
              <Button
                onClick={() => {}}
                type="button"
                className="flex flex-row items-center gap-2 bg-white py-1!"
              >
                <i className="text-2xs text-blue-300">
                  <FontAwesomeIcon icon={faTrash} />
                </i>
                <P title="Apagar" className="text-2xs text-blue-400" />
              </Button>
            </label>
            <label className="mr-3 flex flex-row items-center gap-2">
              <H3 title="Restaurar rotina:" className="text-blue-400/80" />
              <Button
                onClick={() => {}}
                type="button"
                className="flex flex-row items-center gap-2 bg-white py-1!"
              >
                <i className="text-blue-300">
                  <FontAwesomeIcon icon={faTrashCanArrowUp} />
                </i>
                <P title="Restaurar" className="text-2xs text-blue-400" />
              </Button>
            </label>
            <label className="mr-3 flex flex-row items-center gap-2">
              <H3 title="Renomear rotina:" className="text-blue-400/80" />
              <Button
                onClick={() => {}}
                type="button"
                className="flex flex-row items-center gap-2 bg-white py-1!"
              >
                <i className="text-2xs text-blue-300">
                  <FontAwesomeIcon icon={faPen} />
                </i>
                <P title="renomear" className="text-2xs text-blue-400" />
              </Button>
            </label>
            <label className="mr-3 flex flex-row items-center gap-2">
              <H3 title="Ver detalhes:" className="text-blue-400/80" />
              <Button
                onClick={() => {}}
                type="button"
                className="flex flex-row items-center gap-2 bg-white py-1!"
              >
                <P title="Detalhes" className="text-2xs text-blue-400" />
              </Button>
            </label>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
/*
<div className="flex flex-row items-center gap-1">
  <H3 title="Marcar como:" className="text-blue-400" />
  <Button
    type="button"
    onClick={() => updateStatus({ id: t?.id })}
    className={`border border-blue-50 text-[13px] font-semibold ${!t?.status ? "bg-blue-400" : "bg-white"}`}
  >
    <p className={t?.status ? "text-xs text-blue-300" : "text-xs text-white"}>
      {t?.status ? "rotina incompleta" : "rotina concluída"}
    </p>
  </Button>
</div>*/

/*{
    <P
        title="Vamos lá, pesquise alguma Rotina!"
        className="mx-3 text-2xl! text-blue-400 shadow-blue-100 text-shadow-md!"
    />
}
*/
