import { faAngleRight, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, NavLink, useActionData, useNavigation } from "react-router";
import { Button } from "../../component/btn";
import { Input } from "../../component/input";
import { P } from "../../component/paragrafo";
import { H3 } from "../../component/subTitle";
import { H1 } from "../../component/title";
import type { Data } from "../../utils/typesGlobals/type.server";

export function RedefinirSenhaJSX() {
  const data: Data<unknown> | undefined = useActionData();
  const navigation = useNavigation();

  const errors = data?.notification
    ?.filter((n) => n.type === "ERROR")
    ?.map((n) => n.message)
    ?.join(", ");

  return (
    <div className="flex min-h-lvh flex-col items-center justify-center gap-8 px-4 sm:gap-10 sm:px-5 md:px-0">
      <div className="flex w-full items-center justify-center md:max-w-md lg:w-5/12 lg:max-w-lg xl:w-4/12">
        <div className="xs:p-5 w-full flex-col items-center justify-center gap-2 rounded-4xl border border-blue-50 bg-white p-4 shadow-2xs shadow-blue-100 sm:p-6 md:p-8">
          {/* Ícone decorativo — escala responsiva */}
          <div className="mb-3 flex justify-center sm:mb-4">
            <div className="xs:h-14 xs:w-14 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 sm:h-16 sm:w-16">
              <span
                aria-hidden="true"
                className="xs:text-xl text-lg text-blue-400 sm:text-2xl"
              >
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
            </div>
          </div>

          <div className="text-center">
            <H1
              title="Redefinir Senha"
              className="font-semibold text-blue-400 sm:text-3xl"
            />
          </div>

          <div className="mt-1.5 text-center sm:mt-2">
            <H3
              title="Informe seu email para receber o link de redefinição."
              className="text-blue-300"
            />
          </div>

          <div className="mt-4 w-full rounded-4xl px-0 sm:mt-6 sm:px-2 md:px-4">
            <Form method="POST" className="flex flex-col gap-4 sm:gap-5">
              <label
                htmlFor="redefinir-email"
                className="flex flex-col items-start gap-1 sm:gap-1.5"
              >
                <div className="flex w-full flex-col items-start">
                  <P title="Email:" className="text-blue-400" />
                  <Input
                    id="redefinir-email"
                    name="identifier"
                    type="email"
                    autoComplete="email"
                    placeholder="Digite seu email"
                    className="bg-white shadow-none!"
                  />
                  <Input
                    name="intent"
                    type="hidden"
                    value="forgot-password"
                    className="bg-white shadow-none!"
                  />
                </div>
              </label>

              {/* Área de erro — role="alert" anuncia dinamicamente ao leitor de tela */}
              {errors && (
                <div
                  role="alert"
                  className="rounded-2xl bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-500"
                >
                  {errors}
                </div>
              )}

              {/* Botões — wrap preventivo + gaps responsivos + touch targets */}
              <div className="xs:gap-4 flex w-full flex-row flex-wrap items-center justify-center gap-3 sm:gap-5">
                <Button
                  type="submit"
                  className="xs:min-w-35 min-h-11 min-w-32.5"
                  status={navigation.state === "submitting"}
                >
                  <p className="text-white">
                    {navigation.state === "submitting"
                      ? "Enviando..."
                      : "Enviar email"}
                  </p>
                </Button>
                <Button
                  type="reset"
                  className="xs:min-w-30 min-h-11 min-w-27.5 bg-white! text-blue-400!"
                >
                  <p className="font-medium">Cancelar</p>
                </Button>
              </div>
            </Form>
          </div>

          {/* Separador */}
          <div className="mt-5 w-full sm:mt-6">
            <div className="flex items-center gap-2 px-2 sm:gap-3 sm:px-4">
              <hr className="flex-1 border-blue-50" />
              <P title="ou" className="text-xs text-blue-300" />
              <hr className="flex-1 border-blue-50" />
            </div>
          </div>

          <div className="mt-3 flex w-full flex-row items-center justify-center sm:mt-4">
            <NavLink
              to="/login"
              className="text-center text-sm font-medium text-blue-500 transition-colors hover:text-blue-600"
            >
              Lembrou a senha? Faça login
            </NavLink>
          </div>
        </div>
      </div>

      <NavLink
        to="/login"
        className="flex flex-row items-center justify-center gap-1.5 text-blue-400 underline underline-offset-4 transition-colors hover:text-blue-500 sm:gap-2"
      >
        <P title="Voltar ao login" className="font-medium" />
        <span aria-hidden="true">
          <FontAwesomeIcon icon={faAngleRight} size="lg" />
        </span>
      </NavLink>
    </div>
  );
}
