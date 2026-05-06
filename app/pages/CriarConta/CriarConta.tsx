import {
  faAngleRight,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Form, NavLink, useNavigation } from "react-router";
import { Button } from "../../component/btn";
import { Input } from "../../component/input";
import { P } from "../../component/paragrafo";
import { H3 } from "../../component/subTitle";
import { H1 } from "../../component/title";
import type { Data } from "../../utils/typesGlobals/type.server";
import { useActionData } from "react-router";
import { error as Alert } from "../../utils/FunctionUtils/FunctionUtils";

export function CriarContaJSX() {
  const data: Data<unknown> = useActionData();
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
                  <P title="Usuario:" className="text-blue-400" />
                  <input name="intent" type="hidden" value="login" />
                  <Input
                    name="name"
                    type="text"
                    placeholder="Digite seu nome de usuário"
                  />
                </div>
              </label>
              <label className="flex flex-col items-start gap-1.5">
                <div className="flex w-full flex-col gap-1">
                  <P title="Email:" className="text-blue-400" />
                  <div className="flex w-full flex-row items-center justify-center gap-2">
                    <Input
                      name="identifier"
                      type="email"
                      placeholder="Digite novamente seu email"
                    />
                  </div>
                </div>
              </label>
              <label className="flex flex-col items-start gap-1.5">
                <div className="flex w-full flex-col gap-1">
                  <P title="Senha:" className="text-blue-400" />
                  <div className="flex w-full flex-row items-center justify-center gap-2">
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Digite seus senha"
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
                </div>
              </label>
              <label className="flex flex-col items-start gap-1.5">
                <div className="flex w-full flex-col gap-1">
                  <P title="Repetir senha:" className="text-blue-400" />
                  <div className="flex w-full flex-row items-center justify-center gap-2">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      name="passwordConfirm"
                      placeholder="Digite novamente sua senha"
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
                </div>
              </label>
              <div className="flex w-full flex-row items-center justify-center gap-5">
                <Button type="submit" className="min-h-11">
                  <p className="text-white">
                    {navigation.state === "submitting"
                      ? "Confirmando..."
                      : "Confirmar"}
                  </p>
                </Button>
                <Button
                  type="reset"
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
