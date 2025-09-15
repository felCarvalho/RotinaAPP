import { AuthStore } from "../../store/UseAuth";
import { redirect } from "react-router";

export function GuardLogin() {
  const { idLogin } = AuthStore.getState();

  if (!idLogin) {
    return redirect("/login");
  }

  return null;
}
