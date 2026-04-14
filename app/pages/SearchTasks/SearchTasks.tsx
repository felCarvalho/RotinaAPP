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
  NavLink,
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
    <div className="">
      <div className="">
        <NavLink
          to="/home"
          className="flex w-min flex-row items-center gap-2 rounded-full px-2 hover:bg-blue-50"
        >
          <FontAwesomeIcon icon={faAngleLeft} className="text-blue-400" />
          <H1 title="Pesquisar" className="w-max text-lg! text-blue-400" />
        </NavLink>
      </div>
      {data.data ? (
        data.data.map((t: Task) => (
          <motion.div
            layoutId={t.id}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", duration: 0.4 }}
            key={t.id}
            className="mt-3 flex flex-col items-start justify-between gap-4 overflow-hidden rounded-[25px] bg-linear-to-r from-blue-50/30 p-3 shadow-sm shadow-blue-50 select-none max-sm:flex-row max-sm:items-center"
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
                    className="flex flex-row items-center justify-center bg-blue-400! px-3! py-1!"
                  >
                    <i className={""}>
                      <FontAwesomeIcon
                        icon={t.completed === "Concluída" ? faX : faCheck}
                      />
                    </i>
                    <P
                      title={
                        t.completed === "Concluída" ? "Incompleta" : "Concluída"
                      }
                    />
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start md:hidden">
              <button
                aria-label="opções"
                ref={(el) => {
                  return isPopup.itemId === t.id && isPopup.popup
                    ? refs.setReference(el)
                    : undefined;
                }}
                onClick={() =>
                  setPopup((s) => ({ itemId: t.id, popup: !s.popup }))
                }
                className="flex min-h-10 min-w-10 cursor-pointer items-center justify-center rounded-full bg-white text-blue-400 shadow-md shadow-blue-50"
              >
                <i>
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </i>
              </button>
            </div>
            {isPopup.popup && (
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
                className="min-h-11 min-w-11 bg-white"
                onClick={() =>
                  setItemId((s) => ({
                    item: t.id,
                    status: !s.status,
                  }))
                }
              >
                <i className="text-blue-400">
                  <FontAwesomeIcon icon={faAngleUp} />
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
                      className="flex flex-row items-center gap-2 bg-white py-1!"
                    >
                      <i className="text-2xs text-blue-300">
                        <FontAwesomeIcon icon={faTrash} />
                      </i>
                      <P title="Apagar" className="text-2xs text-blue-400" />
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
                      onClick={() =>
                        navigate({
                          pathname: `/home/renomear/${t.id}`,
                          search: params.toString(),
                        })
                      }
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
                      onClick={() =>
                        navigate({
                          pathname: `/home/detalhes/${t.id}`,
                          search: params.toString(),
                        })
                      }
                      type="button"
                      className="flex flex-row items-center gap-2 bg-white py-1!"
                    >
                      <P title="Detalhes" className="text-2xs text-blue-400" />
                    </Button>
                  </label>
                </div>
              </div>
            )}
          </motion.div>
        ))
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <P
            title="Nenhuma rotina foi encontrada"
            className="text-lg! text-blue-400"
          />
        </div>
      )}
    </div>
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
