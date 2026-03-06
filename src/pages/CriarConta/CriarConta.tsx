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

const schemaEmail = z.email().min(1).max(150);
const schemaPassword = z.string().min(7).max(15);
const schemaName = z.string().min(2).max(150);

export function CriarConta() {
  const [email, setEmail] = useState<z.infer<typeof schemaEmail>>("");
  const [password, setPassword] = useState<z.infer<typeof schemaPassword>>("");
  const [name, setName] = useState<z.infer<typeof schemaName>>("");
  const [confirmPassword, setConfirmPassword] = useState<z.infer<typeof schemaPassword>>("");
  //erros de senha e erros geral na criação do usuario
  const [error, setError] = useState<string>("");
  //state controlar visibilidade de senha
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [errorName, setErrorName] = useState({
    nameError: "",
    emailError: "",
    passwordError: "",
    confirmPassError: "",
  });

  const navigate = useNavigate();

  async function createUser() {
    try {
      const response = await axios.post(
        "/criar-usuario",
        {
          email: email,
          password: password,
          name: name,
        },
        {
          baseURL: import.meta.env.VITE_LOCAL_URL,
        },
      );

      const { data, status } = response;

      return {
        data,
        status,
        success: status === 201,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          data: error.response?.data.message,
          status: error.response?.status,
          success: false,
        };
      }

      return {
        data: "Erro desconhecido",
        status: 500,
        success: false,
      };
    }
  }

  function handleSetValue(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPass":
        setConfirmPassword(value);
        break;
      case "user":
        setName(value);
        break;
      default:
        break;
    }
  }

  async function onCreateUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const emailValidation = schemaEmail.safeParse(email);
    const passwordValidation = schemaPassword.safeParse(password);
    const nameValidation = schemaName.safeParse(name);
    let error = false;

    if (!nameValidation.success) {
      setErrorName((s) => ({
        ...s,
        nameError: "Ops, insira um nome válido",
      }));
      error = true;
    }

    if (!emailValidation.success) {
      setErrorName((s) => ({
        ...s,
        emailError: "Ops, insira um email válido",
      }));
      error = true;
    }

    if (!passwordValidation.success) {
      setErrorName((s) => ({
        ...s,
        passwordError: "Ops, senha inválida",
      }));
      error = true;
    }

    const confirmPassValidation = password && confirmPassword && password.trim() === confirmPassword.trim();

    if (confirmPassValidation) {
      setErrorName((s) => ({
        ...s,
        confirmPassError: "",
      }));
    } else {
      setErrorName((s) => ({
        ...s,
        confirmPassError: "Senhas não correspondem",
      }));
      error = true;
    }

    if (error) {
      return;
    }

    const response = await createUser();

    if (response.success) {
      navigate("/auth/login");
      console.log("Usuário criado com sucesso!");
      setErrorName((s) => ({
        ...s,
        nameError: "",
        confirmPassError: "",
        passwordError: "",
        emailError: "",
      }));
      return;
    }

    if (!response.success) {
      setError("Erro ao criar usuário");
    }
  }

  console.log(errorName, error);

  const { verificarWidth } = useResizeView();
  return (
    <div className="flex min-h-lvh flex-col items-center justify-center gap-10">
      <div className="flex items-center justify-center gap-10 px-5 md:justify-evenly md:px-10 lg:px-52">
        {verificarWidth({ largura: 750 }) && (
          <div className="flex flex-col items-center justify-center gap-5 rounded-2xl md:w-full">
            <div className="rounded-4xl transition">
              <img className="h-60 w-60 rounded-4xl" src="assets/CriarConta.svg" alt="Login" />
            </div>
            <div className="p-5">
              <H3 title="Já tem sua conta?!" className="my-1 !text-[17px] tracking-wide text-blue-400" />
              <H3
                title="Faça login agora mesmo clicando no botão abaixo."
                className="my-1 !text-[16px] tracking-wide text-blue-300"
              />
            </div>
            <div>
              <Button type="button" onClick={() => navigate("/auth/login")}>
                <p className="text-white">Login!</p>
              </Button>
            </div>
          </div>
        )}
        <div className="flex-col items-center justify-center gap-2 rounded-4xl p-2 shadow-2xl shadow-blue-50 md:w-full min-md:py-4">
          <div className="text-center">
            <H1 title="Criar Conta" className="font-semibold text-blue-400 sm:text-3xl" />
          </div>
          <div className="w-full rounded-4xl p-4 md:p-2">
            <form onSubmit={onCreateUser} className="flex flex-col gap-5">
              <label className="flex flex-col items-start gap-1.5">
                <div className="flex w-full flex-col gap-1">
                  <P title="Usuario:" className="text-blue-400" />
                  <Input
                    onChange={handleSetValue}
                    name="user"
                    type="text"
                    placeholder="Digite seu nome de Usuário"
                    className="bg-white"
                  />
                </div>
                <P title={errorName.nameError} className="text-xs font-medium text-red-400" />
              </label>
              <label className="flex flex-col items-start gap-1.5">
                <div className="flex w-full flex-col gap-1">
                  <P title="Email:" className="text-blue-400" />
                  <div className="flex w-full flex-row items-center justify-center gap-2">
                    <Input
                      onChange={handleSetValue}
                      name="email"
                      type="email"
                      placeholder="Digite novamente seu email"
                      className="bg-white"
                    />
                  </div>
                </div>
                <P title={errorName.emailError} className="text-xs font-medium text-red-400" />
              </label>
              <label className="flex flex-col items-start gap-1.5">
                <div className="flex w-full flex-col gap-1">
                  <P title="Senha:" className="text-blue-400" />
                  <div className="flex w-full flex-row items-center justify-center gap-2">
                    <Input
                      onChange={handleSetValue}
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Digite seus senha"
                      className="bg-white"
                    />
                    <Button
                      onClick={() => setShowPassword(!showPassword)}
                      type="button"
                      className="!min-h-11 !min-w-11 !bg-white !p-0 !text-blue-400"
                    >
                      <i>
                        <FontAwesomeIcon icon={faEyeSlash} />
                      </i>
                    </Button>
                  </div>
                  <P title={errorName.passwordError} className="text-xs font-medium text-red-400" />
                </div>
              </label>
              <label className="flex flex-col items-start gap-1.5">
                <div className="flex w-full flex-col gap-1">
                  <P title="Repetir senha:" className="text-blue-400" />
                  <div className="flex w-full flex-row items-center justify-center gap-2">
                    <Input
                      onChange={handleSetValue}
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPass"
                      placeholder="Digite novamente sua senha"
                      className="bg-white"
                    />
                    <Button
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      type="button"
                      className="!min-h-11 !min-w-11 !bg-white !p-0 !text-blue-400"
                    >
                      <i>
                        <FontAwesomeIcon icon={faEyeSlash} />
                      </i>
                    </Button>
                  </div>
                  <P title={errorName.confirmPassError} className="text-xs font-medium text-red-400" />
                </div>
              </label>
              <div className="flex w-full flex-row items-center justify-center gap-5">
                <Button type="submit">
                  <p className="font-medium">Confirmar</p>
                </Button>
                <Button type="reset" className="!bg-white !text-blue-400">
                  <p className="font-medium">Cancelar</p>
                </Button>
              </div>
            </form>
          </div>
          <div className="w-full text-end">
            <NavLink to="/redefinir-senha" className="min-w-max text-sm font-medium text-blue-300">
              Esqueceu a senha?
            </NavLink>
          </div>
        </div>
      </div>
      {!verificarWidth({ largura: 750 }) && (
        <NavLink
          to="/login"
          className="flex flex-row items-center justify-center gap-2 text-blue-400 underline underline-offset-4"
        >
          <P title="Fazer login" className="font-medium" />
          <i>
            <FontAwesomeIcon icon={faAngleRight} />
          </i>
        </NavLink>
      )}
    </div>
  );
}
