import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTable, faRightFromBracket, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

export const NavLinks = [
  {
    link: "Buscar",
    icon: <FontAwesomeIcon icon={faSearch} />,
    genericIcon: <FontAwesomeIcon icon={faAngleRight} />,
  },
  {
    link: "Ver dados por categoria",
    icon: <FontAwesomeIcon icon={faTable} />,
    genericIcon: <FontAwesomeIcon icon={faAngleRight} />,
  },
  {
    link: "Lixeira",
    icon: <FontAwesomeIcon icon={faTrash} />,
    genericIcon: <FontAwesomeIcon icon={faAngleRight} />,
  },
  {
    link: "Perfil",
    icon: <FontAwesomeIcon icon={faUser} />,
    genericIcon: <FontAwesomeIcon icon={faAngleRight} />,
  },
  {
    link: "Sair",
    icon: <FontAwesomeIcon icon={faRightFromBracket} />,
    genericIcon: <FontAwesomeIcon icon={faAngleRight} />,
  },
];
