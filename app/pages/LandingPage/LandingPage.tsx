import {
  faArrowRight,
  faCheckCircle,
  faLayerGroup,
  faRocket,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { NavLink } from "react-router";
import { Button } from "../../component/btn";
import { P } from "../../component/paragrafo";
import { H3 } from "../../component/subTitle";
import { H1 } from "../../component/title";

export function LandingPageJSX() {
  const features = [
    {
      icon: faLayerGroup,
      title: "Categorias",
      description: "Organize suas tarefas em fluxos lógicos e personalizados.",
    },
    {
      icon: faCheckCircle,
      title: "Eficiência",
      description: "Acompanhe o status e foque no que realmente importa agora.",
    },
    {
      icon: faTrashAlt,
      title: "Segurança",
      description: "Lixeira e rascunhos para garantir que nada seja perdido.",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-600">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-8 md:px-12 lg:px-24">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded bg-slate-900" />
          <span className="text-lg font-bold tracking-tight">RotinaAPP</span>
        </div>
        <NavLink to="/login">
          <span className="text-sm font-medium text-slate-500 transition-colors hover:text-slate-900">
            Entrar
          </span>
        </NavLink>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-between px-6 py-16 md:flex-row md:px-12 lg:px-24 lg:py-24">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-xl text-center md:text-left"
        >
          <H1
            title="Sua rotina organizada com clareza."
            className="mb-6 text-4xl font-extrabold tracking-tight text-slate-900 shadow-none! md:text-6xl"
          />
          <P
            title="Um espaço minimalista projetado para você gerenciar tarefas e recuperar sua produtividade sem distrações inúteis."
            className="mb-10 text-lg leading-relaxed text-slate-500 shadow-none!"
          />
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center md:justify-start">
            <NavLink to="/criar-conta">
              <Button
                type="button"
                className="group flex items-center gap-2 bg-slate-900! px-8 py-4 text-white shadow-none! hover:bg-slate-800!"
              >
                <p className="font-semibold text-white">Começar agora</p>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="text-xs transition-transform group-hover:translate-x-1"
                />
              </Button>
            </NavLink>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 flex justify-center md:mt-0 md:w-1/2 lg:justify-end"
        >
          <img
            className="h-auto w-full max-w-sm opacity-90 drop-shadow-sm"
            src="assets/Innovation-amico.svg"
            alt="Productivity"
            loading="lazy"
          />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="border-y border-slate-50 bg-slate-50/30 px-6 py-24 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center md:items-start md:text-left"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-slate-100 bg-white text-slate-900 shadow-sm">
                <FontAwesomeIcon icon={feature.icon} className="text-lg" />
              </div>
              <H3
                title={feature.title}
                className="mb-3 text-lg font-bold text-slate-900"
              />
              <P
                title={feature.description}
                className="leading-relaxed text-slate-500 shadow-none!"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-24 text-center md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl rounded-[2.5rem] bg-slate-900 p-12 text-white shadow-2xl shadow-slate-200 md:p-20"
        >
          <div className="mb-8 flex justify-center text-3xl opacity-50">
            <FontAwesomeIcon icon={faRocket} />
          </div>
          <H1
            title="Transforme sua produtividade."
            className="mb-6 text-3xl font-bold text-white! shadow-none! md:text-4xl"
          />
          <P
            title="Junte-se a quem já descobriu a leveza de uma rotina bem organizada."
            className="mx-auto mb-10 max-w-md text-slate-300 shadow-none!"
          />
          <NavLink to="/criar-conta">
            <Button
              type="button"
              className="bg-white! px-10 py-4 text-slate-900! shadow-none! hover:bg-slate-50!"
            >
              <p className="font-bold">Criar conta grátis</p>
            </Button>
          </NavLink>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 md:px-12 lg:px-24">
        <div className="flex flex-col items-center justify-between gap-6 border-t border-slate-100 pt-8 md:flex-row">
          <P
            title="© 2026 RotinaAPP por Felipe Carvalho"
            className="text-xs font-semibold text-slate-400 shadow-none!"
          />
          <div className="flex gap-8">
            <a
              href="#"
              className="text-xs font-semibold text-slate-400 transition-colors hover:text-slate-600"
            >
              Termos
            </a>
            <a
              href="#"
              className="text-xs font-semibold text-slate-400 transition-colors hover:text-slate-600"
            >
              Privacidade
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
