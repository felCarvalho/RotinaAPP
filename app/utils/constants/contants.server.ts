import { loadEnvFile } from "node:process";

try {
  loadEnvFile(".env");
} catch {
  // .env file not found, using environment variables
}

export const LOCAL_URL = process.env.LOCAL_URL ?? "";
export const LOCAL_STRAPI_API = process.env.LOCAL_STRAPI_API ?? "";
