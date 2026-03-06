import { faAngleLeft, faOutdent } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { HeaderContent } from "../../component/headerContent";
import { P } from "../../component/paragrafo";
import { Radio } from "../../component/radio";
import { H3 } from "../../component/subTitle";
import { faOctopusDeploy, faOdysee } from "@fortawesome/free-brands-svg-icons";

export function Temas() {
  return (
    <div className="z-50 h-full rounded-[50px] bg-blue-50 pb-5 shadow-sm shadow-blue-50">
      <HeaderContent
        iconClosed={faOutdent}
        title="Temas"
        iconBack={faAngleLeft}
        btnClosed={undefined}
        classNameBtn="bg-white !text-blue-400"
        classNameHeaderDiv="!backdrop-blur-[20px] !bg-blue-50/80"
        classNameBtnClosed="!min-w-0 !min-h-0"
      />
      <div className="scrollbar-hide mx-5 max-h-full overflow-auto rounded-3xl">
        <div className="flex h-full flex-col items-start justify-around gap-5 pt-25">
          <div className="flex w-full flex-row items-center justify-around gap-5 rounded-3xl bg-white p-5">
            <motion.button
              whileTap={{ scale: 0.9, opacity: 0.5 }}
              transition={{ type: "spring" }}
              className={""}
            >
              <div className="rounded-full bg-white shadow-md shadow-blue-50">
                <img
                  src="../../../assets/Innovation-bro.svg"
                  alt=""
                  sizes=""
                  className="w-36"
                />
              </div>
              <div className="flex flex-row items-center justify-center gap-2 pt-2">
                <H3 title={""} className="text-blue-400" />
                <i className="text-lg text-blue-400">
                  <FontAwesomeIcon icon={faOctopusDeploy} />
                </i>
              </div>
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9, opacity: 0.5 }}
              transition={{ type: "spring" }}
              className={""}
            >
              <div className="rounded-full bg-blue-950">
                <img
                  src="../../../assets/Innovation-amico.svg"
                  alt=""
                  sizes=""
                  className="w-36"
                />
              </div>
              <div className="flex flex-row items-center justify-center gap-2 pt-2">
                <H3 title={"Modo escuro"} className="" />
                <i className={`text-lg`}>
                  <FontAwesomeIcon icon={faOdysee} />
                </i>
              </div>
            </motion.button>
          </div>
          <div className="flex flex-col gap-4 rounded-3xl bg-white p-5 px-2">
            <label className="flex flex-col items-start justify-center gap-2 px-2">
              <H3 title="Modo automático" className="text-blue-400" />
              <div className="flex flex-row items-center justify-start gap-5 rounded-2xl border border-blue-50 bg-blue-100/5 p-2">
                <Radio
                  checked={true}
                  onChange={() => {}}
                  name="automatico"
                  classNameLabel="flex flex-row items-center justify-center gap-5"
                />
                <P
                  title="Aplicando o modo automatico voçê ficará como a interface no mesmo modo que o seu dispositivo está... ideal para quem quer seguir sua preferencial pessoal."
                  className={"text-blue-300"}
                />
              </div>
            </label>
            <label className="flex flex-col items-start justify-center gap-2 px-2">
              <H3 title="Modo claro" className="text-blue-400" />
              <div className="flex flex-row items-center justify-start gap-5 rounded-2xl border border-blue-50 bg-blue-100/5 p-2">
                <Radio
                  checked={true}
                  onChange={() => {}}
                  name="claro"
                  classNameLabel="flex flex-row items-center justify-center gap-5"
                />
                <P
                  title="Aplica o modo claro para toda a interface, melhorando a visão dos elementos de tela para uma melhor legibilidade."
                  className={"text-blue-300"}
                />
              </div>
            </label>
            <label className="flex flex-col items-start justify-center gap-2 px-2">
              <H3 title="Modo escuro" className="text-blue-400" />
              <div className="flex flex-row items-center justify-start gap-5 rounded-2xl border border-blue-50 bg-blue-100/5 p-2">
                <Radio
                  checked={true}
                  onChange={() => {}}
                  name="escuro"
                  classNameLabel="flex flex-row items-center justify-center gap-5"
                />
                <P
                  title="Aplica o modo escuro para toda a interface, deixano a visão dos elementos de tela menos brilhantes e deixando o foco apenas nos textos..."
                  className={"text-blue-300"}
                />
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
