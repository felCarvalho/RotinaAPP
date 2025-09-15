import { v4 as uuidv4 } from "uuid";

interface uuidType {
  prefixo: string;
  sufixo: string;
}

export function useGeneratorUUID() {
  function generatorID({ prefixo, sufixo }: uuidType) {
    const uuid = uuidv4();
    const idPersonalizado = `${prefixo}-${uuid}-${sufixo}`;
    return idPersonalizado;
  }

  return generatorID;
}
