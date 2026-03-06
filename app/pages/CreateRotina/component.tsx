import { CreateRotina } from "./createRotina";
import { action } from "./controllers/action.server";
export { action };
import { useRetiredScroll } from "../../utils/FunctionUtils/FunctionUtils";

export const handle = {
  typeRoute: "modal",
  route: "/home/create-rotina",
} as const;

export default function AddRotinaComponent() {
  //retira o scroll ao carregar o componente e aplica o scroll ao sair do componente
  useRetiredScroll();

  return (
    <div className="min-h-lvh backdrop-blur-2xl flex justify-center items-center z-50 relative">
      <CreateRotina />
    </div>
  );
}
