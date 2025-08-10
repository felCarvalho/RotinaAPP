import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTable, faRightFromBracket, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";

export const NavLinks = [
  {
    text: "Buscar",
    icon: <FontAwesomeIcon icon={faSearch} />,
    link: "/inicio/buscar",
  },
  {
    text: "Ver dados por categoria",
    icon: <FontAwesomeIcon icon={faTable} />,
    link: "/inicio/configuracoes/infomações-categorias",
  },
  {
    text: "Lixeira",
    icon: <FontAwesomeIcon icon={faTrash} />,
    link: "/inicio/configuracoes/lixeira",
  },
  {
    text: "Perfil",
    icon: <FontAwesomeIcon icon={faUser} />,
    link: "/inicio/configuracoes/perfil",
  },
  {
    text: "Sair",
    icon: <FontAwesomeIcon icon={faRightFromBracket} />,
    link: "/inicio/configuracoes/perfil",
  },
];
