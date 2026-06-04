import { type Rule } from "@felipe-lib/schema-local";
import { isRequired, maxLength, minLength } from "../validators";

export interface ChatQuestionProps {
  question: string;
}

export const chatQuestionRules: Rule<ChatQuestionProps, Record<string, never>>[] = [
  {
    key: "question",
    error: () => "A mensagem não pode estar vazia",
    description: () => "Verifica se a mensagem foi fornecida",
    runValidate: (data) => isRequired(data.question),
  },
  {
    key: "question",
    error: () => "A mensagem deve ter pelo menos 2 caracteres",
    description: () => "Valida o tamanho mínimo da mensagem",
    runValidate: (data) => minLength(data.question, 2),
  },
  {
    key: "question",
    error: () => "A mensagem pode ter no máximo 1000 caracteres",
    description: () => "Valida o tamanho máximo da mensagem",
    runValidate: (data) => maxLength(data.question, 1000),
  },
];
