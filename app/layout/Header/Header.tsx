import { useNavigate } from "react-router";
import { Nav } from "../../component/Nav/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faClipboardCheck,
  faFilter,
  faGear,
  faHome,
  faLayerGroup,
  faPenToSquare,
  faPlus,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export function Header() {
  const navigate = useNavigate();
  const [openBar, setOpenBar] = useState<string>("");
  const navLinks = [
    {
      title: "Inicio",
      link: "home",
      icon: faHome,
    },
    {
      title: "Categorias",
      link: "home/categorias",
      icon: faLayerGroup,
    },
    {
      title: "Buscar",
      link: "home/buscar",
      icon: faSearch,
    },
    {
      title: "Configurações",
      link: "home/configuracoes",
      icon: faGear,
    },
    {
      title: "Filtro",
      link: "home/filtros",
      icon: faFilter,
    },
    {
      title: "Adicionar Tarefa",
      link: "home/adicionar-tarefa",
      icon: faCheck,
    },
    {
      title: "Adicionar Categoria",
      link: "home/adicionar-categoria",
      icon: faPlus,
    },
    {
      title: "Rascunhos",
      link: "home/rascunhos",
      icon: faClipboardCheck,
    },
    {
      title: "Criar Rotina",
      link: "home/criar-rotina",
      icon: faPenToSquare,
    },
  ];

  return (
    <div
      className={`sticky top-0 z-50 h-screen shrink-0 overflow-y-auto transition-all ${openBar ? "justify-startw-full flex flex-col items-end" : "flex flex-col items-center justify-start"} gap-5 bg-blue-50/30 px-4 py-5`}
    >
      <div
        className="flex h-5 w-7 flex-row-reverse rounded-[5px] border border-blue-400 bg-white shadow-2xl shadow-blue-400"
        onClick={() =>
          setOpenBar((s) => (s.trim() ? "" : "mr-2.5 animate-pulse "))
        }
      >
        <div
          className={`${openBar} h-4.5 w-4.5 rounded-[5px] bg-blue-400`}
        ></div>
      </div>
      {navLinks.map((s) => (
        <div className={openBar.trim() ? "w-60" : "w-full"}>
          <div
            className="flex flex-row items-center rounded-2xl border-b border-b-blue-100 p-2 hover:bg-white"
            onClick={() => navigate(s.link)}
          >
            <i className="text-blue-400">
              <FontAwesomeIcon icon={s.icon} />
            </i>
            {openBar.trim() && <Nav to={s.link} title={s.title} />}
          </div>
        </div>
      ))}
    </div>
  );
}
