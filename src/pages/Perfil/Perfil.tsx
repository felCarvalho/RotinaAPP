import { faAngleLeft, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../../component/btn";
import { HeaderContent } from "../../component/headerContent";
import { P } from "../../component/paragrafo";
import { H3 } from "../../component/subTitle";
import { AuthStore } from "../../store/UseAuth";
import { RotinaStore } from "../../store/UseRotina";

export function Perfil() {
  const { users, logOut, deletarUser, buscarUser } = AuthStore();
  const { deletarTasksUserConta, data, tasks } = RotinaStore();
  const [user] = useState(() => buscarUser());
  const navigate = useNavigate();

  const verificarLogin = useCallback(() => {
    if (logOut()) navigate("/login", { replace: true });
  }, [logOut]);

  const deletarUsuario = useCallback(() => {
    deletarTasksUserConta();
    if (deletarUser()) navigate("/login");
  }, [deletarTasksUserConta, deletarUser, navigate]);

  console.log({ tasks, data, users });

  return (
    <div className="z-50 h-full rounded-[50px] bg-blue-50 pb-5 shadow-sm shadow-blue-50">
      <HeaderContent
        title="Perfil"
        iconBack={faAngleLeft}
        iconClosed={null}
        btnBack={() => {
          navigate("/configuracoes");
        }}
        btnClosed={undefined}
        classNameBtn="bg-white !text-blue-400"
        classNameBtnClosed="!min-w-0 !min-h-0 bg-transparent"
      />
      <div className="scrol-hide mx-5 h-full overflow-auto rounded-3xl pt-25">
        <div className="mb-5 flex w-full flex-col items-start justify-start gap-2 rounded-3xl">
          <H3 title="Dados Pessoais" className="text-blue-400" />
          <div className="flex w-full flex-col items-start justify-start gap-5 rounded-2xl bg-white p-4">
            <div className="flex flex-row items-center justify-center gap-2">
              <P title="Nome:" className="text-blue-400" />
              <H3 title={user?.user} className="xs:max-2xs:w-36 3xs:max-4xs:w-50 truncate text-blue-300 md:w-60" />
            </div>
            <div className="flex flex-row items-center justify-center gap-2">
              <P title="Email:" className="text-blue-400" />
              <H3 title={user?.email} className="xs:max-2xs:w-36 3xs:max-4xs:w-50 truncate text-blue-300 md:w-60" />
            </div>
            <div className="flex flex-row items-center justify-center gap-2">
              <P title="Senha:" className="text-blue-400" />
              <H3 title={user?.password} className="xs:max-2xs:w-36 3xs:max-4xs:w-50 truncate text-blue-300 md:w-60" />
            </div>
          </div>
        </div>
        <div className="my-2 flex flex-col items-start justify-start gap-2">
          <H3 title="Conta" className="text-blue-400" />
          <div className="flex w-full flex-col items-start gap-2 rounded-3xl bg-white p-4">
            <label className="flex flex-row items-center justify-center gap-2">
              <P title="Sair:" className="text-blue-400" />
              <div>
                <Button
                  type="button"
                  onClick={() => verificarLogin()}
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
                <Button
                  type="button"
                  onClick={() => navigate("/redefinir-senha")}
                  className="flex flex-row items-center justify-center gap-2"
                >
                  <P title="Redefinir" />
                </Button>
              </div>
            </label>
            <label className="flex flex-row items-center justify-center gap-2">
              <P title="Deletar Conta:" className="text-blue-400" />
              <div>
                <Button
                  type="button"
                  onClick={() => deletarUsuario()}
                  className="flex flex-row items-center justify-center gap-2 !bg-red-400 !shadow-red-50 focus:!shadow-red-50 focus:!outline-red-400"
                >
                  <P title="Deletar" />
                </Button>
              </div>
            </label>
            <label className="flex flex-row items-center justify-center gap-2">
              <P title="Alterar dados:" className="text-blue-400" />
              <div>
                <Button type="button" className="flex flex-row items-center justify-center gap-2">
                  <P title="Alterar dados pessoais" className="w-20 truncate sm:w-full" />
                </Button>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
