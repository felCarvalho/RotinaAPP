import {
  faAngleRight,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Form, NavLink } from "react-router";
import { Button } from "../../component/btn";
import { Input } from "../../component/input";
import { P } from "../../component/paragrafo";
import { H3 } from "../../component/subTitle";
import { H1 } from "../../component/title";

export function LoginJSX() {
  const [isOpenPassword, setOpenPassword] = useState(false);

  return (
    <div className="flex min-h-lvh flex-col items-center justify-center gap-10">
      <div className="flex items-center justify-center gap-10 px-5 md:justify-evenly md:px-10 lg:px-52">
        <div className="flex flex-col items-center justify-center gap-5 rounded-2xl max-lg:hidden md:w-full">
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
            <H3 title={""} className="my-1 tracking-wide text-blue-400" />
            <H3 title={""} className="my-1 tracking-wide text-blue-300" />
          </div>
          <div>
            <Button type="button" className="min-h-11" onClick={() => ""}>
              <p className="text-white">Abrir Conta!</p>
            </Button>
          </div>
        </div>
        <div className="flex-col items-center justify-center gap-2 rounded-4xl border border-blue-50 p-2 shadow-2xs shadow-blue-50 md:w-full md:py-4">
          <div className="text-center">
            <H1
              title="Login"
              className="font-semibold text-blue-400 sm:text-3xl"
            />
          </div>
          <div className="w-full rounded-4xl p-4 md:p-2">
            <Form method="POST" className="flex flex-col gap-5">
              <label className="flex flex-col items-start gap-1.5">
                <div className="flex w-full flex-col items-start">
                  <P title="Email:" className="text-blue-400" />
                  <Input
                    name="identifier"
                    type="email"
                    placeholder="Digite seu nome de Usuário"
                    className="bg-white shadow-none!"
                  />
                  <Input
                    name="intent"
                    type="hidden"
                    value="login"
                    className="bg-white shadow-none!"
                  />
                </div>
              </label>
              <label className="flex flex-col items-start gap-1.5">
                <P title="Senha:" className="text-blue-400" />
                <div className="flex w-full flex-row items-center justify-center gap-2">
                  <Input
                    type={isOpenPassword ? "text" : "password"}
                    name="password"
                    placeholder="Digite seus senha"
                    className="bg-white shadow-none!"
                  />
                  <Button
                    type="button"
                    className="min-h-11! min-w-11! bg-white! text-blue-400!"
                    onClick={() => setOpenPassword((s) => !s)}
                  >
                    <i>
                      <FontAwesomeIcon
                        icon={isOpenPassword ? faEyeSlash : faEye}
                        size="lg"
                      />
                    </i>
                  </Button>
                </div>
              </label>
              <div className="flex w-full flex-row items-center justify-center gap-5">
                <Button type="submit" className="min-h-11">
                  <p className="font-medium">Confirmar</p>
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
          <div className="mt-5 flex w-full flex-row items-center justify-between">
            <P title={""} className="font-medium text-red-400" />
            <NavLink to="/redefinir-senha">
              <P title="Esqueceu a senha?" className="text-blue-300" />
            </NavLink>
          </div>
        </div>
      </div>
      <NavLink
        to="/criar-conta"
        className="flex flex-row items-center justify-center gap-2 text-blue-400 underline underline-offset-4"
      >
        <P title="Abrir conta" className="font-medium" />
        <i>
          <FontAwesomeIcon icon={faAngleRight} size="lg" />
        </i>
      </NavLink>
    </div>
  );
}
