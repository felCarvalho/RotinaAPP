import { CreateRotina } from "./createRotina";
import { action } from "./controllers/action.server";
export { action };

export const handle = {
  typeRoute: "modal",
  route: "/home/create-rotina",
} as const;

export default function AddRotinaComponent() {
  return (
    <div className="h-full backdrop-blur-2xl">
      <CreateRotina />
    </div>
  );
}
