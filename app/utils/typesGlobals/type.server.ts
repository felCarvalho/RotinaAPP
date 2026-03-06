export const enum ActionTypesRequests {
  SUCCESS = "SUCCESS",
  ERROR_VALIDATION = "ERROR_VALIDATION",
  ERROR_INTERNAL = "ERROR_INTERNAL",
  ERROR_SERVER = "ERROR_SERVER",
}

type notification = {
  message: string;
  type: string;
};

export type Data<T> = {
  data: T | T[];
  success: boolean;
  code: number;
  notification: notification[];
};
