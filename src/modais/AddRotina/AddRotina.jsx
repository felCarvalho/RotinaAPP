import { Button } from "../../component/btn";
import { Input } from "../../component/input";
import { Overlay } from "../../component/overlay";
import { HeaderContent } from "../../component/headerContent";
import { P } from "../../component/paragrafo";
import { faAngleLeft, faAngleRight, faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TelasStore } from "../../store/UseTelasFixos";
import { useGeneratorUUID } from "../../hooks/UseGeneratorID";
import { RotinaStore } from "../../store/UseRotina";
import { useCallback, useState } from "react";
import { AnimatePresence } from "framer-motion";

export function CreateRotina() {
  const { closeID, openID, isRenderID } = TelasStore();
  const { setCategoriaTask, setDataTask, setFilter, filterId, uuid, categoriaTasks, searchTask } = RotinaStore();
  const [isOpen, setOpen] = useState(false);
  const [task, setTask] = useState({
    rotina: "",
    descricao: "",
    id: "",
    status: false,
    deletada: false,
    categoriaID: "",
    data: "",
  });
  const generatorID = useGeneratorUUID();

  function HandleInput(e) {
    const { value, name } = e.target;
    const id = generatorID({ prefixo: "@minha-rotina", sufixo: "@task" });

    setTask((p) => ({ ...p, [name]: value, id: id }));
  }

  function verificarDados({ value }) {
    return !value?.rotina.trim() && !categoriaTasks && !uuid;
  }

  const selectionCategory = useCallback(
    ({ category }) => {
      const uuid = generatorID({ prefixo: "@category", sufixo: `@${category}` });
      console.log(category);

      setCategoriaTask({ categoria: category, id: uuid });
    },
    [generatorID, setCategoriaTask],
  );

  const onSubmit = (e) => {
    e.preventDefault();

    if (verificarDados({ value: task })) {
      return;
    }

    setDataTask({ task: task });
    setFilter({ id: filterId });
    searchTask();
    setCategoriaTask({ categoria: "", id: "" });
    setTask((p) => ({
      ...p,
      rotina: "",
      descricao: "",
      id: "",
      status: false,
      categoriaID: "",
      data: "",
    }));
    closeID({ name: "create-rotina", id: 100, status: false });
  };

  return (
    <>
      <AnimatePresence>
        {isRenderID({ name: "create-rotina", id: 100 }) && (
          <Overlay
            initial={{ y: 500, scale: 0, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 500, scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 1, bounce: 0.3 }}
          >
            <div
              onDoubleClick={() => setOpen(false)}
              className="absolute right-2 left-2 rounded-[50px] bg-white p-5 shadow-2xl shadow-blue-100"
            >
              <HeaderContent
                iconBack={faAngleLeft}
                title="Adicionar Rotina"
                iconClosed={faX}
                btnBack={() => closeID({ name: "create-rotina", id: 100, status: false })}
                btnClosed={() => closeID({ name: "create-rotina", id: 100, status: false })}
              />
              <div className="relative mt-16">
                <form className="flex flex-col justify-center gap-5" onSubmit={onSubmit}>
                  <label className="flex flex-col gap-1">
                    <P title="Rotina:" className="text-blue-400" />
                    <Input
                      status={isOpen ? true : false}
                      className=""
                      placeholder="Exemplo: 'Criar uma lading page...'"
                      name="rotina"
                      onChange={HandleInput}
                    />
                  </label>
                  <label className="flex max-w-min flex-col gap-1">
                    <P title="Categoria:" className="text-blue-400" />
                    <Button type="button" onClick={() => setOpen(true)} className="flex flex-row justify-start gap-2">
                      <p className="text-base font-medium text-white">Selecionar</p>
                      <i>
                        <FontAwesomeIcon icon={faAngleRight} />
                      </i>
                    </Button>
                  </label>
                  {isOpen && (
                    <div className="absolute bottom-3 -left-2 rounded-3xl bg-white p-3 shadow-xs shadow-blue-100">
                      <div className="flex max-w-min flex-col gap-2">
                        <Button
                          type="button"
                          className="bg-white text-left font-medium shadow-sm shadow-blue-50"
                          onClick={() => {
                            setOpen(false);
                            selectionCategory({ category: "Trabalho" });
                          }}
                        >
                          <P title="Traballho" className="text-blue-400" />
                        </Button>
                        <Button
                          type="button"
                          className="bg-white text-left font-medium shadow-sm shadow-blue-50"
                          onClick={() => {
                            setOpen(false);
                            selectionCategory({ category: "Estudos" });
                          }}
                        >
                          <P title="Estudos" className="text-blue-400" />
                        </Button>
                        <Button
                          type="button"
                          className="bg-white text-left font-medium shadow-sm shadow-blue-50"
                          onClick={() => {
                            setOpen(false);
                            selectionCategory({ category: "Finanças" });
                          }}
                        >
                          <P title="Finanças" className="text-blue-400" />
                        </Button>
                        <Button
                          type="button"
                          className="bg-white text-left font-medium shadow-sm shadow-blue-50"
                          onClick={() => {
                            setOpen(false);
                            selectionCategory({ category: "Lazer" });
                          }}
                        >
                          <P title="Lazer" className="text-blue-400" />
                        </Button>
                        <Button
                          type="button"
                          className="flex flex-row items-center gap-2 text-left font-medium shadow-sm shadow-blue-50"
                          onClick={() => openID({ name: "create-category", id: 200, status: true })}
                        >
                          <P title="Criar categoria" className="whitespace-nowrap text-white" />
                          <i>
                            <FontAwesomeIcon icon={faAngleRight} />
                          </i>
                        </Button>
                      </div>
                    </div>
                  )}
                  <label className="mb-8 flex flex-col gap-1">
                    <P title="Descrição:" className="text-blue-400" />
                    <Input
                      status={isOpen ? true : false}
                      className=""
                      placeholder="Exemplo: 'landing page deve ter...'"
                      name="descricao"
                      onChange={HandleInput}
                    />
                  </label>
                  <div className="flex flex-row items-center justify-center gap-5">
                    <Button type="submit" className="flex flex-row justify-start gap-2">
                      <p className="text-base font-medium text-white">confirmar</p>

                      <i>
                        <FontAwesomeIcon icon={faCheck} />
                      </i>
                    </Button>
                    <Button type="reset" className="flex flex-row justify-start gap-2 bg-gray-400">
                      <p className="text-base font-medium text-white">cancelar</p>
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
