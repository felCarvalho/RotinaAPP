import {
  createCategoryRascunhoRules,
  type CreateCategoryRascunhoProps,
  updateCategoryRules,
  type UpdateCategoryProps,
  idCategoryRules,
  type IdCategoryProps,
} from "../../../utils/schemas/category.schema";
import {
  createTaskRascunhoRules,
  type CreateTaskRascunhoProps,
  updateTaskRascunhoRules,
  type UpdateTaskRascunhoProps,
  idTaskRules,
  type IdTaskProps,
} from "../../../utils/schemas/task.schema";
import { makeValidator } from "../../../utils/schemas/factory";

export const createCategoryRascunhoValidator =
  makeValidator<CreateCategoryRascunhoProps>(createCategoryRascunhoRules);
export const createTaskRascunhoValidator =
  makeValidator<CreateTaskRascunhoProps>(createTaskRascunhoRules);
export const updateCategoryValidator =
  makeValidator<UpdateCategoryProps>(updateCategoryRules);
export const updateTaskValidator =
  makeValidator<UpdateTaskRascunhoProps>(updateTaskRascunhoRules);
export const idCategoryValidator =
  makeValidator<IdCategoryProps>(idCategoryRules);
export const idTaskValidator = makeValidator<IdTaskProps>(idTaskRules);

export type {
  CreateCategoryRascunhoProps,
  CreateTaskRascunhoProps,
  UpdateCategoryProps,
  UpdateTaskRascunhoProps,
  IdCategoryProps,
  IdTaskProps,
};
