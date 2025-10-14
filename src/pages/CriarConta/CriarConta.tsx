import { faAngleRight, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import * as z from "zod";
import { Button } from "../../component/btn";
import { Input } from "../../component/input";
import { P } from "../../component/paragrafo";
import { H3 } from "../../component/subTitle";
import { H1 } from "../../component/title";
import { useGeneratorUUID } from "../../hooks/UseGeneratorID";
import { useResizeView } from "../../hooks/UseResizeView";
import { AuthStore } from "../../store/UseAuth";

// Controla visibilidade dos campos de senha
interface PropsTypeInput {
  password: boolean;
  repeatPassword: boolean;
}

// Estrutura dos erros de validação
interface FormError {
  user: string[];
  email: string[];
  password: string[];
  repeatPassword: string[];
}

// Nomes válidos dos campos do formulário
type InputName = "user" | "email" | "password" | "repeatPassword";

// Schema de validação Zod com regras de negócio
const schemaFormCreateAccount = z
  .strictObject({
    user: z
      .string()
      .min(7, { error: "Ops, usuário precisa ter pelo menos 7 caracteres" })
      .max(15, { error: "Ops, máximo de 15 caracteres atingido" }),
    email: z.email({ error: "Ops, email inválido" }),
    id: z.string().optional(),
    password: z
      .string()
      .min(7, { error: "Ops, senha deve ter pelo menos 7 caracteres" })
      .max(20, { error: "Ops, maximo de 20 caracteres atingido" }),
    repeatPassword: z.string().min(1, { error: "Ops! senha inválida" }),
  })
  .refine((p) => p?.password === p?.repeatPassword, {
    error: "Ops, senhas não coincidem",
    path: ["repeatPassword"],
  });

export function CriarConta() {
  const { verificarWidth } = useResizeView();
  const { createUser, verificarEmailCreateAccount, verificarUserCreateAccount, message, responseUser } = AuthStore();
  const [typeInput, setTypeInput] = useState<PropsTypeInput>({ password: true, repeatPassword: true });
  const [formError, setFormError] = useState<FormError>({
    user: [],
    email: [],
    password: [],
    repeatPassword: [],
  });
  const [formSuccess, setFormSuccess] = useState<z.infer<typeof schemaFormCreateAccount>>({
    user: "",
    email: "",
    password: "",
    repeatPassword: "",
    id: "",
  });
  const navigate = useNavigate();
  const generatorID = useGeneratorUUID();

  // Atualiza valores dos campos
  function handleCreateAccount(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFormSuccess((s) => ({
      ...s,
      [name]: value,
    }));
  }

  /**
   * Valida campo específico e atualiza seus erros
   * Usa safeParse síncrono para evitar problema de timing
   * Preserva erros de outros campos, atualiza apenas o campo atual
   */
  const verificarInputs = useCallback(
    ({ inputName }: { inputName: InputName }) => {
      const onValidationBlur = schemaFormCreateAccount.safeParse(formSuccess);
      const data = onValidationBlur?.success ? [] : (z.flattenError(onValidationBlur?.error)?.fieldErrors?.[inputName] ?? []);

      setFormError((s) => ({
        ...s,
        [inputName]: data,
      }));
    },
    [formSuccess, setFormError],
  );

  // Valida formulário no submit
  function handleSubmitCreateAccount(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const verificarForm = schemaFormCreateAccount.safeParse(formSuccess);

    if (!verificarForm?.success) {
      const error = z.flattenError(verificarForm?.error);
      setFormError((s) => ({
        ...s,
        ...error?.fieldErrors,
      }));
      return;
    }

    const data = verificarForm?.data;
    const verificandoEmail = verificarEmailCreateAccount({ email: data?.email });
    const verificandoUser = verificarUserCreateAccount({ user: data?.user });

    if (verificandoEmail || verificandoUser) {
      console.log("erro ao criar conta");
      return;
    }

    const id = generatorID({ prefixo: "@user", sufixo: "@minha-rotinaApp" });

    createUser({ user: data?.user, email: data?.email, password: data.password, id: id });
  }

  // Reseta formulário
  const clearForm = useCallback(() => {
    setFormError((s) => ({
      ...s,
      user: [],
      email: [],
      password: [],
      repeatPassword: [],
    }));

    setFormSuccess((s) => ({
      ...s,
      user: "",
      email: "",
      password: "",
      repeatPassword: "",
    }));
    responseUser({ message: "", user: "", email: "", password: "" });
  }, [formError, formSuccess, setFormError, setFormSuccess]);

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
              <Button type="button" onClick={() => navigate("/login")}>
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
            <form onSubmit={handleSubmitCreateAccount} className="flex flex-col gap-5">
              <label className="flex flex-col items-start gap-1.5">
                <div className="flex w-full flex-col gap-1">
                  <P title="Usuario:" className="text-blue-400" />
                  <Input
                    onChange={handleCreateAccount}
                    onBlur={() => verificarInputs({ inputName: "user" })}
                    name="user"
                    type="text"
                    placeholder="Digite seu nome de Usuário"
                    className="bg-white"
                  />
                </div>
                <P
                  title={`${formError?.user.length > 0 ? formError?.user : message?.error?.user}`}
                  className="text-xs font-medium text-red-400"
                />
              </label>
              <label className="flex flex-col items-start gap-1.5">
                <div className="flex w-full flex-col gap-1">
                  <P title="Email:" className="text-blue-400" />
                  <div className="flex w-full flex-row items-center justify-center gap-2">
                    <Input
                      onChange={handleCreateAccount}
                      onBlur={() => verificarInputs({ inputName: "email" })}
                      name="email"
                      type="email"
                      placeholder="Digite novamente seu email"
                      className="bg-white"
                    />
                  </div>
                </div>
                <P
                  title={`${formError?.email.length > 0 ? formError?.email : message?.error?.email}`}
                  className="text-xs font-medium text-red-400"
                />
              </label>
              <label className="flex flex-col items-start gap-1.5">
                <div className="flex w-full flex-col gap-1">
                  <P title="Senha:" className="text-blue-400" />
                  <div className="flex w-full flex-row items-center justify-center gap-2">
                    <Input
                      onChange={handleCreateAccount}
                      onBlur={() => verificarInputs({ inputName: "password" })}
                      name="password"
                      type={typeInput?.password ? "password" : "text"}
                      placeholder="Digite seus senha"
                      className="bg-white"
                    />
                    <Button
                      type="button"
                      className="!min-h-11 !min-w-11 !bg-white !p-0 !text-blue-400"
                      onClick={() =>
                        setTypeInput((s) => ({
                          ...s,
                          password: !s.password,
                        }))
                      }
                    >
                      <i>
                        <FontAwesomeIcon icon={typeInput?.password ? faEye : faEyeSlash} />
                      </i>
                    </Button>
                  </div>
                  <P title={`${formError?.password}`} className="text-xs font-medium text-red-400" />
                </div>
              </label>
              <label className="flex flex-col items-start gap-1.5">
                <div className="flex w-full flex-col gap-1">
                  <P title="Repetir senha:" className="text-blue-400" />
                  <div className="flex w-full flex-row items-center justify-center gap-2">
                    <Input
                      onChange={handleCreateAccount}
                      onBlur={() => verificarInputs({ inputName: "repeatPassword" })}
                      type={typeInput?.repeatPassword ? "password" : "text"}
                      name="repeatPassword"
                      placeholder="Digite novamente sua senha"
                      className="bg-white"
                    />
                    <Button
                      type="button"
                      className="!min-h-11 !min-w-11 !bg-white !p-0 !text-blue-400"
                      onClick={() =>
                        setTypeInput((s) => ({
                          ...s,
                          repeatPassword: !s.repeatPassword,
                        }))
                      }
                    >
                      <i>
                        <FontAwesomeIcon icon={typeInput?.repeatPassword ? faEye : faEyeSlash} />
                      </i>
                    </Button>
                  </div>
                  <P title={`${formError?.repeatPassword.at(-1) ?? ""}`} className="text-xs font-medium text-red-400" />
                </div>
              </label>
              <div className="flex w-full flex-row items-center justify-center gap-5">
                <Button type="submit">
                  <p className="font-medium">Confirmar</p>
                </Button>
                <Button onClick={() => clearForm()} type="reset" className="!bg-white !text-blue-400">
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
