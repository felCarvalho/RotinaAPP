import { api } from "../../api/api";

export function deleteAccount({ email }: { email: string }) {
  return api.post("/auth/delete", { email });
}
