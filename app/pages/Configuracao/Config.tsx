import {
  faAngleLeft,
  faAngleRight,
  faLock,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router";
import { P } from "../../component/paragrafo";
import { H3 } from "../../component/subTitle";

export function Config() {
  const settingsData = [
    {
      title: "Tema",
      description: "Escolha o tema da aplicação (em desenvolvimento)",
      icon: faAngleRight,
      link: "tema",
    },
    {
      title: "Conta",
      description: "Gerenciar sua conta (em desenvolvimento)",
      icon: faAngleRight,
      link: "conta",
    },
    {
      title: "Permissões",
      description:
        "Defina as permissões de acesso a funções para sua conta (em desenvolvimento)",
      icon: faLock,
      link: "Permissoes",
    },
    {
      title: "Lixeira",
      description:
        "Permite restaurar e excluir de forma permanente os itens deletados (em desenvolvimento)",
      icon: faTrashAlt,
      link: "lixeira",
    },
  ];
  return (
    <div className="h-full">
      <div className="scroll-hide h-full overflow-auto">
        <header className="sticky top-0 z-40 bg-white/80 px-2 py-4 backdrop-blur-md">
          <NavLink
            to="/home"
            className="flex w-min flex-row items-center gap-2 rounded-full px-2 hover:bg-blue-50"
          >
            <FontAwesomeIcon
              icon={faAngleLeft}
              className="text-blue-400"
              size="lg"
              aria-hidden="true"
            />
            <span className="w-max text-xl font-medium tracking-wide text-blue-400 sm:text-2xl lg:text-3xl">
              Configurações
            </span>
          </NavLink>
        </header>
        <nav aria-label="Opções de configuração">
          <ul className="flex flex-col">
            {settingsData.map((s) => (
              <li key={s.title} className="my-2.5 sm:my-3.5">
                <NavLink
                  to={s.link}
                  className="flex flex-row items-center justify-between gap-3 rounded-2xl border border-blue-50 bg-blue-100/5 p-3 shadow-sm shadow-blue-50 transition-colors select-none hover:bg-blue-100/20 sm:p-4"
                >
                  <div className="min-w-0 w-full">
                    <H3
                      title={s.title}
                      className="cursor-pointer text-blue-400"
                    />
                    <P
                      title={s.description}
                      className="w-40 truncate font-light whitespace-nowrap text-blue-500 sm:w-48 md:w-full"
                    />
                  </div>
                  <span
                    aria-hidden="true"
                    className="flex min-h-11 min-w-11 items-center justify-center rounded-full bg-white text-blue-400"
                  >
                    <FontAwesomeIcon icon={s.icon} size="lg" />
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
