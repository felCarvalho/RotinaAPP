import {
  faAngleRight,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffectEvent, useState } from "react";
import { Form, NavLink, useNavigation } from "react-router";
import { Button } from "../../component/btn";
import { Input } from "../../component/input";
import { P } from "../../component/paragrafo";
import { H3 } from "../../component/subTitle";
import { H1 } from "../../component/title";
import { z } from "zod";
import { type FormErrors, InputNames } from "./type";
import type { Data } from "../../utils/typesGlobals/type.server";
import { useActionData } from "react-router";
import { error as Alert } from "../../utils/FunctionUtils/FunctionUtils";

const schemaCreateAccount = z
  .object({
    name: z
      .string({ error: "Nome de usuário é obrigátorio" })
      .min(8, "Ops! minímo de 8 caracteres")
      .max(150, "Ops! Esse nome de usua´rio está muito lonfo"),
    identifier: z
      .email("Seu formato de email está inválido")
      .min(8, "Ops! Email precisa ter no minímo 8 caracteres")
      .max(150, "Ops! Email pode ter no máximo 150 caracteres"),
    password: z
      .string("Sua senha não pode ficar vazia")
      .min(8, "Ops! senha precisa ter no minímo 8 caracteres")
      .max(150, "Ops! Senha pode ter no máximo 150 caracteres"),
    passwordConfirm: z
      .string("Senha de confirmação é obrigatória")
      .min(8, "Ops! Sua confirmação de senha não coincide com sua senha")
      .max(150, "Ops! Sua confirmação de senha não coincide com sua senha"),
  })
  .refine((s) => s.password === s.passwordConfirm, {
    path: ["passwordConfirm"],
    error: "Ops! Suas senhas não estão coincidindo",
  });

export function CriarContaJSX() {
  const data: Data<unknown> = useActionData();
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<z.infer<typeof schemaCreateAccount>>(
    {
      name: "",
      identifier: "",
      password: "",
      passwordConfirm: "",
    },
  );

  const [error, setError] = useState<FormErrors>({
    name: undefined,
    identifier: undefined,
    password: undefined,
    passwordConfirm: undefined,
  });

  function verifyForm(input: string) {
    const schemaSuccess = schemaCreateAccount.safeParse(formData);

    if (!schemaSuccess.success) {
      const error = z.flattenError(schemaSuccess.error).fieldErrors;

      switch (input) {
        case InputNames.name:
          setError((s) => ({ ...s, name: error.name }));
          break;
        case InputNames.identifier:
          setError((s) => ({ ...s, identifier: error.identifier }));
          break;
        case InputNames.password:
          setError((s) => ({ ...s, password: error.password }));
          break;
        case InputNames.passwordConfirm:
          setError((s) => ({
            ...s,
            passwordConfirm: error.passwordConfirm,
          }));
          break;

        default:
          setError((s) => ({ ...s, ...error }));
      }
    }
  }

  function verifyErrors() {
    if (
      !error.name ||
      !error.identifier ||
      !error.password ||
      !error.passwordConfirm
    ) {
      return false;
    }

    return true;
  }

  return (
    <div className="flex flex-col min-h-lvh items-center max-lg:mx-5 justify-center gap-5 py-5">
      <div className="w-full lg:w-4/12">
        <div className="flex w-full items-center justify-center gap-5 rounded-2xl md:w-full">
          {false && (
            <div>
              <div className="mt-20 p-5">
                <H3
                  title="Já tem sua conta?!"
                  className="my-1 tracking-wide text-blue-400"
                />
                <H3
                  title="Faça login agora mesmo clicando no botão abaixo."
                  className="my-1 tracking-wide text-blue-300"
                />
              </div>
              <div>
                <Button type="button" className="min-h-11" onClick={() => {}}>
                  <p className="text-white">Login!</p>
                </Button>
              </div>
            </div>
          )}
        </div>
        <div className="flex-col items-center justify-center gap-2 rounded-4xl max-md:p-2 shadow-2xs shadow-blue-50 md:w-full md:p-2">
          <div className="text-center">
            <H1
              title="Criar Conta"
              className="font-semibold text-blue-400 sm:text-3xl"
            />
          </div>
          <div className="w-full rounded-4xl max-md:p-4 md:p-4">
            <Form method="POST" className="flex flex-col gap-5 md:w-full">
              <label className="flex w-full flex-col items-start gap-1.5">
                <div className="flex w-full flex-col gap-1">
                  <P
                    title="Usuario:"
                    className={error.name ? "text-red-400" : "text-blue-400"}
                  />
                  <input name="intent" type="hidden" value="login" />
                  <Input
                    onBlur={() => verifyForm(InputNames.name)}
                    onChange={(e) =>
                      setFormData((s) => ({
                        ...s,
                        name: e.target.value,
                      }))
                    }
                    name={InputNames.name}
                    type="text"
                    placeholder="Digite seu nome de usuário"
                    className={
                      error.name && error?.name.at(-1)
                        ? "border-red-300 placeholder:text-red-300 focus:outline-red-300! bg-white!"
                        : ""
                    }
                  />
                </div>
                {error?.name?.at(-1) && (
                  <P
                    title={error.name.at(-1) ?? ""}
                    className="font-medium text-red-400"
                  />
                )}
              </label>
              <label className="flex flex-col items-start gap-1.5">
                <div className="flex w-full flex-col gap-1">
                  <P
                    title="Email:"
                    className={
                      error?.identifier?.at(-1)
                        ? "text-red-400"
                        : "text-blue-400"
                    }
                  />
                  <div className="flex w-full flex-row items-center justify-center gap-2">
                    <Input
                      onBlur={() => verifyForm(InputNames.identifier)}
                      onChange={(e) =>
                        setFormData((s) => ({
                          ...s,
                          identifier: e.target.value,
                        }))
                      }
                      name={InputNames.identifier}
                      type="email"
                      placeholder="Digite novamente seu email"
                      className={
                        error?.identifier
                          ? "border-red-300 placeholder:text-red-300 focus:outline-red-300! bg-white!"
                          : ""
                      }
                    />
                  </div>
                </div>
                {error?.identifier?.at(-1) && (
                  <P
                    title={error.identifier.at(-1) ?? ""}
                    className="font-medium text-red-400"
                  />
                )}
              </label>
              <label className="flex flex-col items-start gap-1.5">
                <div className="flex w-full flex-col gap-1">
                  <P
                    title="Senha:"
                    className={
                      error.password ? "text-red-400" : "text-blue-400"
                    }
                  />
                  <div className="flex w-full flex-row items-center justify-center gap-2">
                    <Input
                      onBlur={() => verifyForm(InputNames.password)}
                      onChange={(e) =>
                        setFormData((s) => ({
                          ...s,
                          password: e.target.value,
                        }))
                      }
                      type={showPassword ? "text" : "password"}
                      name={InputNames.password}
                      placeholder="Digite seus senha"
                      className={
                        error?.password?.at(-1)
                          ? "border-red-300 placeholder:text-red-300 focus:outline-red-300! bg-white!"
                          : ""
                      }
                    />
                    <Button
                      onClick={() => setShowPassword((s) => !s)}
                      type="button"
                      className="min-h-11! min-w-11! bg-white! text-blue-400!"
                    >
                      <i>
                        <FontAwesomeIcon
                          icon={showPassword ? faEyeSlash : faEye}
                          size="lg"
                        />
                      </i>
                    </Button>
                  </div>
                  {error?.password?.at(-1) && (
                    <P
                      title={error.password.at(-1) ?? ""}
                      className="font-medium text-red-400"
                    />
                  )}
                </div>
              </label>
              <label className="flex flex-col items-start gap-1.5">
                <div className="flex w-full flex-col gap-1">
                  <P
                    title="Repetir senha:"
                    className={
                      error.passwordConfirm ? "text-red-400" : "text-blue-400"
                    }
                  />
                  <div className="flex w-full flex-row items-center justify-center gap-2">
                    <Input
                      onBlur={() => verifyForm(InputNames.passwordConfirm)}
                      onChange={(e) =>
                        setFormData((s) => ({
                          ...s,
                          passwordConfirm: e.target.value,
                        }))
                      }
                      type={showConfirmPassword ? "text" : "password"}
                      name={InputNames.passwordConfirm}
                      placeholder="Digite novamente sua senha"
                      className={
                        error?.passwordConfirm?.at(-1)
                          ? "border-red-300 placeholder:text-red-300 focus:outline-red-300! bg-white!"
                          : ""
                      }
                    />
                    <Button
                      onClick={() => setShowConfirmPassword((s) => !s)}
                      type="button"
                      className="min-h-11! min-w-11! bg-white! text-blue-400!"
                    >
                      <i>
                        <FontAwesomeIcon
                          icon={showConfirmPassword ? faEyeSlash : faEye}
                          size="lg"
                        />
                      </i>
                    </Button>
                  </div>
                  {error?.passwordConfirm?.at(-1) && (
                    <P
                      title={error.passwordConfirm.at(-1) ?? ""}
                      className="font-medium text-red-400"
                    />
                  )}
                </div>
              </label>
              <div className="flex w-full flex-row items-center justify-center gap-5">
                <Button
                  onClick={() => verifyForm("tudo")}
                  className="min-h-11"
                  type={
                    verifyErrors() && navigation.state === "submitting"
                      ? "button"
                      : "submit"
                  }
                >
                  <p
                    className={
                      verifyErrors() && navigation.state === "submitting"
                        ? "bg-blue-300 text-blue-100"
                        : "text-white"
                    }
                  >
                    {navigation.state === "submitting"
                      ? "Confirmando..."
                      : "Confirmar"}
                  </p>
                </Button>
                <Button
                  type="reset"
                  onClick={() => setError({})}
                  className="min-h-11 bg-white! text-blue-400!"
                >
                  <p className="font-medium">Cancelar</p>
                </Button>
              </div>
            </Form>
          </div>
          <div className="w-full text-end">
            <NavLink
              to="/redefinir-senha"
              className="min-w-max font-medium text-blue-300"
            >
              Esqueceu a senha?
            </NavLink>
          </div>
        </div>
      </div>
      <NavLink
        to="/login"
        className="flex flex-row items-center justify-center gap-2 text-blue-400 underline underline-offset-4"
      >
        <P title="Fazer login" className="font-medium" />
        <i>
          <FontAwesomeIcon icon={faAngleRight} size="lg" />
        </i>
      </NavLink>
    </div>
  );
}
