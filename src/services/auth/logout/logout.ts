import { api } from "../../api/api";

export function logout({ email, password }: { email: string; password: string }) {
  return api.post("/auth/logout", { email, password });
}
