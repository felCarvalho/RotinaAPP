import { SchemaValidator } from "@felipe-lib/schema-local";

import {
  createCategoryRules,
  createCategoryRascunhoRules,
  updateCategoryRules,
  deleteCategoryTaskRules,
  updateCategoryStatusRules,
  idCategoryRules,
} from "./category.schema";

import {
  createTaskRules,
  updateTaskRules,
  deleteTaskRules,
  idTaskRules,
  createTaskRascunhoRules,
  updateTaskRascunhoRules,
} from "./task.schema";

import { chatQuestionRules } from "./chat.schema";

import { loginRules, createUserRules } from "./user.schema";

import { createRotinaRules } from "./rotina.schema";

export type {
  CreateCategoryProps,
  CreateCategoryRascunhoProps,
  UpdateCategoryProps,
  DeleteCategoryTaskProps,
  UpdateCategoryStatusProps,
  IdCategoryProps,
} from "./category.schema";

export type {
  CreateTaskProps,
  UpdateTaskProps,
  DeleteTaskProps,
  IdTaskProps,
  CreateTaskRascunhoProps,
  UpdateTaskRascunhoProps,
} from "./task.schema";

export type { ChatQuestionProps } from "./chat.schema";
export type { LoginProps, CreateUserProps } from "./user.schema";
export type { CreateRotinaProps } from "./rotina.schema";

export const createCategoryValidator = new SchemaValidator({
  schema: createCategoryRules,
});

export const createCategoryRascunhoValidator = new SchemaValidator({
  schema: createCategoryRascunhoRules,
});

export const updateCategoryValidator = new SchemaValidator({
  schema: updateCategoryRules,
});

export const deleteCategoryValidator = new SchemaValidator({
  schema: deleteCategoryTaskRules,
});

export const updateCategoryStatusValidator = new SchemaValidator({
  schema: updateCategoryStatusRules,
});

export const idCategoryValidator = new SchemaValidator({
  schema: idCategoryRules,
});

export const createTaskValidator = new SchemaValidator({
  schema: createTaskRules,
});

export const updateTaskValidator = new SchemaValidator({
  schema: updateTaskRules,
});

export const deleteTaskValidator = new SchemaValidator({
  schema: deleteTaskRules,
});

export const idTaskValidator = new SchemaValidator({
  schema: idTaskRules,
});

export const createTaskRascunhoValidator = new SchemaValidator({
  schema: createTaskRascunhoRules,
});

export const updateTaskRascunhoValidator = new SchemaValidator({
  schema: updateTaskRascunhoRules,
});

export const chatQuestionValidator = new SchemaValidator({
  schema: chatQuestionRules,
});

export const loginValidator = new SchemaValidator({
  schema: loginRules,
});

export const createUserValidator = new SchemaValidator({
  schema: createUserRules,
});

export const createRotinaValidator = new SchemaValidator({
  schema: createRotinaRules,
});
