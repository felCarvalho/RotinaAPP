import { faAngleLeft, faP } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import { Button } from "../../component/btn";
import { HeaderContent } from "../../component/headerContent";
import { P } from "../../component/paragrafo";
import { H3 } from "../../component/subTitle";
import { useCallback } from "react";

export function Lixeira() {
  return (
    <div className="scrollbar-hide z-50 h-full w-full rounded-[50px] bg-blue-50 pb-5 shadow-sm shadow-blue-50">
      <HeaderContent
        iconClosed={faP}
        title="Lixeira"
        iconBack={faAngleLeft}
        btnClosed={undefined}
        classNameBtn="bg-white !text-blue-400"
        classNameBtnClosed="!min-w-0 !min-h-0 bg-transparent"
      />
      <div className="scrollbar-hide h-full overflow-auto rounded-t-[50px] pt-22">
        <div
          key={""}
          className="text-shadow-2xl mx-5 my-3 flex flex-row justify-between rounded-2xl bg-white py-5 shadow-blue-100"
        >
          <div className="flex flex-col justify-between gap-2 pl-3">
            <div className="flex gap-0.5">
              <H3 title="Rotina:" className="text-blue-400" />
              <P
                title={""}
                className="xs:max-2xs:w-16 3xs:max-4xs:w-24 truncate text-blue-300 md:w-60"
              />
            </div>
            <div className="flex gap-0.5">
              <H3 title="categoriaID:" className="text-blue-400" />
              <P
                title={""}
                className="xs:max-2xs:w-10 3xs:max-4xs:w-20 truncate text-blue-300 md:w-60"
              />
            </div>
          </div>
          <div className="pr-3">
            <Button type="button" onClick={() => {}}>
              <p>Restaurar</p>
            </Button>
          </div>
        </div>
        )) ) : (
        <div className="flex h-full items-center justify-center">
          <P
            title="Ops, não existe Rotinas deletas aqui"
            className="text-lg! text-blue-400"
          />
        </div>
      </div>
    </div>
  );
}
