import { faAngleLeft, faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { H1 } from "../../component/title";
import { NavLink } from "react-router";
import { Input } from "../../component/input";
import { P } from "../../component/paragrafo";
import { Form } from "react-router";
import { Button } from "~/component/btn";

export function AdicionarTarefa() {
  return (
    <div className="h-full w-full">
      <div className="w-full">
        <NavLink
          to="/home"
          className="flex w-min flex-row items-center gap-2 rounded-full px-2 hover:bg-blue-50"
        >
          <FontAwesomeIcon icon={faAngleLeft} className="text-blue-400" />
          <H1
            title="Adicione uma tarefa"
            className="w-max text-lg! text-blue-400"
          />
        </NavLink>
      </div>
      <Form method="POST" className="flex flex-col gap-3 pt-3">
        <div className="flex h-full flex-col gap-2.5 rounded-2xl border border-solid border-blue-50/85 bg-blue-50/10 p-3">
          <label className="flex flex-col gap-1">
            <P title="Rotina:" className="text-blue-400" />
            <input
              type="hidden"
              placeholder="Exemplo: 'Criar uma lading page...'"
              name="intent"
              value="adicionar-tarefa"
            />
            <Input
              type="text"
              placeholder="Exemplo: 'Criar uma lading page...'"
              name="titleTask"
            />
          </label>
          <label className="flex flex-col gap-1">
            <P title="Descrição para rotina:" className="text-blue-400" />
            <Input
              type="text"
              className=""
              placeholder="Exemplo: 'landing page deve ter...'"
              name="descriptionTask"
            />
          </label>
        </div>
        <div className="flex w-full flex-row items-center justify-center gap-5">
          <Button
            type="submit"
            className="flex flex-row items-center justify-center gap-1.5"
          >
            <p className="text-base font-medium text-white">Confirmar</p>
            <i>
              <FontAwesomeIcon icon={faCheck} className="text-white" />
            </i>
          </Button>
          <Button
            type="reset"
            className="flex flex-row items-center justify-center gap-1.5 bg-gray-400!"
          >
            <p className="text-base font-medium text-white">cancelar</p>
            <FontAwesomeIcon icon={faX} className="text-white" />
          </Button>
        </div>
        <div>
          <P title="" />
        </div>
      </Form>
    </div>
  );
}
