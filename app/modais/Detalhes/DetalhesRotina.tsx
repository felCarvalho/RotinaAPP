import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../../component/btn";
import { Overlay } from "../../component/overlay";
import { P } from "../../component/paragrafo";
import { H3 } from "../../component/subTitle";

export function DetalhesRotina() {
  return (
    <>
      <Overlay
        initial={{ scale: 0.2, opacity: 0.3 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <div
          className={`absolute right-2 left-2 flex flex-col justify-center gap-2 rounded-[50px] p-5 shadow-2xl shadow-blue-50`}
        >
          <div
            key={""}
            className="flex flex-row items-center gap-1 text-blue-400"
          >
            <H3 title={``} />
            <P className="max-w-full truncate text-blue-300" title={""} />
          </div>
          )) ) : (
          <div className="mx-12 rounded-full bg-blue-50 p-1.5 shadow-sm shadow-blue-100">
            <p className="text-center text-base font-bold text-blue-300">
              sem tasks encontradas
            </p>
          </div>
          <div className="flex w-full items-center justify-center">
            <Button
              type="reset"
              onClick={() => {}}
              ariaLabel="Fechar"
              className="min-h-10 min-w-10 p-0!"
            >
              <i>
                <FontAwesomeIcon icon={faX} />
              </i>
            </Button>
          </div>
        </div>
      </Overlay>
      )
    </>
  );
}
