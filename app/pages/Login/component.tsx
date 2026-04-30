import { LoginJSX } from "./Login";
import { action } from "./controllers/action.server";

export { action };

export const handle = {
  title: "Login",
  createAccount: "Crie uma agora mesmo clicando no botão abaixo.",
};

export default function LoginComponent() {
  return <LoginJSX />;
}
