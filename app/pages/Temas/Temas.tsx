import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { NavLink } from "react-router";
import { P } from "../../component/paragrafo";
import { H3 } from "../../component/subTitle";
import { faOctopusDeploy, faOdysee } from "@fortawesome/free-brands-svg-icons";

export function Temas() {
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
            Temas
          </span>
        </NavLink>
      </div>

      <section
        aria-label="Predefinições de tema"
        className="mb-5 flex w-full flex-col items-center justify-around gap-5 rounded-3xl border border-blue-50 bg-white p-4 sm:flex-row sm:p-5"
      >
        <motion.button
          whileTap={{ scale: 0.9, opacity: 0.5 }}
          transition={{ type: "spring" }}
          aria-label="Tema claro criativo"
        >
          <div className="rounded-full bg-white shadow-md shadow-blue-50">
            <img
              src="../../../assets/Innovation-bro.svg"
              alt=""
              role="presentation"
              className="max-w-32 w-full sm:w-36"
            />
          </div>
          <div className="flex flex-row items-center justify-center gap-2 pt-2">
            <span className="truncate text-base font-medium tracking-wide text-blue-400">
              Tema Claro
            </span>
            <span aria-hidden="true" className="text-lg text-blue-400">
              <FontAwesomeIcon icon={faOctopusDeploy} />
            </span>
          </div>
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.9, opacity: 0.5 }}
          transition={{ type: "spring" }}
          aria-label="Modo escuro"
        >
          <div className="rounded-full bg-blue-950 shadow-md shadow-blue-50">
            <img
              src="../../../assets/Innovation-amico.svg"
              alt=""
              role="presentation"
              className="max-w-32 w-full sm:w-36"
            />
          </div>
          <div className="flex flex-row items-center justify-center gap-2 pt-2">
            <span className="truncate text-base font-medium tracking-wide text-blue-400">
              Modo escuro
            </span>
            <span aria-hidden="true" className="text-lg">
              <FontAwesomeIcon icon={faOdysee} />
            </span>
          </div>
        </motion.button>
      </section>

      <fieldset className="flex w-full min-w-0 flex-col gap-4 overflow-hidden rounded-3xl border border-blue-50 bg-white p-4 sm:p-5">
        <legend className="sr-only">Selecionar modo do tema</legend>

        <label htmlFor="tema-auto" className="flex w-full cursor-pointer flex-col items-start gap-2 overflow-hidden">
          <H3 title="Modo automático" className="text-blue-400" />
          <div className="flex w-full flex-row items-center gap-4 rounded-2xl border border-blue-50 bg-blue-100/5 p-3">
            <span className="relative flex shrink-0 items-center">
              <input
                type="radio"
                id="tema-auto"
                name="tema"
                defaultChecked
                className="peer h-6 w-6 appearance-none rounded-full border-2 border-blue-100 bg-white outline-0 outline-offset-4 focus:outline-2 focus:outline-blue-50"
              />
              <span className="pointer-events-none absolute top-1 left-1 h-4 w-4 rounded-full peer-checked:bg-blue-400" />
            </span>
            <P
              title="Aplicando o modo automatico voçê ficará como a interface no mesmo modo que o seu dispositivo está... ideal para quem quer seguir sua preferencial pessoal."
              className="min-w-0 text-blue-500"
            />
          </div>
        </label>

        <label htmlFor="tema-claro" className="flex w-full cursor-pointer flex-col items-start gap-2 overflow-hidden">
          <H3 title="Modo claro" className="text-blue-400" />
          <div className="flex w-full flex-row items-center gap-4 rounded-2xl border border-blue-50 bg-blue-100/5 p-3">
            <span className="relative flex shrink-0 items-center">
              <input
                type="radio"
                id="tema-claro"
                name="tema"
                className="peer h-6 w-6 appearance-none rounded-full border-2 border-blue-100 bg-white outline-0 outline-offset-4 focus:outline-2 focus:outline-blue-50"
              />
              <span className="pointer-events-none absolute top-1 left-1 h-4 w-4 rounded-full peer-checked:bg-blue-400" />
            </span>
            <P
              title="Aplica o modo claro para toda a interface, melhorando a visão dos elementos de tela para uma melhor legibilidade."
              className="min-w-0 text-blue-500"
            />
          </div>
        </label>

        <label htmlFor="tema-escuro" className="flex w-full cursor-pointer flex-col items-start gap-2 overflow-hidden">
          <H3 title="Modo escuro" className="text-blue-400" />
          <div className="flex w-full flex-row items-center gap-4 rounded-2xl border border-blue-50 bg-blue-100/5 p-3">
            <span className="relative flex shrink-0 items-center">
              <input
                type="radio"
                id="tema-escuro"
                name="tema"
                className="peer h-6 w-6 appearance-none rounded-full border-2 border-blue-100 bg-white outline-0 outline-offset-4 focus:outline-2 focus:outline-blue-50"
              />
              <span className="pointer-events-none absolute top-1 left-1 h-4 w-4 rounded-full peer-checked:bg-blue-400" />
            </span>
            <P
              title="Aplica o modo escuro para toda a interface, deixano a visão dos elementos de tela menos brilhantes e deixando o foco apenas nos textos..."
              className="min-w-0 text-blue-500"
            />
          </div>
        </label>
      </fieldset>
    </div>
  );
}
