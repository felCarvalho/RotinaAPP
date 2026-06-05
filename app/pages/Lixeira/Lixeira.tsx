import { faAngleLeft, faP, faTrashCanArrowUp, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HeaderContent } from "../../component/headerContent";
import { P } from "../../component/paragrafo";
import { H3 } from "../../component/subTitle";
import { Button } from "../../component/btn";
import { motion } from "framer-motion";
import { useLoaderData, useFetcher } from "react-router";
import type { dataTasks, Task } from "../Tasks/type.server";
import { useEffect } from "react";
import { success, error as toastError } from "../../utils/FunctionUtils/FunctionUtils";

export function Lixeira() {
  const loaderData = useLoaderData<dataTasks | null>();
  const fetcher = useFetcher<dataTasks>();
  const deletedTasks = loaderData?.data ?? [];

  useEffect(() => {
    const notification = fetcher.data;
    if (!notification?.notification) return;

    const successMessage = notification.notification.find((s) => s.type === "INFO");
    const errorMessage = notification.notification.find((s) => s.type === "ERROR");

    if (successMessage) {
      success({ success: successMessage.message });
    }
    if (errorMessage) {
      toastError({ error: errorMessage.message });
    }
  }, [fetcher.data]);

  return (
    <div className="scrollbar-hide z-50 h-full w-full rounded-[50px] bg-blue-50 pb-5 shadow-sm shadow-blue-50">
      <HeaderContent
        iconClosed={faP}
        title="Lixeira"
        iconBack={faAngleLeft}
        btnClosed={undefined}
        classNameBtn="bg-white !text-blue-400"
        classNameBtnClosed="!min-w-0 !min-h-0 bg-transparent"
      />
      <div className="scrollbar-hide h-full overflow-auto rounded-t-[50px] pt-22">
        {deletedTasks.length > 0 ? (
          <div className="flex flex-col gap-3 px-4 pb-20">
            <P
              title="Tarefas deletadas recentemente. Você pode restaurá-las."
              className="mb-2 text-sm text-blue-500 italic"
            />
            {deletedTasks.map((t: Task) => (
              <motion.div
                key={t.id}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", duration: 0.4 }}
                className="flex flex-col gap-3 rounded-[25px] bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-row items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-row items-center gap-2">
                      <FontAwesomeIcon icon={faTrash} className="text-red-300" size="sm" />
                      <P title={t.title} className="text-blue-400" />
                    </div>
                    <div className="flex flex-row items-center gap-1">
                      <H3 title="Status:" className="text-xs text-blue-400/60" />
                      <P title={t.completed} className="text-xs text-blue-500" />
                    </div>
                    {typeof t.category === "object" && t.category && (
                      <div className="flex flex-row items-center gap-1">
                        <H3 title="Categoria:" className="text-xs text-blue-400/60" />
                        <P title={t.category.title} className="text-xs text-blue-500" />
                      </div>
                    )}
                  </div>
                  <Button
                    type="button"
                    className="flex aspect-square min-h-11 min-w-11 items-center justify-center bg-blue-400! p-0! shadow-sm shadow-blue-100"
                    onClick={() =>
                      fetcher.submit(
                        { intent: "restore-task", idTask: t.id },
                        { method: "POST", action: "/home/configuracoes/lixeira" },
                      )
                    }
                  >
                    <FontAwesomeIcon icon={faTrashCanArrowUp} size="lg" className="text-white" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex h-full items-center justify-center pt-20">
            <P
              title="Ops, não existe Rotinas deletadas aqui"
              className="text-blue-400"
            />
          </div>
        )}
      </div>
    </div>
  );
}
