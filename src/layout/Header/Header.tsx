import { Button } from "../../component/btn";
import { H1 } from "../../component/title";
import { DropdownFilterCategorias } from "../../component/Filtros/FiltroCategorias/FilterCategorias";
import { DropdownFilterStatus } from "../../component/Filtros/FiltroStatus/FilterStatus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faFilter, faGear, faPlus, faX, faBars } from "@fortawesome/free-solid-svg-icons";
import { useResizeView } from "../../hooks/UseResizeView";
import { TelasStore } from "../../store/UseTelasFixos";
import { RotinaStore } from "../../store/UseRotina";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";

export function Header() {
  const { verificarWidth } = useResizeView();
  const { setClearFilterBasico, tasks } = RotinaStore();
  const { openID } = TelasStore();
  const [filterMobile, setFilterMobile] = useState({
    isMobile: false,
    selectionFilter: true,
    categorias: false,
    status: false,
  });

  const { pathname } = useLocation();
  const navigate = useNavigate();

  function verificarLengthTasks() {
    return tasks.length !== 0;
  }

  return (
    <header className="fixed right-2 left-2 z-50 rounded-b-3xl bg-gradient-to-r from-blue-50 px-2 shadow-2xl shadow-white backdrop-blur-3xl">
      <div className="flex flex-col">
        <div className="flex flex-row items-center justify-between pt-5 pb-2.5">
          {!verificarWidth({ largura: 800 }) && (
            <Button
              onClick={() => openID({ name: "menu-h-mobile", id: 300, status: true })}
              className="min-h-10 min-w-10 !p-0"
              ariaLabel="Menu-rápido"
              type="button"
            >
              <i className="text-lg">
                <FontAwesomeIcon icon={faBars} />
              </i>
            </Button>
          )}
          <H1 title="Minha Rotina" className="text-blue-400" />

          <Button
            type="button"
            className="min-h-10 min-w-10 !p-0"
            ariaLabel="Configurações"
            onClick={() => navigate("/inicio/configuracoes")}
          >
            <i className="text-lg">
              <FontAwesomeIcon icon={faGear} />
            </i>
          </Button>
        </div>
        <div className="flex flex-row justify-between py-2.5">
          <Button
            type="button"
            onClick={() => openID({ name: "create-rotina", id: 100, status: true })}
            className="flex flex-row items-center gap-2 font-medium"
          >
            <i>
              <FontAwesomeIcon icon={faPlus} />
            </i>
            <p className={!verificarWidth({ largura: 360 }) ? "w-12 truncate" : ""}>Adicionar Rotina</p>
          </Button>
          <div className="flex flex-row items-center justify-center gap-2">
            {pathname !== "/inicio/buscar" && (
              <Button
                type="button"
                onClick={() => {
                  setFilterMobile((s) => ({
                    ...s,
                    isMobile: true,
                  }));
                }}
                className="flex flex-row items-center gap-2 bg-white font-medium"
              >
                <i className="text-blue-400">
                  <FontAwesomeIcon icon={faFilter} />
                </i>
                <p className="text-blue-400">Filtro</p>
              </Button>
            )}
            {verificarLengthTasks() && filterMobile?.isMobile && (
              <div className="absolute top-24 right-20 left-20 z-50 flex h-40 flex-col justify-start rounded-3xl bg-white shadow-2xl shadow-blue-50">
                <div className="p-2">
                  {filterMobile?.selectionFilter && (
                    <div className="relative flex flex-col items-start gap-2">
                      <Button
                        type="button"
                        onClick={() => {
                          setFilterMobile((s) => ({
                            ...s,
                            categorias: true,
                            selectionFilter: false,
                          }));
                        }}
                        className="w-full bg-white font-medium shadow-sm shadow-blue-50 active:bg-blue-50"
                      >
                        <p className="w-full text-left text-blue-400">Categorias</p>
                      </Button>
                      <Button
                        type="button"
                        onClick={() => {
                          setFilterMobile((s) => ({
                            ...s,
                            status: true,
                            selectionFilter: false,
                          }));
                        }}
                        className="w-full bg-white px-3 font-medium shadow-sm shadow-blue-50 active:bg-blue-50"
                      >
                        <p className="text-left text-blue-400">Status</p>
                      </Button>
                    </div>
                  )}
                  {filterMobile?.categorias && (
                    <div className="scrollbar-hide absolute top-0 right-0 bottom-14 left-0 overflow-auto rounded-3xl">
                      <DropdownFilterCategorias />
                    </div>
                  )}
                  {filterMobile?.status && (
                    <div>
                      <DropdownFilterStatus />
                    </div>
                  )}
                  <div className="absolute right-0 bottom-0 left-0 flex flex-row items-center justify-between rounded-b-3xl p-2 backdrop-blur-xl">
                    <Button
                      type="button"
                      onClick={() => {
                        setFilterMobile((s) => ({
                          ...s,
                          categorias: false,
                          status: false,
                          selectionFilter: true,
                          isMobile: s.categorias || s.status,
                        }));
                      }}
                      className="flex min-h-9 min-w-9 items-center justify-center !p-0"
                      ariaLabel="Voltar"
                    >
                      <i>
                        <FontAwesomeIcon icon={faAngleLeft} />
                      </i>
                    </Button>
                    <Button
                      type="button"
                      onClick={() => {
                        setFilterMobile((s) => ({
                          ...s,
                          categorias: false,
                          status: false,
                          selectionFilter: true,
                          isMobile: false,
                        }));
                      }}
                      className="flex min-h-9 min-w-9 items-center justify-center !p-0"
                      ariaLabel="Fechar"
                    >
                      <i>
                        <FontAwesomeIcon icon={faX} />
                      </i>
                    </Button>
                  </div>
                </div>
              </div>
            )}
            <Button type="button" onClick={() => setClearFilterBasico()} className="bg-white font-medium text-blue-400">
              <p className="text-blue-400">Limpar</p>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
