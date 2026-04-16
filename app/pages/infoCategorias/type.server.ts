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

export interface dataCategorias {
  data: Category[];
  success: boolean;
  notification: [];
  code: string;
}
