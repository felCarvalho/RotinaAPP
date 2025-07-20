import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";

export function useGeneratorUUID() {
  function generatorID({ prefixo, sufixo }) {
    const uuid = uuidv4();
    const ano = dayjs().format("YYYY");
    const idPersonalizado = `${prefixo}-${uuid}-${ano}-${sufixo}`;
    return idPersonalizado;
  }

  return generatorID;
}
