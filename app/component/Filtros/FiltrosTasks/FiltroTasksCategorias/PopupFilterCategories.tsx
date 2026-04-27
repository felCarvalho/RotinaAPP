import { Button } from "../../../btn";
import { P } from "../../../paragrafo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FILTER_CATEGORY_BASE } from "../../../../utils/constants/filters";

export function PopupFilterCategories() {
  // Placeholders para visualização (No futuro virão do banco)
  const categories = [
    { id: "1", title: "Trabalho" },
    { id: "2", title: "Estudos" },
    { id: "3", title: "Saúde" },
    { id: "4", title: "Lazer" }
  ];

  return (
    <div className="flex flex-col gap-2 min-w-[180px] max-h-[300px] overflow-y-auto scrollbar-hide">
      <Button
        type="button"
        className="flex w-full flex-row items-center gap-3 bg-white hover:bg-blue-50 py-2 px-4 shadow-none!"
      >
        <FontAwesomeIcon icon={FILTER_CATEGORY_BASE.all.icon} className="text-blue-400 w-5" />
        <P title={FILTER_CATEGORY_BASE.all.title} className="text-blue-900 font-medium" />
      </Button>
      
      <div className="h-[1px] bg-blue-50 mx-2 my-1" />

      {categories.map((cat) => (
        <Button
          key={cat.id}
          type="button"
          className="flex w-full flex-row items-center gap-3 bg-white hover:bg-blue-50 py-2 px-4 shadow-none!"
        >
          <FontAwesomeIcon icon={FILTER_CATEGORY_BASE.item.icon} className="text-blue-300 w-5" />
          <P title={cat.title} className="text-blue-900 font-medium" />
        </Button>
      ))}
    </div>
  );
}
