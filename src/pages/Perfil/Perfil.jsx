import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faAngleLeft, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../../component/btn";
import { HeaderContent } from "../../component/headerContent";
import { Input } from "../../component/input";
import { useNavigate, useOutletContext } from "react-router";
import { H3 } from "../../component/subTitle";
import { P } from "../../component/paragrafo";

export function Perfil() {
  const navigate = useNavigate();
  const { setLayout } = useOutletContext();

  return (
    <div className="z-50 h-full rounded-[50px] bg-blue-50 p-5 shadow-sm shadow-blue-50">
      <HeaderContent
        title="Perfil"
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
      <div className="my-8 flex flex-col gap-5 rounded-2xl">
        <div className="flex w-full flex-col items-start justify-start gap-2">
          <H3 title="Dados Pessoais" className="text-blue-400" />
          <div className="flex w-full flex-col items-start justify-start gap-5 rounded-2xl bg-white p-4">
            <label className="relative flex w-full flex-col gap-2">
              <P title="Nome:" className="text-blue-400" />
              <Input type="text" className="!rounded-2xl !shadow-none" />
            </label>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start gap-2">
          <H3 title="Conta" className="text-blue-400" />
          <div className="flex w-full flex-col items-start gap-2 rounded-2xl bg-white p-4">
            <label className="flex flex-row items-center justify-center gap-2">
              <P title="Sair:" className="text-blue-400" />
              <div>
                <Button
                  type="button"
                  className="flex flex-row items-center justify-center gap-2 !py-1"
                >
                  <P title="Sair da conta" />
                  <i>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} />
                  </i>
                </Button>
              </div>
            </label>
            <label className="flex flex-row items-center justify-center gap-2">
              <P title="Redefinir senha:" className="text-blue-400" />
              <div>
                <Button type="button" className="flex flex-row items-center justify-center gap-2">
                  <P title="Redefinir" />
                </Button>
              </div>
            </label>
            <label className="flex flex-row items-center justify-center gap-2">
              <P title="Deletar Conta:" className="text-blue-400" />
              <div>
                <Button type="button" className="flex flex-row items-center justify-center !shadow-red-50 gap-2 !bg-red-400 focus:!shadow-red-50 focus:!outline-red-400">
                  <P title="Deletar" />
                </Button>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
