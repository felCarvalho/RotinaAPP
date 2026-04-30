import type { notification } from "../../utils/typesGlobals/type.server";

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: string;
  category: string | Category;
  user: string;
  updateAt: string;
  createAt: string;
  deleteAt: string;
}

export interface Category {
  id: string;
  title: string;
  description: string | null;
  user: string;
  status: string | null;
  updateAt: string;
  createAt: string;
  deleteAt: string;
}

export interface dataTasks {
  data: Task[];
  success: boolean;
  notification: notification[];
  code: string;
}
