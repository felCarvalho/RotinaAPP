import { CriarContaJSX } from "./CriarConta";
import { action } from "./controllers/action.server";
import { handle } from "./controllers/handle";

export { action, handle };

export default function CriarContaComponent() {
  return <CriarContaJSX />;
}
