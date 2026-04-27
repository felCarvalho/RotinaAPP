import {
  faCheckCircle,
  faCircle,
  faListUl,
  faTag,
  faTags,
  faCalendarDay,
  faCalendarWeek,
  faCalendarAlt,
  faHistory,
  faSortAmountDown,
  faSortAmountUp,
  faSortAlphaDown,
  faSortAlphaUp,
} from "@fortawesome/free-solid-svg-icons";

export const FILTER_STATUS_OPTIONS = [
  { title: "Todas", icon: faListUl, value: "all" },
  { title: "Concluídas", icon: faCheckCircle, value: "completed" },
  { title: "Incompletas", icon: faCircle, value: "pending" },
];

export const FILTER_CATEGORY_BASE = {
  all: { title: "Todas as Categorias", icon: faTags, value: "all" },
  item: { icon: faTag },
};

export const FILTER_DATE_OPTIONS = [
  { title: "Hoje", icon: faCalendarDay, value: "today" },
  { title: "Esta Semana", icon: faCalendarWeek, value: "week" },
  { title: "Este Mês", icon: faCalendarAlt, value: "month" },
  { title: "Todo o período", icon: faHistory, value: "all" },
];

export const SORT_DATE_OPTIONS = [
  { title: "Mais recentes", icon: faSortAmountDown, value: "desc" },
  { title: "Mais antigas", icon: faSortAmountUp, value: "asc" },
  { title: "A - Z", icon: faSortAlphaDown, value: "alphabetical-asc" },
  { title: "Z - A", icon: faSortAlphaUp, value: "alphabetical-desc" },
];
