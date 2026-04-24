import { Button } from "../../component/btn";
import { H1 } from "../../component/title";
import { H3 } from "../../component/subTitle";
import { P } from "../../component/paragrafo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faCheck,
  faPen,
  faTrash,
  faX,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useFetcher, NavLink, useLocation } from "react-router";
import { useMatchesTypeds } from "../../utils/FunctionUtils/FunctionUtils";
import { handle, type HandleCategorias } from "./controllers/handle";
import type { dataCategorias, Category } from "./type.server";
import { useState } from "react";
import { usePosition } from "../../hooks/UseFloatingUI";
import { FloatingPortal } from "@floating-ui/react";
import { PopupOptionsCategorias } from "../../component/FunctionTasks/PopupOptionTasks/PopupOptionsCategorias";

export function InfoCategoria() {
  const matches = useMatchesTypeds<HandleCategorias, dataCategorias>();
  const findHandle = matches.find((s) => s?.handle?.id === handle.id);
  const data = findHandle?.loaderData;
  const navigate = useNavigate();
  const fetcher = useFetcher();
  const { pathname } = useLocation();

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

  if (pathname !== "/home/categorias") return null;

  return (
    <div className="h-full w-full">
      <div className="sticky top-0 z-40 mb-6 bg-white/80 py-4 px-2 backdrop-blur-md">
        <button
          onClick={() => navigate(-1)}
          className="flex w-min cursor-pointer flex-row items-center gap-2 rounded-full px-2 hover:bg-blue-50"
        >
          <FontAwesomeIcon icon={faAngleLeft} className="text-blue-400" size="lg" />
          <H1
            title="Informações Categorias"
            className="w-max text-blue-400"
          />
        </button>
      </div>
      <div className="h-full w-full pt-3">
        {data?.data && data.data.length ? (
          data.data.map((c: Category) => (
            <div
              key={c.id}
              className="mb-3 flex flex-col justify-center rounded-4xl border border-slate-100 bg-linear-to-r from-blue-50/60 p-3 select-none"
            >
              <div className="mx-3 flex flex-row justify-between">
                <div className="flex flex-col justify-center">
                  <div className="flex flex-col items-start">
                    <div className="flex flex-row items-center">
                      <H3
                        title="Titulo:"
                        className="text-base font-bold text-blue-400"
                      />
                      <P title={c.title} className={"text-blue-400"} />
                    </div>
                    <div className="flex flex-row items-center">
                      <H3
                        title="Descrição:"
                        className="text-base font-bold text-blue-400"
                      />
                      <P
                        title={c.description ?? "Ops, descrição não disponível"}
                        className="text-blue-300"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-row items-center justify-center gap-2">
                  {/* Botão de Opções para Mobile */}
                  <button
                    type="button"
                    aria-label="opções"
                    className="flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-full bg-white text-blue-400 shadow-md shadow-blue-50 md:hidden"
                    ref={(e) => {
                      return isPopup.itemId === c.id && isPopup.popup
                        ? refs.setReference(e)
                        : undefined;
                    }}
                    onClick={() =>
                      setPopup((s) => ({ itemId: c.id, popup: !s.popup }))
                    }
                  >
                    <i>
                      <FontAwesomeIcon icon={faEllipsisVertical} size="lg" />
                    </i>
                  </button>

                  {/* Botões de Ação para Desktop */}
                  <div className="flex flex-row items-center justify-center gap-2 max-md:hidden">
                    <div>
                      <Button
                        type="button"
                        className="aspect-square flex items-center justify-center min-h-11 min-w-11 p-0!"
                        onClick={() => navigate(`renomear/${c.id}`)}
                      >
                        <i>
                          <FontAwesomeIcon icon={faPen} size="lg" />
                        </i>
                      </Button>
                    </div>
                    <div>
                      <Button
                        type="button"
                        className="aspect-square flex items-center justify-center min-h-11 min-w-11 p-0!"
                        onClick={() =>
                          fetcher.submit(
                            {
                              idCategory: c.id,
                              intent: "delete-category-task-category",
                            },
                            {
                              method: "DELETE",
                              action: "/home/categorias",
                            },
                          )
                        }
                      >
                        <i>
                          <FontAwesomeIcon icon={faTrash} size="lg" />
                        </i>
                      </Button>
                    </div>
                    <div>
                      <Button
                        type="button"
                        className="aspect-square flex items-center justify-center min-h-11 min-w-11 p-0!"
                        onClick={() =>
                          fetcher.submit(
                            {
                              idCategory: c.id,
                              completed: "Concluída",
                              intent: "update-status-task-category",
                            },
                            {
                              method: "PATCH",
                              action: "/home/categorias",
                            },
                          )
                        }
                      >
                        <i>
                          <FontAwesomeIcon icon={faCheck} size="lg" />
                        </i>
                      </Button>
                    </div>
                    <div>
                      <Button
                        type="button"
                        className="aspect-square flex items-center justify-center min-h-11 min-w-11 p-0!"
                        onClick={() =>
                          fetcher.submit(
                            {
                              idCategory: c.id,
                              completed: "Incompleta",
                              intent: "update-status-task-category",
                            },
                            {
                              method: "PATCH",
                              action: "/home/categorias",
                            },
                          )
                        }
                      >
                        <i>
                          <FontAwesomeIcon icon={faX} size="lg" />
                        </i>
                      </Button>
                    </div>
                  </div>
                </div>

                {isPopup.popup && isPopup.itemId === c.id && (
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
                      <PopupOptionsCategorias id={c.id} />
                    </div>
                  </FloatingPortal>
                )}
              </div>

              <div className="w-full text-center hidden md:block mt-3">
                <Button
                  type="button"
                  className="text-base font-medium"
                  onClick={() => navigate(`detalhes-categoria/${c.id}`)}
                >
                  <p className="text-white">Ver detalhes</p>
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <P
              title="Ops, nenhuma categoria foi encontrada"
              className="text-blue-400"
            />
          </div>
        )}
      </div>
    </div>
  );
}
