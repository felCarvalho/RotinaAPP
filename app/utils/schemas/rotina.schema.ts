import { type Rule } from "@felipe-lib/schema-local";
import { isRequired, maxLength, minLength } from "../validators";

export interface CreateRotinaProps {
  titleTask: string;
  descriptionTask: string;
  titleCategory: string;
  descriptionCategory: string;
}

export const createRotinaRules: Rule<CreateRotinaProps>[] = [
  {
    key: "titleTask",
    error: "O título da tarefa é obrigatório",
    description: "Verifica se o título da tarefa foi fornecido",
    runValidate: (data) => isRequired(data.titleTask),
  },
  {
    key: "titleTask",
    error: "Minimo de 5 caracteres para criar um titulo",
    description: "Valida o tamanho mínimo do título da tarefa",
    runValidate: (data) => minLength(data.titleTask, 5),
  },
  {
    key: "titleTask",
    error: "Maximo de 255 caracteres para seu titulo",
    description: "Valida o tamanho máximo do título da tarefa",
    runValidate: (data) => maxLength(data.titleTask, 255),
  },
  {
    key: "descriptionTask",
    error: "Máximo de 400 caracteres para sua descrição",
    description: "Valida o tamanho máximo da descrição da tarefa",
    runValidate: (data) => maxLength(data.descriptionTask, 400),
  },
  {
    key: "titleCategory",
    error: "O título da categoria é obrigatório",
    description: "Verifica se o título da categoria foi fornecido",
    runValidate: (data) => isRequired(data.titleCategory),
  },
  {
    key: "titleCategory",
    error: "Minimo de 5 caracteres para criar uma categoria",
    description: "Valida o tamanho mínimo do título da categoria",
    runValidate: (data) => minLength(data.titleCategory, 5),
  },
  {
    key: "titleCategory",
    error: "Maximo de 255 caracteres para sua categoria",
    description: "Valida o tamanho máximo do título da categoria",
    runValidate: (data) => maxLength(data.titleCategory, 255),
  },
  {
    key: "descriptionCategory",
    error: "Máximo de 400 caracteres para sua descrição",
    description: "Valida o tamanho máximo da descrição da categoria",
    runValidate: (data) => maxLength(data.descriptionCategory, 400),
  },
];
