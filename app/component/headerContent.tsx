import { Button } from "./btn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type IconProp } from "@fortawesome/fontawesome-svg-core";
import { H3 } from "./subTitle";

interface HeaderContentType {
  iconBack: IconProp;
  iconClosed: IconProp;
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
  classNameHeaderDiv,
  btnBack,
  btnClosed,
}: HeaderContentType) {
  return (
    <header className={`${classNameHeader} relative`}>
      <div
        className={`${classNameHeaderDiv} absolute top-0 z-50 right-0 left-0 flex flex-row justify-between rounded-t-[50px] p-5 bg-white/95 backdrop-blur-md`}
      >
        {btnBack && (
          <div className="flex flex-row items-center gap-2">
            <Button
              onClick={btnBack}
              type="button"
              className={`${classNameBtn} ${classNameBtnBack} aspect-square flex items-center justify-center min-h-11 min-w-11 rounded-full bg-blue-400 p-0! text-white shadow-2xs shadow-blue-100`}
              ariaLabel="Voltar"
            >
              <FontAwesomeIcon icon={iconBack} size="lg" />
            </Button>
            <H3
              children={null}
              title={title}
              className={`${classNameTitle} min-w-0 text-lg! font-medium text-blue-400`}
            />
          </div>
        )}
        <div className="">
          <Button
            onClick={btnClosed}
            type="button"
            className={`${classNameBtn} ${classNameBtnClosed} min-h-11 min-w-11 rounded-full bg-blue-400 p-0! text-white shadow-2xs shadow-blue-100`}
            ariaLabel="Fechar"
          >
            <FontAwesomeIcon icon={iconClosed} />
          </Button>
        </div>
      </div>
    </header>
  );
}
