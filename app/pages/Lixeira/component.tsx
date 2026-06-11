import { LixeiraJSX } from "./Lixeira";
import { action } from "./controllers/action.server";
import { loader } from "./controllers/loader.server";

export { action, loader };

export default function LixeiraComponent() {
  return <LixeiraJSX />;
}
