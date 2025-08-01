import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";

interface uuidType {
  prefixo: string;
  sufixo: string;
}

export function useGeneratorUUID() {
  function generatorID({ prefixo, sufixo }: uuidType) {
    const uuid = uuidv4();
    const ano = dayjs().format("YYYY");
    const idPersonalizado = `${prefixo}-${uuid}-${ano}-${sufixo}`;
    return idPersonalizado;
  }

  return generatorID;
}
