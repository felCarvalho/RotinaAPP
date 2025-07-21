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
    link: "/inicio/infomações-categorias",
  },
  {
    text: "Lixeira",
    icon: <FontAwesomeIcon icon={faTrash} />,
    link: "/inicio/configurações/lixeira",
  },
  {
    text: "Perfil",
    icon: <FontAwesomeIcon icon={faUser} />,
    link: "/inicio/configurações/user",
  },
  {
    text: "Sair",
    icon: <FontAwesomeIcon icon={faRightFromBracket} />,
    link: "/login",

  },
];
