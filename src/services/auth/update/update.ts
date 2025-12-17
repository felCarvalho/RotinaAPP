import { api } from "../../api/api";

export function update({ email, password }: { email: string; password: string }) {
  return api.post("/auth/update", { email, password });
}
