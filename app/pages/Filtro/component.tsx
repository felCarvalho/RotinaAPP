import { useNavigate, useSearchParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faFilter,
  faCheck,
  faX,
} from "@fortawesome/free-solid-svg-icons";

import { Button } from "../../component/btn";
import { P } from "../../component/paragrafo";
import { H3 } from "../../component/subTitle";
import { H1 } from "../../component/title";

import {
  FILTER_STATUS_OPTIONS,
  FILTER_DATE_OPTIONS,
  SORT_DATE_OPTIONS,
} from "../../utils/constants/filters";

const PERIODO_MAP: Record<string, string> = {
  today: "hoje",
  week: "semana",
  month: "mes",
  all: "todos",
};

export default function FiltroPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const activePeriodo = searchParams.get("periodo") || "";

  const categories = [
    { id: "1", title: "Trabalho" },
    { id: "2", title: "Estudos" },
    { id: "3", title: "Saúde" },
    { id: "4", title: "Lazer" },
  ];

  const clearFilters = () => {
    setSearchParams({});
    navigate("/home");
  };

  const applyFilters = () => {
    navigate("/home");
  };

  return (
    <div className="h-full w-full bg-white">
      <div className="sticky top-0 z-40 mb-6 border-b border-blue-50/50 bg-white/95 px-2 py-4 backdrop-blur-md">
        <button
          onClick={() => navigate(-1)}
          className="flex w-min cursor-pointer flex-row items-center gap-2 rounded-full px-2 hover:bg-blue-50"
        >
          <FontAwesomeIcon
            icon={faAngleLeft}
            className="text-blue-400"
            size="lg"
          />
          <H1 title="Filtros" className="w-max text-blue-400" />
        </button>
      </div>

      <div className="flex flex-col gap-8 px-4 pb-20">
        <div className="flex items-center gap-3 text-blue-400">
          <FontAwesomeIcon icon={faFilter} size="lg" />
          <P
            title="Refine sua visualização de tarefas"
            className="text-blue-300"
          />
        </div>

        <section className="flex flex-col">
          <H3
            title="Status da Tarefa"
            className="mb-4 font-bold text-blue-900 opacity-70"
          />
          <div className="flex flex-wrap gap-2 p-2">
            {FILTER_STATUS_OPTIONS.map((opt) => (
              <Button
                key={opt.value}
                type="button"
                className="flex flex-row items-center gap-2 bg-blue-400 px-5 py-2.5 shadow-sm shadow-blue-100"
                onClick={() => {
                  const params = new URLSearchParams(searchParams);
                  if (opt.value === "all") {
                    params.delete("status");
                  } else {
                    params.set("status", opt.value);
                  }
                  setSearchParams(params);
                }}
              >
                <FontAwesomeIcon
                  icon={opt.icon}
                  className="text-xs text-white!"
                />
                <P
                  title={opt.title}
                  className="text-sm font-medium text-white!"
                />
              </Button>
            ))}
          </div>
          <P
            title="Esses filtros são os padrões que o app utiliza."
            className="mt-2 text-[10px] text-blue-300 italic opacity-60"
          />
        </section>

        <section className="flex flex-col">
          <H3
            title="Por Categoria"
            className="mb-4 font-bold text-blue-900 opacity-70"
          />
          <div className="scrollbar-hide flex max-h-48 flex-wrap gap-2 overflow-y-auto p-2">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                type="button"
                className="border-none bg-blue-400 px-5 py-2.5 shadow-sm shadow-blue-100"
              >
                <P
                  title={cat.title}
                  className="text-sm font-medium text-white!"
                />
              </Button>
            ))}
          </div>
          <P
            title="Esses filtros são os padrões que o app utiliza."
            className="mt-2 text-[10px] text-blue-300 italic opacity-60"
          />
        </section>

        <section className="flex flex-col">
          <H3
            title="Data de Criação"
            className="mb-4 font-bold text-blue-900 opacity-70"
          />
          <div className="flex flex-wrap gap-3 p-2">
            {FILTER_DATE_OPTIONS.map((opt) => {
              const periodoValue = PERIODO_MAP[opt.value];
              const isActive = activePeriodo === periodoValue;
              return (
                <Button
                  key={opt.value}
                  type="button"
                  className={`flex max-w-min! flex-row items-center justify-center gap-2 border-none px-5 py-3 shadow-sm shadow-blue-100 ${isActive ? "bg-blue-600" : "bg-blue-400"}`}
                  onClick={() => {
                    const params = new URLSearchParams(searchParams);
                    if (opt.value === "all") {
                      params.set("periodo", "todos");
                    } else {
                      params.set("periodo", periodoValue);
                    }
                    setSearchParams(params);
                  }}
                >
                  <P
                    title={opt.title}
                    className="text-sm font-medium whitespace-nowrap text-white!"
                  />
                </Button>
              );
            })}
          </div>
          <P
            title="Esses filtros são os padrões que o app utiliza."
            className="mt-2 text-[10px] text-blue-300 italic opacity-60"
          />
        </section>

        <section className="flex flex-col">
          <H3
            title="Ordenar lista por"
            className="mb-4 font-bold text-blue-900 opacity-70"
          />
          <div className="flex flex-wrap gap-2 p-2">
            {SORT_DATE_OPTIONS.map((opt) => (
              <Button
                key={opt.value}
                type="button"
                className="flex max-w-min! flex-row items-center gap-3 bg-blue-400 px-5 py-3 shadow-md shadow-blue-100"
              >
                <P
                  title={opt.title}
                  className="text-sm font-medium whitespace-nowrap text-white!"
                />
                <FontAwesomeIcon icon={opt.icon} className="text-white!" />
              </Button>
            ))}
          </div>
          <P
            title="Esses filtros são os padrões que o app utiliza."
            className="mt-2 text-[10px] text-blue-300 italic opacity-60"
          />
        </section>

        <div className="mt-6 flex flex-row items-center justify-center gap-4">
          <Button
            type="button"
            className="flex max-w-[180px] flex-1 flex-row items-center justify-center gap-2 bg-blue-400 shadow-md shadow-blue-100 hover:bg-blue-500"
            onClick={applyFilters}
          >
            <FontAwesomeIcon icon={faCheck} size="lg" className="text-white!" />
            <P
              title="Confirmar"
              className="font-semibold whitespace-nowrap text-white!"
            />
          </Button>

          <Button
            type="button"
            className="flex max-w-[180px] flex-1 flex-row items-center justify-center gap-2 bg-gray-400 shadow-md shadow-gray-100 hover:bg-gray-500"
            onClick={clearFilters}
          >
            <FontAwesomeIcon icon={faX} size="lg" className="text-white!" />
            <P
              title="Limpar"
              className="font-semibold whitespace-nowrap text-white!"
            />
          </Button>
        </div>
      </div>
    </div>
  );
}
