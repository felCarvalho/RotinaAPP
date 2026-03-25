import { AdicionarTarefa } from "./adicionarTarefa";
import { action } from "./controllers/action.server";

export default function AdicionarTarefaComponent() {
  return (
    <div>
      <AdicionarTarefa />
    </div>
  );
}

export { action };
