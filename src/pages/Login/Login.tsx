import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../../component/btn";
import { Input } from "../../component/input";
import { P } from "../../component/paragrafo";
import { H3 } from "../../component/subTitle";
import { useResizeView } from "../../hooks/UseResizeView";
import { useState } from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router";

interface PasswordTypes {
  senha: boolean;
  repetirSenha: boolean;
}

export function Login() {
  const { verificarWidth } = useResizeView();
  const [typeInput, setType] = useState<PasswordTypes>({
    senha: true,
    repetirSenha: true,
  });

  return (
    <div className="absolute top-0 right-1 bottom-0 left-1 flex items-center justify-center gap-10 md:justify-evenly md:px-10 lg:px-52">
      {verificarWidth({ largura: 750 }) && (
        <div className="flex skew-x-3 flex-col items-center justify-center gap-5 rounded-2xl md:w-full">
          <div className="rounded-4xl border border-blue-50/30 shadow-lg shadow-blue-50/30 transition">
            <img className="h-60 w-60 rounded-4xl" src="../../../assets/login.svg" alt="Login" />
          </div>
          <div className="rounded-full border border-blue-50/30 p-5 shadow-2xl shadow-blue-50/40">
            <H3 title="Ainda não tem sua conta?!" className="!text-[17px] tracking-wide text-blue-400" />
            <H3 title="Crie uma agora mesmo clicando no botão abaixo." className="!text-[17px] tracking-wide text-blue-400" />
          </div>
          <div className="">
            <Button type="button" className="transition hover:scale-105">
              <p className="font-medium">Abrir conta !</p>
            </Button>/
          </div>
        </div>
      )}
      <div className="flex flex-col items-center justify-center gap-2 rounded-4xl border border-blue-50 p-2 shadow-2xl shadow-blue-50 md:w-full md:p-4">
        <div className="text-center">
          <h3 className="text-[25px] font-semibold text-blue-400 sm:text-3xl">Login</h3>
        </div>
        <div className="w-full rounded-4xl p-4 md:bg-blue-50/30 md:p-5">
          <form className="flex flex-col gap-5">
            <label className="flex flex-col items-start gap-1.5">
              <P title="Usuario:" className="text-blue-400" />
              <Input type="text" placeholder="Digite seu nome de Usuário" className="bg-white !shadow-none" />
            </label>
            <label className="flex flex-col items-start gap-1.5">
              <P title="Senha:" className="text-blue-400" />
              <div className="flex w-full flex-row items-center justify-center gap-2">
                <Input
                  type={typeInput?.senha ? "password" : "text"}
                  placeholder="Digite seus senha"
                  className="bg-white !shadow-none"
                />
                <Button
                  type="button"
                  className="!min-h-11 !min-w-11 !bg-white !p-0 !text-blue-400"
                  onClick={() =>
                    setType((s) => ({
                      ...s,
                      senha: !s.senha,
                    }))
                  }
                >
                  <i>
                    <FontAwesomeIcon icon={typeInput?.senha ? faEye : faEyeSlash} />
                  </i>
                </Button>
              </div>
            </label>
            <label className="flex flex-col items-start gap-1.5">
              <P title="Repetir senha:" className="text-blue-400" />
              <div className="flex w-full flex-row items-center justify-center gap-2">
                <Input
                  type={typeInput?.repetirSenha ? "password" : "text"}
                  placeholder="Digite seus senha novamente..."
                  className="bg-white !shadow-none"
                />
                <Button
                  type="button"
                  className="!min-h-11 !min-w-11 !bg-white !p-0 !text-blue-400"
                  onClick={() =>
                    setType((s) => ({
                      ...s,
                      repetirSenha: !s.repetirSenha,
                    }))
                  }
                >
                  <i>
                    <FontAwesomeIcon icon={typeInput?.repetirSenha ? faEye : faEyeSlash} />
                  </i>
                </Button>
              </div>
            </label>
            <div className="flex w-full flex-row items-center justify-center gap-5">
              <Button type="submit">
                <p className="font-medium">Confirmar</p>
              </Button>
              <Button type="button" className="!bg-white !text-blue-400">
                <p className="font-medium">Cancelar</p>
              </Button>
            </div>
          </form>
        </div>
        <div className="w-full text-end">
          <NavLink to="/redefinir-senha">
            <P title="Esqueceu a senha?" className="text-[12px]" />
          </NavLink>
        </div>
      </div>
    </div>
  );
}
/*
 */
