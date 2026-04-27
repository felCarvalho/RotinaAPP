import { useNavigate } from "react-router";
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

// Importação das Constantes
import { 
  FILTER_STATUS_OPTIONS, 
  FILTER_DATE_OPTIONS, 
  SORT_DATE_OPTIONS 
} from "../../utils/constants/filters";

export default function FiltroPage() {
  const navigate = useNavigate();

  // Categorias temporárias para visualização
  const categories = [
    { id: "1", title: "Trabalho" },
    { id: "2", title: "Estudos" },
    { id: "3", title: "Saúde" },
    { id: "4", title: "Lazer" }
  ];

  return (
    <div className="h-full w-full bg-white">
      {/* Cabeçalho padrão do App */}
      <div className="sticky top-0 z-40 mb-6 bg-white/95 py-4 px-2 backdrop-blur-md border-b border-blue-50/50">
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
          <P title="Refine sua visualização de tarefas" className="text-blue-300" />
        </div>

        {/* Seção: Status */}
        <section className="flex flex-col">
          <H3 title="Status da Tarefa" className="mb-4 text-blue-900 font-bold opacity-70" />
          <div className="flex flex-wrap gap-2 p-2">
            {FILTER_STATUS_OPTIONS.map((opt) => (
              <Button
                key={opt.value}
                type="button"
                className="flex flex-row items-center gap-2 bg-blue-400 py-2.5 px-5 shadow-sm shadow-blue-100"
              >
                <FontAwesomeIcon icon={opt.icon} className="text-xs text-white!" />
                <P title={opt.title} className="text-sm font-medium text-white!" />
              </Button>
            ))}
          </div>
          <P title="Esses filtros são os padrões que o app utiliza." className="mt-2 text-[10px] italic text-blue-300 opacity-60" />
        </section>

        {/* Seção: Categorias */}
        <section className="flex flex-col">
          <H3 title="Por Categoria" className="mb-4 text-blue-900 font-bold opacity-70" />
          <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto scrollbar-hide p-2">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                type="button"
                className="bg-blue-400 border-none py-2.5 px-5 shadow-sm shadow-blue-100"
              >
                <P title={cat.title} className="text-sm font-medium text-white!" />
              </Button>
            ))}
          </div>
          <P title="Esses filtros são os padrões que o app utiliza." className="mt-2 text-[10px] italic text-blue-300 opacity-60" />
        </section>

        {/* Seção: Datas */}
        <section className="flex flex-col">
          <H3 title="Data de Criação" className="mb-4 text-blue-900 font-bold opacity-70" />
          <div className="flex flex-wrap gap-3 p-2">
            {FILTER_DATE_OPTIONS.map((opt) => (
              <Button
                key={opt.value}
                type="button"
                className="max-w-min! flex flex-row items-center justify-center gap-2 bg-blue-400 border-none py-3 px-5 shadow-sm shadow-blue-100"
              >
                <P title={opt.title} className="text-sm font-medium text-white! whitespace-nowrap" />
              </Button>
            ))}
          </div>
          <P title="Esses filtros são os padrões que o app utiliza." className="mt-2 text-[10px] italic text-blue-300 opacity-60" />
        </section>

        {/* Seção: Ordenação */}
        <section className="flex flex-col">
          <H3 title="Ordenar lista por" className="mb-4 text-blue-900 font-bold opacity-70" />
          <div className="flex flex-wrap gap-2 p-2">
            {SORT_DATE_OPTIONS.map((opt) => (
              <Button
                key={opt.value}
                type="button"
                className="max-w-min! flex flex-row items-center gap-3 bg-blue-400 py-3 px-5 shadow-md shadow-blue-100"
              >
                <P title={opt.title} className="text-sm font-medium text-white! whitespace-nowrap" />
                <FontAwesomeIcon icon={opt.icon} className="text-white!" />
              </Button>
            ))}
          </div>
          <P title="Esses filtros são os padrões que o app utiliza." className="mt-2 text-[10px] italic text-blue-300 opacity-60" />
        </section>

        {/* Botões de Ação no Rodapé */}
        <div className="mt-6 flex flex-row items-center justify-center gap-4">
          <Button
            type="button"
            className="flex-1 max-w-[180px] flex flex-row items-center justify-center gap-2 bg-blue-400 shadow-md shadow-blue-100 hover:bg-blue-500"
            onClick={() => navigate("/home")}
          >
            <FontAwesomeIcon icon={faCheck} size="lg" className="text-white!" />
            <P title="Confirmar" className="font-semibold text-white! whitespace-nowrap" />
          </Button>

          <Button
            type="button"
            className="flex-1 max-w-[180px] flex flex-row items-center justify-center gap-2 bg-gray-400 shadow-md shadow-gray-100 hover:bg-gray-500"
            onClick={() => navigate("/home")}
          >
            <FontAwesomeIcon icon={faX} size="lg" className="text-white!" />
            <P title="Limpar" className="font-semibold text-white! whitespace-nowrap" />
          </Button>
        </div>
      </div>
    </div>
  );
}
