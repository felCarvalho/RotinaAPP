import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../../component/btn";
import { HeaderContent } from "../../component/headerContent";
import { P } from "../../component/paragrafo";
import { H3 } from "../../component/subTitle";
import { RotinaStore } from "../../store/UseRotina";
import { LayoutStore } from "../../store/UseLayout";
import { useNavigate } from "react-router";

export function Lixeira() {
  const navigate = useNavigate();
  const { setLayout, isLayout } = LayoutStore();
  const { lixeira, restaurarTask } = RotinaStore();

  return (
    <div className="z-50 h-full rounded-[50px] bg-blue-50 pb-5 shadow-sm shadow-blue-50">
      <HeaderContent
        title="Lixeira"
        iconBack={faAngleLeft}
        iconClosed={null}
        btnBack={() => {
          setLayout({ isMobileLayout: false, isDesktopLayout: isLayout?.isDesktopLayout });
          navigate("/inicio/configuracoes");
        }}
        btnClosed={undefined}
        classNameBtn="bg-white !text-blue-400"
        classNameBtnClosed="!min-w-0 !min-h-0 bg-transparent"
      />
      <div className="scroll-hide h-full overflow-auto rounded-[50px] px-3.5 pt-22">
        {lixeira.length > 0 ? (
          lixeira.map((l) => (
            <div
              key={l?.id}
              className="mx-1.5 my-3 flex flex-row items-center justify-between rounded-2xl bg-white px-3 py-5 shadow-2xl shadow-blue-100"
            >
              <div className="item-center flex flex-col justify-between gap-2">
                <div className="flex gap-0.5">
                  <H3 title="Rotina:" className="text-blue-400" />
                  <P title={l?.rotina} className="text-blue-300" />
                </div>
                <div className="flex gap-0.5">
                  <H3 title="categoriaID:" className="text-blue-400" />
                  <P title={l?.categoriaID} className="w-10 truncate text-blue-300" />
                </div>
              </div>
              <div className="">
                <Button type="button" onClick={() => restaurarTask(l?.id, l?.categoriaID)}>
                  <p>Restaurar</p>
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="scroll-hid flex h-full w-full items-center justify-center">
            <H3 title="Não encontramos nenhuma rotina deletada! " className="text-[18px] text-blue-400" />
          </div>
        )}
      </div>
    </div>
  );
}
