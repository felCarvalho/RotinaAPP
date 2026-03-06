export interface FormErrors {
  name?: string[] | undefined;
  identifier?: string[] | undefined;
  password?: string[] | undefined;
  passwordConfirm?: string[] | undefined;
}

export enum InputNames {
  name = "name",
  identifier = "identifier",
  password = "password",
  passwordConfirm = "passwordConfirm",
}
