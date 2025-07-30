//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { HeaderContent } from "../../component/headerContent";
import { P } from "../../component/paragrafo";
import { H3 } from "../../component/subTitle";
import { Radio } from "../../component/radio";
import { useNavigate, useOutletContext } from "react-router";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useCallback } from "react";
import { useResizeView } from "../../hooks/UseResizeView";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export function Temas() {
  const navigate = useNavigate();
  const { setLayout } = useOutletContext();
  const { verificarWidth } = useResizeView();
  const [prefersTheme, setPrefes] = useState(() => {
    try {
      const storagePrefersTheme = localStorage.getItem("tema");
      const getPrefers = JSON.parse(storagePrefersTheme);

      return getPrefers;
    } catch (e) {
      return {
        modoClaro: true,
        modoEscuro: false,
      };
    }
  });
  const [onTema, setTema] = useState(() => {
    try {
      const storageTema = localStorage.getItem("tema");
      const getTemas = JSON.parse(storageTema);

      return getTemas;
    } catch (e) {
      return {
        modoClaro: true,
        modoEscuro: false,
      };
    }
  });

  const focusThemeLight = useCallback(() => {
    return onTema?.modoClaro ? "bg-blue-50 outline-2 outline-offset-4 outline-blue-50" : "outline-0";
  }, [onTema]);

  const focusThemeDark = useCallback(() => {
    return onTema?.modoEscuro ? "bg-blue-950 outline-2 outline-offset-4 outline-blue-800 " : "outline-0";
  }, [onTema]);

  useEffect(() => {
    localStorage.setItem("tema", JSON.stringify(onTema));
  }, [onTema]);

  return (
    <div className="z-50 h-full overflow-y-auto rounded-[50px] bg-blue-50 p-5 shadow-sm shadow-blue-50">
      <HeaderContent
        title="Temas"
        iconBack={faAngleLeft}
        iconClosed={faX}
        btnBack={() => {
          setLayout({ isMobileLayout: false });
          navigate("/inicio/configuracoes");
        }}
        btnClosed={() => {
          setLayout({ isMobileLayout: false });
          navigate("/inicio/configuracoes");
        }}
        classNameBtn="bg-white !text-blue-400"
      />

      <div className="my-8 overflow-auto rounded-2xl border-b border-b-blue-50 bg-white p-4 shadow-sm shadow-blue-50">
        <div className="flex w-full flex-col items-start justify-around gap-5">
          <div className="flex w-full flex-row items-center justify-around gap-5 rounded-2xl bg-white">
            <motion.button
              onClick={() =>
                setTema((s) => ({
                  ...s,
                  modoClaro: true,
                  modoEscuro: false,
                }))
              }
              whileTap={{ scale: 0.9, opacity: 0.5 }}
              transition={{ type: "spring" }}
              className={`${focusThemeLight()} flex flex-col items-center justify-center rounded-2xl p-2`}
            >
              <div className="rounded-full bg-white p-4 shadow-md shadow-blue-50">
                <img src="../../../assets/Innovation-bro.svg" alt="" sizes="" className="w-36" />
              </div>
              <div className="flex flex-row items-center justify-center gap-2 pt-2">
                <H3 title={!verificarWidth({ largura: 1000 }) ? "Claro" : "Modo claro"} className="text-blue-400" />
                <i className="text-lg text-blue-400">
                  <FontAwesomeIcon icon={onTema?.modoClaro ? faCircleCheck : faCircleXmark} />
                </i>
              </div>
            </motion.button>
            <motion.button
              onClick={() =>
                setTema((s) => ({
                  ...s,
                  modoClaro: false,
                  modoEscuro: true,
                }))
              }
              whileTap={{ scale: 0.9, opacity: 0.5 }}
              transition={{ type: "spring" }}
              className={`${focusThemeDark()}flex flex-col items-center justify-center rounded-2xl p-2`}
            >
              <div className="rounded-full bg-blue-950 p-4">
                <img src="../../../assets/Innovation-amico.svg" alt="" sizes="" className="w-36" />
              </div>
              <div className="flex flex-row items-center justify-center gap-2 pt-2">
                <H3
                  title={!verificarWidth({ largura: 1000 }) ? "Escuro" : "Modo escuro"}
                  className={onTema?.modoEscuro ? "text-blue-50" : "text - blue - 950"}
                />
                <i className={`text-lg ${onTema?.modoEscuro ? "text-blue-50" : "text-blue-950"} `}>
                  <FontAwesomeIcon icon={onTema?.modoEscuro ? faCircleCheck : faCircleXmark} />
                </i>
              </div>
            </motion.button>
          </div>
          <div className="flex flex-col gap-4">
            <label className="flex flex-col items-start justify-center gap-2 px-2">
              <H3 title="Modo claro" className="text-blue-400" />
              <div className="flex flex-row items-center justify-start gap-5 rounded-2xl border border-blue-50 bg-blue-100/5 p-2">
                <Radio classNamemLabel="flex flex-row items-center justify-center gap-5" />
                <P
                  title="Aplica o modo claro para toda a interface, melhorando a visão dos elementos de tela para uma mlehor legibilidade."
                  className={"text-blue-300"}
                />
              </div>
            </label>
            <label className="flex flex-col items-start justify-center gap-2 px-2">
              <H3 title="Modo escuro" className="text-blue-400" />
              <div className="flex flex-row items-center justify-start gap-5 rounded-2xl border border-blue-50 bg-blue-100/5 p-2">
                <Radio classNamemLabel="flex flex-row items-center justify-center gap-5" />
                <P
                  title="Aplica o modo escuro para toda a interface, deixano a visão dos elementos de tela menos brilhantes e deixando o foco apenas nos textos..."
                  className={"text-blue-300"}
                />
              </div>
            </label>
            <label className="flex flex-col items-start justify-center gap-2 px-2">
              <H3 title="Modo automático" className="text-blue-400" />
              <div className="flex flex-row items-center justify-start gap-5 rounded-2xl border border-blue-50 bg-blue-100/5 p-2">
                <Radio classNamemLabel="flex flex-row items-center justify-center gap-5" />
                <P
                  title="Aplicando o modo automatico voçê ficará como a interface no mesmo modo que o seu dispositivo está... ideal para quem quer seguir sua preferencial pessoal."
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
