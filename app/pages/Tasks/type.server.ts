type Task = {
  id: string;
  name: string;
  updateAt: string;
  createAt: string;
  deleteAt: string;
};

export type dataTasks = {
  data: Task[];
  success: boolean;
  notification: [];
  code: string;
};
