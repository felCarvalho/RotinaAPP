import { Button } from "./btn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { H3 } from "./subTitle";

export function HeaderContent({ iconBack, title, iconClosed, className, btnBack, btnClosed }) {
  return (
    <header className={`${className} flex flex-row justify-between`}>
      <div className="flex flex-row items-center gap-2">
        <Button
          onClick={btnBack}
          type="button"
          whileTap={{ scale: 0.9 }}
          className="min-h-11 min-w-11 rounded-full bg-blue-400 !p-0 text-white shadow-2xl shadow-blue-100"
          ariaLabel=" Voltar"
        >
          <FontAwesomeIcon icon={iconBack} />
        </Button>
        <H3 title={title} className="!text-lg font-medium text-blue-400" />
      </div>
      <div>
        <Button
          whileTap={{ scale: 0.9 }}
          onClick={btnClosed}
          type="button"
          className="min-h-11 min-w-11 rounded-full bg-blue-400 !p-0 text-white shadow-2xl shadow-blue-100"
          ariaLabel="Fechar"
        >
          <FontAwesomeIcon icon={iconClosed} />
        </Button>
      </div>
    </header>
  );
}
