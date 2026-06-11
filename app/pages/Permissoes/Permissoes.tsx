import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router";
import { P } from "../../component/paragrafo";
import { H3 } from "../../component/subTitle";

export function Permissoes() {
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
            Permissões
          </span>
        </NavLink>
      </div>

      <section aria-labelledby="permissoes-heading">
        <H3
          id="permissoes-heading"
          title="Permissoes de acesso"
          className="mb-3 text-blue-400"
        />
        <div className="flex w-full flex-col gap-4 rounded-3xl border border-blue-50 bg-white p-4 sm:p-5">
          <div className="flex flex-row items-center gap-3 rounded-2xl border border-blue-50 bg-blue-100/5 p-3">
            <div className="flex flex-col gap-0.5">
              <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium tracking-wide text-blue-500">
                Em desenvolvimento
              </span>
              <P
                title="As permissoes de acesso estarao disponiveis em breve."
                className="text-blue-500"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
