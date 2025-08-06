import { Button } from "./btn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { H3 } from "./subTitle";

interface HeaderContentType {
  iconBack: IconProp | null;
  iconClosed: IconProp | null;
  title: string;
  classNameHeader?: string;
  classNameBtn?: string;
  classNameBtnBack?: string;
  classNameBtnClosed?: string;
  classNameTitle?: string;
  classNameHeaderDiv?: string;
  btnBack?: () => void;
  btnClosed?: () => void;
}

export function HeaderContent({
  iconBack,
  title,
  iconClosed,
  classNameHeader,
  classNameBtn,
  classNameBtnBack,
  classNameBtnClosed,
  classNameTitle,
  btnBack,
  btnClosed,
}: HeaderContentType) {
  return (
    <header className={`${classNameHeader} relative`}>
      <div className="absolute top-0 right-0 left-0 flex flex-row justify-between rounded-t-[50px] p-5 backdrop-blur-3xl">
        <div className="flex flex-row items-center gap-2">
          <Button
            onClick={btnBack}
            type="button"
            className={`${classNameBtn} ${classNameBtnBack} min-h-11 min-w-11 rounded-full bg-blue-400 !p-0 text-white shadow-2xl shadow-blue-100`}
            ariaLabel="Voltar"
          >
            <FontAwesomeIcon icon={iconBack} />
          </Button>
          <H3 children={null} title={title} className={`${classNameTitle} !text-lg font-medium text-blue-400`} />
        </div>
        <div className="">
          <Button
            onClick={btnClosed}
            type="button"
            className={`${classNameBtn} ${classNameBtnClosed} min-h-11 min-w-11 rounded-full bg-blue-400 !p-0 text-white shadow-2xl shadow-blue-100`}
            ariaLabel="Fechar"
          >
            <FontAwesomeIcon icon={iconClosed} />
          </Button>
        </div>
      </div>
    </header>
  );
}
