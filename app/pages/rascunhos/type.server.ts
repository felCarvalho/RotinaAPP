import type { Task, Category } from "../Tasks/type.server";

export interface dataRascunhos {
  data: {
    t: Task[];
    c: Category[];
  };
  notification: [];
  code: number;
  success: boolean;
}
