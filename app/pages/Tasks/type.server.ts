export interface Task {
  id: string;
  title: string;
  description: string;
  completed: string;
  category: string | { title: string; id: string };
  user: string;
  updateAt: string;
  createAt: string;
  deleteAt: string;
}

export interface dataTasks {
  data: {
    data: Task[];
    success: boolean;
    notification: [];
    code: string;
  };
}
