import { api } from "../../api/api";

export function login({ email, password }: { email: string; password: string }) {
  return api.post("/auth/login", { email, password });
}
