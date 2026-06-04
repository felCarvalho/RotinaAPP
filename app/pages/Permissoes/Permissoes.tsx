import { faAngleLeft, faLock } from "@fortawesome/free-solid-svg-icons";
import { HeaderContent } from "../../component/headerContent";
import { P } from "../../component/paragrafo";
import { H3 } from "../../component/subTitle";

export function Permissoes() {
  return (
    <div className="z-50 h-full rounded-[50px] bg-blue-50 pb-5 shadow-sm shadow-blue-50">
      <HeaderContent
        iconClosed={faLock}
        title="Permissoes"
        iconBack={faAngleLeft}
        btnClosed={undefined}
        classNameBtn="bg-white !text-blue-400"
        classNameBtnClosed="!min-w-0 !min-h-0 bg-transparent"
      />
      <div className="scrollbar-hide mx-5 h-full overflow-auto rounded-3xl pt-25">
        <div className="flex h-full flex-col items-start justify-start gap-5">
          <H3 title="Permissoes de acesso" className="text-blue-400" />
          <div className="flex w-full flex-col gap-4 rounded-3xl bg-white p-5">
            <div className="flex flex-row items-center gap-3 rounded-2xl border border-blue-50 bg-blue-100/5 p-3">
              <div className="flex flex-col gap-0.5">
                <H3 title="Em desenvolvimento" className="text-blue-400" />
                <P
                  title="As permissoes de acesso estarao disponiveis em breve."
                  className="text-blue-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
