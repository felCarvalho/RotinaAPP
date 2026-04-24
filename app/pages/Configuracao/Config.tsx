import {
  faAngleLeft,
  faAngleRight,
  faLock,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router";
import { Button } from "../../component/btn";
import { P } from "../../component/paragrafo";
import { H3 } from "../../component/subTitle";
import { H1 } from "~/component/title";
import { useNavigate } from "react-router";

export function Config() {
  const navigate = useNavigate();
  const settingsData = [
    {
      title: "Tema",
      description: "Escolha o tema da aplicação",
      icon: faAngleRight,
      link: "home/configuracoes/tema",
    },
    {
      title: "Conta",
      description: "Gerenciar sua conta",
      icon: faAngleRight,
      link: "home/configuracoes/conta",
    },
    {
      title: "Permissões",
      description: "Defina as permissões de acesso a funções para sua conta",
      icon: faLock,
      link: "home/configuracoes/Permissoes",
    },
    {
      title: "Lixeira",
      description:
        "Permite restaurar e excluir de forma permanente os itens deletados",
      icon: faTrashAlt,
      link: "home/configuracoes/lixeira",
    },
  ];
  return (
    <div className="h-full">
      <div className="scroll-hide h-full overflow-auto">
        <div className="">
          <NavLink
            to="/home"
            className="flex w-min flex-row items-center gap-2 rounded-full px-2 hover:bg-blue-50"
          >
            <FontAwesomeIcon icon={faAngleLeft} className="text-blue-400" size="lg" />
            <H1
              title="Configurações"
              className="w-max text-2xl text-blue-400"
            />
          </NavLink>
        </div>
        {settingsData.map((s) => (
          <div className="my-3.5 flex flex-row items-center justify-between rounded-2xl bg-blue-100/5 p-2.5 px-3 py-4 shadow-sm shadow-blue-50">
            <NavLink
              key={s.title}
              to={s.link}
              className="flex w-full flex-row items-center justify-center"
            >
              <div className="w-full">
                <H3
                  title={s.title}
                  className="cursor-pointer text-blue-400"
                />
                <P
                  title={s.description}
                  className="xs:max-2xs:w-40 3xs:max-4xs:w-50 truncate font-light whitespace-nowrap text-blue-300 md:w-full"
                />
              </div>
              <Button type="button" className="min-h-11 min-w-11 bg-white">
                <i className="text-blue-400">
                  <FontAwesomeIcon icon={faAngleRight} size="lg" />
                </i>
              </Button>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
}
