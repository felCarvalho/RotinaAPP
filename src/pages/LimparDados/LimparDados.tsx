//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
//import { Button } from "../../component/btn";
import { HeaderContent } from "../../component/headerContent";
//import { Input } from "../../component/input";
import { LayoutStore } from "../../store/UseLayout";
//import { H3 } from "../../component/subTitle";
import { useNavigate } from "react-router";

export function LimparDados() {
  const navigate = useNavigate();
  const { setLayout, isLayout } = LayoutStore();

  return (
    <div className="z-50 h-full rounded-[50px] bg-blue-50 pb-5 shadow-sm shadow-blue-50">
      <HeaderContent
        title="Limpar Dados"
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
      <div className="scroll-hide h-full overflow-auto rounded-[50px] px-3.5 pt-22"></div>
    </div>
  );
}
