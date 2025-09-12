import { AuthStore } from "../../store/UseAuth";
import { redirect } from "react-router";

export function GuardLogin() {
  const { isAuthLogin } = AuthStore.getState();

  if (!isAuthLogin) {
    return redirect("/login");
  }

  return null;
}
