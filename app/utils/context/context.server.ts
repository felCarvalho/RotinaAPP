import { createContext } from "react-router";
import type { User, Token } from "./type.server";

export const userContext = createContext<User | null>(null);
export const tokenContext = createContext<Token | null>(null);
