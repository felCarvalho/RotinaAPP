//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
//import { Button } from "../../component/btn";
import { HeaderContent } from "../../component/headerContent";
//import { Input } from "../../component/input";
//import { H3 } from "../../component/subTitle";
import { useNavigate, useOutletContext } from "react-router";

export function Lixeira() {
  const navigate = useNavigate();
  const { setLayout } = useOutletContext();

  return (
    <div className="z-50 h-full rounded-[50px] bg-blue-50 p-5 shadow-sm shadow-blue-50">
      <HeaderContent
        title="Lixeira"
        iconBack={faAngleLeft}
        iconClosed={faX}
        btnBack={() => {
          setLayout({ isMobileLayout: false });
          navigate("/inicio/configuracoes");
        }}
        btnClosed={() => {
          setLayout({ isMobileLayout: false });
          navigate("/inicio/configuracoes");
        }}
        classNameBtn="bg-white !text-blue-400"
      />
      <div className="py-8"></div>
    </div>
  );
}
