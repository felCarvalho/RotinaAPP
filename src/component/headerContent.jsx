import { Button } from "./btn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { H3 } from "./subTitle";

export function HeaderContent({
  iconBack,
  title,
  iconClosed,
  classNameHeader,
  classNameBtn,
  classNameTitle,
  classNameHeaderDiv,
  btnBack,
  btnClosed,
}) {
  return (
    <header className={`${classNameHeader} relative`}>
      <div
        className={`absolute right-0 left-0 z-10 flex flex-row justify-between rounded-t-[50px] p-5 backdrop-blur-3xl ${classNameHeaderDiv}`}
      >
        <div className="flex flex-row items-center gap-2">
          <Button
            onClick={btnBack}
            type="button"
            whileTap={{ scale: 0.9 }}
            className={`${classNameBtn} min-h-11 min-w-11 rounded-full bg-blue-400 !p-0 text-white shadow-2xl shadow-blue-100`}
            ariaLabel="Voltar"
          >
            <FontAwesomeIcon icon={iconBack} />
          </Button>
          <H3 title={title} className={`${classNameTitle} !text-lg font-medium text-blue-400`} />
        </div>
        <div className="">
          <Button
            whileTap={{ scale: 0.9 }}
            onClick={btnClosed}
            type="button"
            className={`${classNameBtn} min-h-11 min-w-11 rounded-full bg-blue-400 !p-0 text-white shadow-2xl shadow-blue-100`}
            ariaLabel="Fechar"
          >
            <FontAwesomeIcon icon={iconClosed} />
          </Button>
        </div>
      </div>
    </header>
  );
}
