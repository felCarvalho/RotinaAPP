import { faAngleRight, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import * as z from "zod";
import { Button } from "../../component/btn";
import { Input } from "../../component/input";
import { P } from "../../component/paragrafo";
import { H3 } from "../../component/subTitle";
import { H1 } from "../../component/title";
import { useResizeView } from "../../hooks/UseResizeView";
import axios from "axios";

const emailSchema = z.email().trim();
const passwordSchema = z.string().trim();

export function Login() {
  const [email, setUser] = useState<z.infer<typeof emailSchema>>("");
  const [password, setPassword] = useState<z.infer<typeof passwordSchema>>("");
  const [errorName, setErrorName] = useState<string>("");
  const navigate = useNavigate();

  function handleUserChange(event: React.ChangeEvent<HTMLInputElement>) {
    switch (event.target.name) {
      case "email":
        setUser(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
      default:
        break;
    }
  }

  async function loginUser() {
    try {
      const response = await axios.post(
        "/auth/login",
        {
          email: email,
          password: password,
        },
        {
          baseURL: import.meta.env.VITE_LOCAL_URL,
          withCredentials: true,
        },
      );

      const { data, status } = response;

      return {
        data: data,
        status: status === 201,
        success: true,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          data: error.response?.data,
          status: error.response?.status,
          success: false,
        };
      }

      return {
        data: "error desconhecido",
        status: 500,
        success: false,
      };
    }
  }

  async function onLogoutUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const emailValidation = emailSchema.safeParse(email);
    const passwordValidation = passwordSchema.safeParse(password);

    if (!emailValidation.success || !passwordValidation.success) {
      setErrorName("Ops, email ou senha inválida");
      console.log("error ao login");
      return;
    }

    console.log("log de teste");

    const loginUserResponse = await loginUser();

    if (loginUserResponse.success) {
      console.log("usuario logado");
      navigate("/home");
      setErrorName("");
      return;
    }

    if (!loginUserResponse.success) {
      setErrorName("Ops, email ou senha inválida");
    }
  }

  const { verificarWidth } = useResizeView();
  return (
    <div className="flex min-h-lvh flex-col items-center justify-center gap-10">
      <div className="flex items-center justify-center gap-10 px-5 md:justify-evenly md:px-10 lg:px-52">
        {verificarWidth({ largura: 750 }) && (
          <div className="flex flex-col items-center justify-center gap-5 rounded-2xl md:w-full">
            <div className="rounded-4xl transition">
              <img
                className="h-60 w-60 rounded-4xl"
                loading="lazy"
                src="
              assets/Login.svg"
                alt="Login"
              />
            </div>
            <div className="p-5">
              <H3 title="Ainda não tem sua conta?!" className="my-1 !text-[17px] tracking-wide text-blue-400" />
              <H3
                title="Crie uma agora mesmo clicando no botão abaixo."
                className="my-1 !text-[16px] tracking-wide text-blue-300"
              />
            </div>
            <div>
              <Button type="button" onClick={() => navigate("/criar-usuario")}>
                <p className="text-white">Abrir Conta!</p>
              </Button>
            </div>
          </div>
        )}
        <div className="flex-col items-center justify-center gap-2 rounded-4xl border border-blue-50 p-2 shadow-2xl shadow-blue-50 md:w-full min-md:py-4">
          <div className="text-center">
            <H1 title="Login" className="font-semibold text-blue-400 sm:text-3xl" />
          </div>
          <div className="w-full rounded-4xl p-4 md:p-2">
            <form onSubmit={onLogoutUser} className="flex flex-col gap-5">
              <label className="flex flex-col items-start gap-1.5">
                <div className="flex w-full flex-col items-start">
                  <P title="Email:" className="text-blue-400" />
                  <Input
                    onChange={handleUserChange}
                    name="email"
                    type="email"
                    placeholder="Digite seu nome de Usuário"
                    className="bg-white !shadow-none"
                  />
                </div>
              </label>
              <label className="flex flex-col items-start gap-1.5">
                <P title="Senha:" className="text-blue-400" />
                <div className="flex w-full flex-row items-center justify-center gap-2">
                  <Input
                    onChange={handleUserChange}
                    name="password"
                    type={password ? "password" : "text"}
                    placeholder="Digite seus senha"
                    className="bg-white !shadow-none"
                  />
                  <Button type="button" className="!min-h-11 !min-w-11 !bg-white !p-0 !text-blue-400">
                    <i>
                      <FontAwesomeIcon icon={password ? faEye : faEyeSlash} />
                    </i>
                  </Button>
                </div>
              </label>
              <div className="flex w-full flex-row items-center justify-center gap-5">
                <Button type="submit">
                  <p className="font-medium">Confirmar</p>
                </Button>
                <Button onClick={() => setErrorName("")} type="reset" className="!bg-white !text-blue-400">
                  <p className="font-medium">Cancelar</p>
                </Button>
              </div>
            </form>
          </div>
          <div className="mt-5 flex w-full flex-row items-center justify-between">
            <P title={errorName} className="text-xs font-medium text-red-400" />
            <NavLink to="/redefinir-senha">
              <P title="Esqueceu a senha?" className="text-[13px] text-blue-300" />
            </NavLink>
          </div>
        </div>
      </div>
      {!verificarWidth({ largura: 750 }) && (
        <NavLink
          to="/criar-conta"
          className="flex flex-row items-center justify-center gap-2 text-blue-400 underline underline-offset-4"
        >
          <P title="Abrir conta" className="font-medium" />
          <i>
            <FontAwesomeIcon icon={faAngleRight} />
          </i>
        </NavLink>
      )}
    </div>
  );
}
