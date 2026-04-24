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

export const NAV_LINKS = [
  {
    title: "Início",
    link: "home",
    icon: faHome,
    description: "Visualize suas tarefas diárias"
  },
  {
    title: "Categorias",
    link: "home/categorias",
    icon: faLayerGroup,
    description: "Gerencie seus grupos de rotinas"
  },
  {
    title: "Buscar",
    link: "home/buscar",
    icon: faSearch,
    description: "Encontre tarefas específicas"
  },
  {
    title: "Configurações",
    link: "home/configuracoes",
    icon: faGear,
    description: "Ajuste suas preferências"
  },
  {
    title: "Filtro",
    link: "home/filtros",
    icon: faFilter,
    description: "Refine sua visualização"
  },
  {
    title: "Nova Tarefa",
    link: "home/adicionar-tarefa",
    icon: faCheck,
    description: "Crie uma nova atividade"
  },
  {
    title: "Nova Categoria",
    link: "home/adicionar-categoria",
    icon: faPlus,
    description: "Organize por novos temas"
  },
  {
    title: "Rascunhos",
    link: "home/rascunhos",
    icon: faClipboardCheck,
    description: "Itens salvos para depois"
  },
  {
    title: "Criar Rotina",
    link: "home/criar-rotina",
    icon: faPenToSquare,
    description: "Monte seu plano de hábitos"
  },
];
