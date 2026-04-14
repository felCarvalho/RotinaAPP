import { AdicionarCategoria } from "./adicionarCategoria";
import { action } from "./controllers/action.server";

export default function () {
  return (
    <div>
      <AdicionarCategoria />
    </div>
  );
}

export { action };
