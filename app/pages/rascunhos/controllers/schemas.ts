import { z } from "zod";

export const schemaCreateCategoryRascunho = z.object({
  titleCategory: z
    .string({
      error: "Ops, o título da categoria é obrigatório",
    })
    .min(5, { error: "Ops, sua categoria precisa ter no mínimo 5 caracteres" })
    .max(255, {
      error: "Ops, o título da categoria pode ter no máximo 255 caracteres",
    }),
  descriptionCategory: z
    .string()
    .max(400, { error: "Ops, descrição pode ter no máximo 400 caracteres" })
    .optional(),
  status: z.enum(["Inativa"]),
});

export const schemaCreateTaskRascunho = z.object({
  titleTask: z
    .string({
      error: "Ops, o título da tarefa é obrigatório",
    })
    .min(5, { error: "Ops, sua task precisa ter no minino 5 caracteres" })
    .max(255, {
      error: "Ops, o título da tarefa pode ter no máximo 255 caracteres",
    }),
  descriptionTask: z
    .string()
    .max(400, { error: "Ops, descrição pode ter no máximo 400 caracteres" })
    .optional(),
});

export const schemaUpdateCategory = z.object({
  titleCategory: z
    .string({
      error: "Ops, o título da categoria é obrigatório",
    })
    .min(5, { error: "Ops, categoria precisa ter no minino 5 caracteres" })
    .max(200, { error: "Ops , categoria pode ter no máximo 200 caracteres" }),
  descriptionCategory: z
    .string()
    .max(400, { error: "Ops, descrição pode ter no máximo 400 caracteres" })
    .optional(),
  idCategory: z
    .string("Ops, o ID da categoria é obrigatório")
    .min(5, {
      error: "Ops, o ID da categoria precisa ter no mínimo 5 caracteres",
    })
    .max(400, {
      error: "Ops, o ID da categoria pode ter no máximo 400 caracteres",
    }),
});

export const schemaUpdateTask = z.object({
  titleTask: z
    .string({
      error: "Ops, o título da tarefa é obrigatório",
    })
    .min(5, { error: "Ops, sua task precisa ter no minino 5 caracteres" })
    .max(50, {
      error: "Ops, o título da tarefa pode ter no máximo 50 caracteres",
    }),
  descriptionTask: z
    .string()
    .max(400, { error: "Ops, descrição pode ter no máximo 400 caracteres" })
    .optional(),
  idUser: z
    .string("Ops, o ID do usuário é obrigatório")
    .min(5, { error: "Ops, seu id precisa ter no minimo 5 caracteres" })
    .max(400, {
      error: "Ops, o ID do usuário pode ter no máximo 400 caracteres",
    }),
  idTask: z
    .string("Ops, o ID da tarefa é obrigatório")
    .min(5, {
      error: "Ops, o ID da tarefa precisa ter no mínimo 5 caracteres",
    })
    .max(400, {
      error: "Ops, o ID da tarefa pode ter no máximo 400 caracteres",
    }),
});

export const schemaIdCategory = z.object({
  idCategory: z.string().min(5, { error: "Ops, id inválido" }),
});

export const schemaIdTask = z.object({
  idTask: z.string().min(5, { error: "Ops, id inválido" }),
});
