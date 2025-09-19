import { Navigate, Outlet } from "react-router";
import { AuthStore } from "../../store/UseAuth";

export function GuardLogin() {
  const { idLogin } = AuthStore();
  console.log(idLogin);
  if (!idLogin) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}
