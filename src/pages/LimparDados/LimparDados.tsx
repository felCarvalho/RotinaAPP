//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
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
    <div className="z-50 h-full rounded-[50px] bg-blue-50 shadow-sm shadow-blue-50">
      <HeaderContent
        title="Limpar Dados"
        iconBack={faAngleLeft}
        iconClosed={faX}
        btnBack={() => {
          setLayout({ isMobileLayout: true, isDesktopLayout: isLayout?.isDesktopLayout });
          navigate("/inicio/configuracoes");
        }}
        btnClosed={() => {
          setLayout({ isMobileLayout: false, isDesktopLayout: isLayout?.isDesktopLayout });
          navigate("/inicio/configuracoes");
        }}
        classNameBtn="bg-white !text-blue-400"
      />
      <div></div>
    </div>
  );
}
