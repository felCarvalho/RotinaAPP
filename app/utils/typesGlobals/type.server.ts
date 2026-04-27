export interface notification {
  message: string;
  type: "ERROR" | "WARNING" | "INFO";
}

export interface Data<T> {
  data: T | T[];
  success: boolean;
  code: number;
  notification: notification[] | null;
}
