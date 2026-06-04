import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faRobot,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { Form } from "react-router";
import { H1 } from "../../component/title";
import { P } from "../../component/paragrafo";
import { Button } from "../../component/btn";
import { Input } from "../../component/input";

export function Chat() {
  return (
    <div className="flex h-full flex-col">
      <div className="sticky top-0 z-40 bg-white/80 px-2 py-4 backdrop-blur-md">
        <button className="flex w-min cursor-pointer flex-row items-center gap-2 rounded-full px-2 hover:bg-blue-50">
          <FontAwesomeIcon
            icon={faAngleLeft}
            className="text-blue-400"
            size="lg"
          />
          <H1 title="Chat IA" className="w-max text-blue-400" />
        </button>
      </div>

      <div className="scrollbar-hide flex-1 overflow-y-auto px-4 py-4">
        <div className="flex h-full flex-col items-center justify-center gap-6 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-50"
          >
            <FontAwesomeIcon
              icon={faRobot}
              size="2xl"
              className="text-blue-400"
            />
          </motion.div>

          <H1
            title="Olá! Como posso ajudar?"
            className="text-center text-blue-400"
          />

          <div className="flex flex-col gap-3">
            <div className="rounded-2xl border border-blue-50 bg-linear-to-r from-blue-50/60 p-4 text-left shadow-xs">
              <P title="Adicionar tarefa" className="text-blue-400" />
              <P
                title='Ex: "adicione a tarefa Estudar React na categoria Pessoal com a descrição revisar hooks e contextos"'
                className="mt-1 text-sm text-blue-300"
              />
            </div>

            <div className="rounded-2xl border border-blue-50 bg-linear-to-r from-blue-50/60 p-4 text-left shadow-xs">
              <P title="Atualizar tarefa" className="text-blue-400" />
              <P
                title='Ex: "marque a tarefa Estudar React como concluída" ou "altere o título da tarefa que fala sobre hooks para React Avançado"'
                className="mt-1 text-sm text-blue-300"
              />
            </div>

            <div className="rounded-2xl border border-blue-50 bg-linear-to-r from-blue-50/60 p-4 text-left shadow-xs">
              <P title="Criar rotina" className="text-blue-400" />
              <P
                title='Ex: "crie uma rotina chamada Saúde com a descrição exercícios e alimentação"'
                className="mt-1 text-sm text-blue-300"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 z-30 bg-white/80 px-2 py-3 backdrop-blur-md">
        <Form method="POST" className="flex items-center gap-2">
          <Input
            type="hidden"
            name="intent"
            value="question"
          />
          <Input
            type="text"
            placeholder="Ex: adicione a tarefa 'Estudar' na categoria 'Pessoal'"
            className="flex-1"
            name="question"
          />
          <Button
            type="submit"
            className="flex aspect-square min-h-11 min-w-11 items-center justify-center p-0!"
            ariaLabel="Enviar mensagem"
          >
            <FontAwesomeIcon icon={faPaperPlane} size="sm" />
          </Button>
        </Form>
      </div>
    </div>
  );
}
