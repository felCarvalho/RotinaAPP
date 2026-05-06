import { type Rule } from "@felipe-lib/schema-local";
import { isRequired, maxLength, minLength, isEmail, matches } from "../validators";

export interface LoginProps {
  identifier: string;
  password: string;
}

export const loginRules: Rule<LoginProps>[] = [
  {
    key: "identifier",
    error: "Email é obrigatório",
    description: "Verifica se o email foi fornecido",
    runValidate: (data) => isRequired(data.identifier),
  },
  {
    key: "identifier",
    error: "Email inválido para login",
    description: "Valida formato do email",
    runValidate: (data) => isEmail(data.identifier),
  },
  {
    key: "password",
    error: "Senha é obrigatória",
    description: "Verifica se a senha foi fornecida",
    runValidate: (data) => isRequired(data.password),
  },
  {
    key: "password",
    error: "Senha deve ter pelo menos 6 caracteres",
    description: "Valida o tamanho mínimo da senha",
    runValidate: (data) => minLength(data.password, 6),
  },
  {
    key: "password",
    error: "Senha deve ter somente 150 caracteres",
    description: "Valida o tamanho máximo da senha",
    runValidate: (data) => maxLength(data.password, 150),
  },
];

export interface CreateUserProps {
  name: string;
  identifier: string;
  password: string;
  passwordConfirm: string;
}

export const createUserRules: Rule<CreateUserProps>[] = [
  {
    key: "name",
    error: "Nome de usuário é obrigatório",
    description: "Verifica se o nome foi fornecido",
    runValidate: (data) => isRequired(data.name),
  },
  {
    key: "name",
    error: "Ops! mínimo de 8 caracteres",
    description: "Valida o tamanho mínimo do nome",
    runValidate: (data) => minLength(data.name, 8),
  },
  {
    key: "name",
    error: "Ops! Esse nome de usuário está muito longo",
    description: "Valida o tamanho máximo do nome",
    runValidate: (data) => maxLength(data.name, 150),
  },
  {
    key: "identifier",
    error: "Email é obrigatório",
    description: "Verifica se o email foi fornecido",
    runValidate: (data) => isRequired(data.identifier),
  },
  {
    key: "identifier",
    error: "Seu formato de email está inválido",
    description: "Valida formato do email",
    runValidate: (data) => isEmail(data.identifier),
  },
  {
    key: "identifier",
    error: "Ops! Email precisa ter no mínimo 8 caracteres",
    description: "Valida o tamanho mínimo do email",
    runValidate: (data) => minLength(data.identifier, 8),
  },
  {
    key: "identifier",
    error: "Ops! Email pode ter no máximo 150 caracteres",
    description: "Valida o tamanho máximo do email",
    runValidate: (data) => maxLength(data.identifier, 150),
  },
  {
    key: "password",
    error: "Sua senha não pode ficar vazia",
    description: "Verifica se a senha foi fornecida",
    runValidate: (data) => isRequired(data.password),
  },
  {
    key: "password",
    error: "Ops! senha precisa ter no mínimo 8 caracteres",
    description: "Valida o tamanho mínimo da senha",
    runValidate: (data) => minLength(data.password, 8),
  },
  {
    key: "password",
    error: "Ops! Senha pode ter no máximo 150 caracteres",
    description: "Valida o tamanho máximo da senha",
    runValidate: (data) => maxLength(data.password, 150),
  },
  {
    key: "passwordConfirm",
    error: "Senha de confirmação é obrigatória",
    description: "Verifica se a confirmação de senha foi fornecida",
    runValidate: (data) => isRequired(data.passwordConfirm),
  },
  {
    key: "passwordConfirm",
    error: "Ops! Sua confirmação de senha não coincide com sua senha",
    description: "Valida o tamanho mínimo da confirmação",
    runValidate: (data) => minLength(data.passwordConfirm, 8),
  },
  {
    key: "passwordConfirm",
    error: "Ops! Sua confirmação de senha não coincide com sua senha",
    description: "Valida o tamanho máximo da confirmação",
    runValidate: (data) => maxLength(data.passwordConfirm, 150),
  },
  {
    key: "passwordConfirm",
    error: "Ops! Suas senhas não estão coincidindo",
    description: "Confirmação de senha deve ser igual à senha",
    runValidate: (data) => matches(data.passwordConfirm, data.password),
  },
];
