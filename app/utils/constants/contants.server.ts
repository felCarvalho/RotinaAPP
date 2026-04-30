import { loadEnvFile } from "node:process";

loadEnvFile(".env");

export const LOCAL_URL = process.env.LOCAL_URL ?? "";
export const LOCAL_STRAPI_API = process.env.LOCAL_STRAPI_API ?? "";
