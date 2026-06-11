import {
  faAngleLeft,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router";
import { Button } from "../../component/btn";
import { H3 } from "../../component/subTitle";
import { Input } from "../../component/input";

export function Perfil() {
  return (
    <div className="h-full w-full">
      <div className="sticky top-0 z-40 mb-6 bg-white/80 px-2 py-4 backdrop-blur-md">
        <NavLink
          to="/home/configuracoes"
          className="flex w-min flex-row items-center gap-2 rounded-full px-2 hover:bg-blue-50"
        >
          <FontAwesomeIcon
            icon={faAngleLeft}
            className="text-blue-400"
            size="lg"
            aria-hidden="true"
          />
          <span className="w-max text-xl font-medium tracking-wide text-blue-400 sm:text-2xl lg:text-3xl">
            Conta
          </span>
        </NavLink>
      </div>

      <form
        aria-labelledby="perfil-dados-heading"
        noValidate
        className="mb-5"
      >
        <H3
          id="perfil-dados-heading"
          title="Dados Pessoais"
          className="mb-3 text-blue-400"
        />
        <div className="flex w-full flex-col items-start gap-5 rounded-3xl border border-blue-50 bg-white p-4 sm:p-5">
          <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center">
            <label htmlFor="perfil-nome" className="w-16 shrink-0 text-sm font-medium tracking-wide text-blue-400 sm:text-base">
              Nome:
            </label>
            <Input
              id="perfil-nome"
              name="user"
              type="text"
              autoComplete="name"
              className="flex-1 rounded-2xl! text-blue-800!"
            />
          </div>
          <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center">
            <label htmlFor="perfil-email" className="w-16 shrink-0 text-sm font-medium tracking-wide text-blue-400 sm:text-base">
              Email:
            </label>
            <Input
              id="perfil-email"
              name="email"
              type="email"
              autoComplete="email"
              className="flex-1 rounded-2xl! text-blue-800!"
            />
          </div>
          <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center">
            <label htmlFor="perfil-password" className="w-16 shrink-0 text-sm font-medium tracking-wide text-blue-400 sm:text-base">
              Senha:
            </label>
            <Input
              id="perfil-password"
              name="password"
              type="password"
              autoComplete="current-password"
              className="flex-1 rounded-2xl! text-blue-800!"
            />
          </div>
        </div>
      </form>

      <section aria-labelledby="perfil-conta-heading">
        <H3
          id="perfil-conta-heading"
          title="Conta"
          className="mb-3 text-blue-400"
        />
        <div className="flex w-full flex-col items-start gap-3 rounded-3xl border border-blue-50 bg-white p-4 sm:p-5">
          <div className="flex w-full flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-start">
            <span className="text-sm font-medium tracking-wide text-blue-400 sm:text-base">
              Sair:
            </span>
            <Button
              type="button"
              className="flex flex-row items-center justify-center gap-2 py-1! w-full sm:w-auto"
            >
              Sair da conta
              <span aria-hidden="true">
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
              </span>
            </Button>
          </div>
          <div className="flex w-full flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-start">
            <span className="text-sm font-medium tracking-wide text-blue-400 sm:text-base">
              Redefinir senha:
            </span>
            <Button
              type="button"
              onClick={() => {
                "";
              }}
              className="flex flex-row items-center justify-center gap-2 w-full sm:w-auto"
            >
              Redefinir
            </Button>
          </div>
          <div className="flex w-full flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-start">
            <span className="text-sm font-medium tracking-wide text-blue-400 sm:text-base">
              Deletar Conta:
            </span>
            <Button
              type="button"
              onClick={() => {
                "";
              }}
              className="flex flex-row items-center justify-center gap-2 w-full sm:w-auto bg-red-400! shadow-red-50! focus:shadow-red-50! focus:outline-red-400!"
            >
              Deletar
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
