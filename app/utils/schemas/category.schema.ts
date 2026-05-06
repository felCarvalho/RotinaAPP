import { type Rule } from "@felipe-lib/schema-local";
import { isRequired, maxLength, minLength, isInEnum } from "../validators";

export interface CreateCategoryProps {
  titleCategory: string;
  descriptionCategory?: string;
  status: string;
}

export const createCategoryRules: Rule<CreateCategoryProps>[] = [
  {
    key: "titleCategory",
    error: "O título da categoria é obrigatório",
    description: "Verifica se o título foi fornecido",
    runValidate: (data) => isRequired(data.titleCategory),
  },
  {
    key: "titleCategory",
    error: "O título da categoria não pode ser menor que 5 caracteres",
    description: "Valida o tamanho mínimo do título",
    runValidate: (data) => minLength(data.titleCategory, 5),
  },
  {
    key: "titleCategory",
    error: "O título da categoria não pode ser maior que 400 caracteres",
    description: "Valida o tamanho máximo do título",
    runValidate: (data) => maxLength(data.titleCategory, 400),
  },
  {
    key: "status",
    error: "Status inválido para categoria",
    description: "Valida se o status é Ativa",
    runValidate: (data) => isRequired(data.status),
  },
  {
    key: "status",
    error: "Status inválido para categoria",
    description: "Valida se o status é válido",
    runValidate: (data) => isInEnum(data.status, ["ativa"]),
  },
];

export interface CreateCategoryRascunhoProps {
  titleCategory: string;
  descriptionCategory?: string;
  status: string;
}

export const createCategoryRascunhoRules: Rule<CreateCategoryRascunhoProps>[] =
  [
    {
      key: "titleCategory",
      error: "Ops, o título da categoria é obrigatório",
      description: "Verifica se o título foi fornecido",
      runValidate: (data) => isRequired(data.titleCategory),
    },
    {
      key: "titleCategory",
      error: "Ops, sua categoria precisa ter no mínimo 5 caracteres",
      description: "Valida o tamanho mínimo do título",
      runValidate: (data) => minLength(data.titleCategory, 5),
    },
    {
      key: "titleCategory",
      error: "Ops, o título da categoria pode ter no máximo 255 caracteres",
      description: "Valida o tamanho máximo do título",
      runValidate: (data) => maxLength(data.titleCategory, 255),
    },
    {
      key: "descriptionCategory",
      error: "Ops, descrição pode ter no máximo 400 caracteres",
      description: "Valida o tamanho máximo da descrição",
      runValidate: (data) => maxLength(data.descriptionCategory, 400),
    },
    {
      key: "status",
      error: "Status é obrigatório",
      description: "Verifica se o status foi fornecido",
      runValidate: (data) => isRequired(data.status),
    },
    {
      key: "status",
      error: "Status inválido para rascunho",
      description: "Valida se o status é Inativa",
      runValidate: (data) => isInEnum(data.status, ["inativa"]),
    },
  ];

export interface UpdateCategoryProps {
  titleCategory: string;
  descriptionCategory?: string;
  idCategory: string;
}

export const updateCategoryRules: Rule<UpdateCategoryProps>[] = [
  {
    key: "titleCategory",
    error: "Ops, o título da categoria é obrigatório",
    description: "Verifica se o título foi fornecido",
    runValidate: (data) => isRequired(data.titleCategory),
  },
  {
    key: "titleCategory",
    error: "Ops, categoria precisa ter no minimo 5 caracteres",
    description: "Valida o tamanho mínimo do título",
    runValidate: (data) => minLength(data.titleCategory, 5),
  },
  {
    key: "titleCategory",
    error: "Ops, categoria pode ter no máximo 200 caracteres",
    description: "Valida o tamanho máximo do título",
    runValidate: (data) => maxLength(data.titleCategory, 200),
  },
  {
    key: "descriptionCategory",
    error: "Ops, descrição pode ter no máximo 400 caracteres",
    description: "Valida o tamanho máximo da descrição",
    runValidate: (data) => maxLength(data.descriptionCategory, 400),
  },
  {
    key: "idCategory",
    error: "Ops, o ID da categoria é obrigatório",
    description: "Verifica se o ID foi fornecido",
    runValidate: (data) => isRequired(data.idCategory),
  },
  {
    key: "idCategory",
    error: "Ops, o ID da categoria precisa ter no mínimo 5 caracteres",
    description: "Valida o tamanho mínimo do ID",
    runValidate: (data) => minLength(data.idCategory, 5),
  },
  {
    key: "idCategory",
    error: "Ops, o ID da categoria pode ter no máximo 400 caracteres",
    description: "Valida o tamanho máximo do ID",
    runValidate: (data) => maxLength(data.idCategory, 400),
  },
];

export interface DeleteCategoryTaskProps {
  idCategory: string;
}

export const deleteCategoryTaskRules: Rule<DeleteCategoryTaskProps>[] = [
  {
    key: "idCategory",
    error: "ID da categoria inválido",
    description: "Verifica se o ID foi fornecido",
    runValidate: (data) => isRequired(data.idCategory),
  },
  {
    key: "idCategory",
    error: "ID da categoria inválido",
    description: "Verifica se o ID tem pelo menos 1 caractere",
    runValidate: (data) => minLength(data.idCategory, 1),
  },
];

export interface UpdateCategoryStatusProps {
  idCategory: string;
  completed: "Incompleta" | "Concluída";
}

export const updateCategoryStatusRules: Rule<UpdateCategoryStatusProps>[] = [
  {
    key: "idCategory",
    error: "ID da categoria inválido",
    description: "Verifica se o ID foi fornecido",
    runValidate: (data) => isRequired(data.idCategory),
  },
  {
    key: "idCategory",
    error: "ID da categoria inválido",
    description: "Verifica se o ID tem pelo menos 1 caractere",
    runValidate: (data) => minLength(data.idCategory, 1),
  },
  {
    key: "completed",
    error: "Ops, situação inválida para update",
    description: "Valida se o status é Incompleta ou Concluída",
    runValidate: (data) =>
      isInEnum(data.completed, ["incompleta", "concluída"]),
  },
];

export interface IdCategoryProps {
  idCategory: string;
}

export const idCategoryRules: Rule<IdCategoryProps>[] = [
  {
    key: "idCategory",
    error: "Ops, id inválido",
    description: "Verifica se o ID foi fornecido",
    runValidate: (data) => isRequired(data.idCategory),
  },
  {
    key: "idCategory",
    error: "Ops, id inválido",
    description: "Verifica se o ID tem pelo menos 5 caracteres",
    runValidate: (data) => minLength(data.idCategory, 5),
  },
];
