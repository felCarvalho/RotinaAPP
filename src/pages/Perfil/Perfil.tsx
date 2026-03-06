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
import { Input } from "../../component/input";

interface typeUserAuth {
  user: string;
  email: string;
  password: string;
  id: string;
}

interface typeUserLocal {
  user: string;
  email: string;
  password: string;
}

enum typeNameForm {
  user = "user",
  email = "email",
  password = "password",
}

export function Perfil() {
  const { logOut, deletarUser, buscarUser, alterarUser, alterarEmail, alterarPassword } = AuthStore();
  const { deletarTasksUserConta } = RotinaStore();
  const [user] = useState<typeUserAuth>(() => buscarUser());
  const [userPerfil, setPerfil] = useState<typeUserLocal>({
    user: user?.user,
    email: user?.email,
    password: user?.password,
  });
  const navigate = useNavigate();

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setPerfil((s) => ({
      ...s,
      [name]: value,
    }));
  }

  const verificarLogin = useCallback(() => {
    if (logOut()) navigate("/login", { replace: true });
  }, [logOut]);

  const deletarUsuario = useCallback(() => {
    deletarTasksUserConta();
    if (deletarUser()) navigate("/login");
  }, [deletarTasksUserConta, deletarUser, navigate]);

  function perfilOnSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    if (e.target.name === typeNameForm?.user) {
      alterarUser({ newUser: userPerfil?.user });
    }
    if (e.target.name === typeNameForm?.email) {
      alterarEmail({ newEmail: userPerfil?.email });
    }
    if (e.target.name === typeNameForm?.password) {
      alterarPassword({ newPassword: userPerfil?.password });
    }
  }

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
            <form name="user" onSubmit={perfilOnSubmit}>
              <label className="flex flex-row items-center justify-center gap-2">
                <P title="Nome:" className="text-blue-400" />
                <Input
                  name="user"
                  type="text"
                  value={userPerfil?.user}
                  onChange={handleInput}
                  className="!rounded-2xl !text-blue-800"
                />
              </label>
            </form>
            <form name="email" onSubmit={perfilOnSubmit}>
              <label className="flex flex-row items-center justify-center gap-2">
                <P title="Email:" className="text-blue-400" />
                <Input
                  name="email"
                  type="email"
                  value={userPerfil?.email}
                  onChange={handleInput}
                  className="!rounded-2xl !text-blue-800"
                />
              </label>
            </form>
            <form name="password" onSubmit={perfilOnSubmit}>
              <label className="flex flex-row items-center justify-center gap-2">
                <P title="Senha:" className="text-blue-400" />
                <Input
                  name="password"
                  type="text"
                  value={userPerfil?.password}
                  onChange={handleInput}
                  className="!rounded-2xl !text-blue-800"
                />
              </label>
            </form>
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
          </div>
        </div>
      </div>
    </div>
  );
}
