import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import * as z from "zod";
import { Button } from "../../component/btn";
import { Input } from "../../component/input";
import { P } from "../../component/paragrafo";
import { H3 } from "../../component/subTitle";
import { H1 } from "../../component/title";
import { useResizeView } from "../../hooks/UseResizeView";

// Interface para estruturar os erros de validação do formulário
interface FormloginError {
  user: string[];
  password: string[];
}

// Schema de validação do formulário usando Zod
const schemlogin = z.strictObject({
  user: z.string().min(7, { error: "Ops, usuario não existe" }).max(15, { error: "Ops, usuario não existe" }),
  password: z.string().min(7, { error: "Ops, senha não existe" }).max(20, { error: "Ops, senha não existe" }),
});

// Tipo para definir os nomes dos campos do formulário
type InputName = "user" | "password";

export function Login() {
  const { verificarWidth } = useResizeView();
  const [typeInput, setType] = useState<boolean>(true);
  const [formErrorLogin, setFormErrorLogin] = useState<FormloginError>({
    user: [],
    password: [],
  });
  const [formSuccessLogin, setFormsuccessLogin] = useState<z.infer<typeof schemlogin>>({ user: "", password: "" });
  const navigate = useNavigate();

  // Atualiza os valores dos campos do formulário
  function handleLoginAccount(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFormsuccessLogin((s) => ({ ...s, [name]: value }));
  }

  // Valida um campo específico quando perde o foco
  const verificarInputs = useCallback(
    ({ inputName }: { inputName: InputName }) => {
      const onValidationBlur = schemlogin.safeParse(formSuccessLogin);
      const data = onValidationBlur?.success ? [] : (z.flattenError(onValidationBlur?.error)?.fieldErrors?.[inputName] ?? []);

      setFormErrorLogin((s) => ({
        ...s,
        [inputName]: data,
      }));
    },
    [formSuccessLogin, setFormErrorLogin],
  );

  // Processa o envio do formulário e valida todos os campos
  function handleSubmitLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const onValidationSubmit = schemlogin.safeParse(formSuccessLogin);

    if (!onValidationSubmit?.success) {
      const error = z.flattenError(onValidationSubmit?.error);
      setFormErrorLogin((s) => ({
        ...s,
        ...error?.fieldErrors,
      }));
      return;
    }

    const data = onValidationSubmit?.data;

    setFormsuccessLogin((s) => ({
      ...s,
      ...data,
    }));
  }

  console.log({ formErrorLogin, formSuccessLogin });

  return (
    <div className="flex min-h-lvh items-center justify-center gap-10 px-5 md:justify-evenly md:px-10 lg:px-52">
      {verificarWidth({ largura: 750 }) && (
        <div className="flex flex-col items-center justify-center gap-5 rounded-2xl md:w-full">
          <div className="rounded-4xl transition">
            <img className="h-60 w-60 rounded-4xl" src="assets/Login.svg" alt="Login" />
          </div>
          <div className="p-5">
            <H3 title="Ainda não tem sua conta?!" className="my-1 !text-[17px] tracking-wide text-blue-400" />
            <H3
              title="Crie uma agora mesmo clicando no botão abaixo."
              className="my-1 !text-[16px] tracking-wide text-blue-300"
            />
          </div>
          <div>
            <Button type="button" onClick={() => navigate("/criar-conta")}>
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
          <form onSubmit={handleSubmitLogin} className="flex flex-col gap-5">
            <label className="flex flex-col items-start gap-1.5">
              <div className="flex w-full flex-col items-start">
                <P title="Usuario:" className="text-blue-400" />
                <Input
                  onChange={handleLoginAccount}
                  onBlur={() => verificarInputs({ inputName: "user" })}
                  name="user"
                  type="text"
                  placeholder="Digite seu nome de Usuário"
                  className="bg-white !shadow-none"
                />
              </div>
              <P title={`${formErrorLogin?.user}`} className="text-xs font-medium text-red-400" />
            </label>
            <label className="flex flex-col items-start gap-1.5">
              <P title="Senha:" className="text-blue-400" />
              <div className="flex w-full flex-row items-center justify-center gap-2">
                <Input
                  onChange={handleLoginAccount}
                  onBlur={() => verificarInputs({ inputName: "password" })}
                  name="password"
                  type={typeInput ? "password" : "text"}
                  placeholder="Digite seus senha"
                  className="bg-white !shadow-none"
                />
                <Button
                  type="button"
                  className="!min-h-11 !min-w-11 !bg-white !p-0 !text-blue-400"
                  onClick={() => setType((s) => !s)}
                >
                  <i>
                    <FontAwesomeIcon icon={typeInput ? faEye : faEyeSlash} />
                  </i>
                </Button>
              </div>
              <P title={`${formErrorLogin?.password}`} className="text-xs font-medium text-red-400" />
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
          <NavLink to="/redefinir-senha">
            <P title="Esqueceu a senha?" className="text-[13px] text-blue-300" />
          </NavLink>
        </div>
      </div>
    </div>
  );
}
