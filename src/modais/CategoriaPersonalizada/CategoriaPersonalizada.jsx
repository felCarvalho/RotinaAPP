import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../../component/btn";
import { HeaderContent } from "../../component/headerContent";
import { Overlay } from "../../component/overlay";
import { Input } from "../../component/input";
import { P } from "../../component/paragrafo";
import { TelasStore } from "../../store/UseTelasFixos";
import { useGeneratorUUID } from "../../hooks/UseGeneratorID";
import { RotinaStore } from "../../store/UseRotina";
import { useResizeView } from "../../hooks/UseResizeView";
import { AnimatePresence } from "framer-motion";

export function CreateCategoria() {
  const { closeID, isRenderID } = TelasStore();
  const { setCategoriaTask, categoriaTasks, uuid } = RotinaStore();
  const { verificarWidth } = useResizeView();

  const generatorID = useGeneratorUUID();

  function Handle(e) {
    const { name, value } = e.target;

    const verificar = name === "category";

    setCategoriaTask({
      categoria: verificar ? value : categoriaTasks,
      id: verificar ? generatorID({ prefixo: "@category", sufixo: `@${value}` }) : uuid,
    });
  }

  function OnSubmit(e) {
    e.preventDefault();

    closeID({ name: "create-category", id: 200, status: false });
    setCategoriaTask({
      categoria: "",
      id: "",
    });
  }

  return (
    <>
      <AnimatePresence>
        {isRenderID({ name: "create-category", id: 200 }) && (
          <Overlay
            initial={{ y: 500, scale: 0 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 500, scale: 0 }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 1, bounce: 0.3 }}
          >
            <div className="absolute right-2 left-2 rounded-[50px] bg-white shadow-2xl shadow-blue-100">
              <HeaderContent
                iconBack={faAngleLeft}
                iconClosed={faX}
                title={!verificarWidth({ largura: 360 }) ? "Categoria P." : "Categoria Personalizada"}
                btnBack={() => closeID({ name: "create-category", id: 200, status: false })}
                btnClosed={() => closeID({ name: "create-category", id: 200, status: false })}
                classNameHeaderDiv="!backdrop-blur-none"
              />
              <div>
                <form className="mt-20 px-5" onSubmit={OnSubmit}>
                  <label className="flex flex-col gap-1">
                    <P title="Criar Categoria" className="text-blue-400" />
                    <Input name="category" onChange={Handle} placeholder="Exemplo: 'Produtos industrializados'" />
                  </label>
                  <div className="mt-8 mb-5 flex flex-row items-center justify-center gap-5">
                    <Button
                      type="submmit"
                      className="flex max-w-min flex-row justify-start gap-2 bg-blue-400 text-sm font-medium"
                    >
                      <P title="Confirmar" className="text-white" />
                      <i>
                        <FontAwesomeIcon icon={faCheck} />
                      </i>
                    </Button>
                    <Button type="button" className="flex max-w-min flex-row justify-start gap-2 bg-gray-400 text-sm font-medium">
                      <P title="Cancelar" className="text-white" />
                      <i>
                        <FontAwesomeIcon icon={faX} />
                      </i>
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </Overlay>
        )}
      </AnimatePresence>
    </>
  );
}
