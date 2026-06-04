import { type Rule } from "@felipe-lib/schema-local";
import { isRequired, maxLength, minLength, isInEnum } from "../validators";

export interface CreateTaskProps {
  titleTask: string;
  descriptionTask?: string;
  idCategory: string;
}

export const createTaskRules: Rule<CreateTaskProps, Record<string, never>>[] = [
  {
    key: "titleTask",
    error: () => "Por favor, sua task precisa ter algum valor",
    description: () => "Verifica se o título foi fornecido",
    runValidate: (data) => isRequired(data.titleTask),
  },
  {
    key: "titleTask",
    error: () => "Ops, maximo de caracteres atingido",
    description: () => "Valida o tamanho máximo do título",
    runValidate: (data) => maxLength(data.titleTask, 400),
  },
  {
    key: "descriptionTask",
    error: () => "Ops, maximo de caracteres atingido",
    description: () => "Valida o tamanho máximo da descrição",
    runValidate: (data) => maxLength(data.descriptionTask, 400),
  },
  {
    key: "idCategory",
    error: () => "Por favor, selecione uma categoria",
    description: () => "Verifica se a categoria foi selecionada",
    runValidate: (data) => isRequired(data.idCategory),
  },
  {
    key: "idCategory",
    error: () => "Ops, maximo de caracteres atingido",
    description: () => "Valida o tamanho máximo do ID da categoria",
    runValidate: (data) => maxLength(data.idCategory, 400),
  },
];

export interface UpdateTaskProps {
  completed?: string;
  idTask: string;
  idUser: string;
  titleTask?: string;
  descriptionTask?: string;
  formId: string;
}

export const updateTaskRules: Rule<UpdateTaskProps, Record<string, never>>[] = [
  {
    key: "formId",
    error: () => "Ops, formulário inválido",
    description: () => "Valida se o formId é válido",
    runValidate: (data) =>
      isInEnum(data.formId, [
        "status-checkbox",
        "rename-modal",
        "description-form",
      ]),
  },
  {
    key: "idTask",
    error: () => "Ops! Não conseguimos deletar sua rotina",
    description: () => "Verifica se o ID foi fornecido",
    runValidate: (data) => isRequired(data.idTask),
  },
  {
    key: "idUser",
    error: () => "Ops! Não conseguimos deletar sua rotina",
    description: () => "Verifica se o ID do usuário foi fornecido",
    runValidate: (data) => isRequired(data.idUser),
  },
  {
    key: "titleTask",
    error: () => "Título da tarefa não pode exceder 255 caracteres",
    description: () => "Valida o tamanho máximo do título",
    runValidate: (data) => maxLength(data.titleTask, 255),
  },
  {
    key: "descriptionTask",
    error: () => "Descrição não pode exceder 255 caracteres",
    description: () => "Valida o tamanho máximo da descrição",
    runValidate: (data) => maxLength(data.descriptionTask, 255),
  },
  {
    key: "completed",
    error: () => "Status inválido para atualização",
    description: () => "Valida se o status é Concluída ou Incompleta",
    runValidate: (data) =>
      isInEnum(data.completed, ["concluída", "incompleta"]),
  },
];

export interface DeleteTaskProps {
  idTask: string;
}

export const deleteTaskRules: Rule<DeleteTaskProps, Record<string, never>>[] = [
  {
    key: "idTask",
    error: () => "ID inválido",
    description: () => "Verifica se o ID foi fornecido",
    runValidate: (data) => isRequired(data.idTask),
  },
  {
    key: "idTask",
    error: () => "ID inválido",
    description: () => "Verifica se o ID tem pelo menos 1 caractere",
    runValidate: (data) => minLength(data.idTask, 1),
  },
];

export interface CreateTaskRascunhoProps {
  titleTask: string;
  descriptionTask?: string;
}

export const createTaskRascunhoRules: Rule<CreateTaskRascunhoProps, Record<string, never>>[] = [
  {
    key: "titleTask",
    error: () => "Ops, o título da tarefa é obrigatório",
    description: () => "Verifica se o título foi fornecido",
    runValidate: (data) => isRequired(data.titleTask),
  },
  {
    key: "titleTask",
    error: () => "Ops, sua task precisa ter no minimo 5 caracteres",
    description: () => "Valida o tamanho mínimo do título",
    runValidate: (data) => minLength(data.titleTask, 5),
  },
  {
    key: "titleTask",
    error: () => "Ops, o título da tarefa pode ter no máximo 255 caracteres",
    description: () => "Valida o tamanho máximo do título",
    runValidate: (data) => maxLength(data.titleTask, 255),
  },
  {
    key: "descriptionTask",
    error: () => "Ops, descrição pode ter no máximo 400 caracteres",
    description: () => "Valida o tamanho máximo da descrição",
    runValidate: (data) => maxLength(data.descriptionTask, 400),
  },
];

export interface UpdateTaskRascunhoProps {
  titleTask: string;
  descriptionTask?: string;
  idUser: string;
  idTask: string;
}

export const updateTaskRascunhoRules: Rule<UpdateTaskRascunhoProps, Record<string, never>>[] = [
  {
    key: "titleTask",
    error: () => "Ops, o título da tarefa é obrigatório",
    description: () => "Verifica se o título foi fornecido",
    runValidate: (data) => isRequired(data.titleTask),
  },
  {
    key: "titleTask",
    error: () => "Ops, sua task precisa ter no minimo 5 caracteres",
    description: () => "Valida o tamanho mínimo do título",
    runValidate: (data) => minLength(data.titleTask, 5),
  },
  {
    key: "titleTask",
    error: () => "Ops, o título da tarefa pode ter no máximo 50 caracteres",
    description: () => "Valida o tamanho máximo do título",
    runValidate: (data) => maxLength(data.titleTask, 50),
  },
  {
    key: "descriptionTask",
    error: () => "Ops, descrição pode ter no máximo 400 caracteres",
    description: () => "Valida o tamanho máximo da descrição",
    runValidate: (data) => maxLength(data.descriptionTask, 400),
  },
  {
    key: "idUser",
    error: () => "Ops, o ID do usuário é obrigatório",
    description: () => "Verifica se o ID do usuário foi fornecido",
    runValidate: (data) => isRequired(data.idUser),
  },
  {
    key: "idUser",
    error: () => "Ops, o ID do usuário precisa ter no minimo 5 caracteres",
    description: () => "Valida o tamanho mínimo do ID do usuário",
    runValidate: (data) => minLength(data.idUser, 5),
  },
  {
    key: "idUser",
    error: () => "Ops, o ID do usuário pode ter no máximo 400 caracteres",
    description: () => "Valida o tamanho máximo do ID do usuário",
    runValidate: (data) => maxLength(data.idUser, 400),
  },
  {
    key: "idTask",
    error: () => "Ops, o ID da tarefa é obrigatório",
    description: () => "Verifica se o ID da tarefa foi fornecido",
    runValidate: (data) => isRequired(data.idTask),
  },
  {
    key: "idTask",
    error: () => "Ops, o ID da tarefa precisa ter no mínimo 5 caracteres",
    description: () => "Valida o tamanho mínimo do ID da tarefa",
    runValidate: (data) => minLength(data.idTask, 5),
  },
  {
    key: "idTask",
    error: () => "Ops, o ID da tarefa pode ter no máximo 400 caracteres",
    description: () => "Valida o tamanho máximo do ID da tarefa",
    runValidate: (data) => maxLength(data.idTask, 400),
  },
];

export interface IdTaskProps {
  idTask: string;
}

export const idTaskRules: Rule<IdTaskProps, Record<string, never>>[] = [
  {
    key: "idTask",
    error: () => "Ops, id inválido",
    description: () => "Verifica se o ID foi fornecido",
    runValidate: (data) => isRequired(data.idTask),
  },
  {
    key: "idTask",
    error: () => "Ops, id inválido",
    description: () => "Verifica se o ID tem pelo menos 5 caracteres",
    runValidate: (data) => minLength(data.idTask, 5),
  },
];
