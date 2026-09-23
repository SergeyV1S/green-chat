import { z } from "zod";

import type { AuthFormValues } from "@/pages/auth/types";

export const DEFAULT_API_URL = "https://api.green-api.com";

export const authSchema = z.object({
  idInstance: z
    .string()
    .trim()
    .min(1, "Укажите idInstance")
    .regex(/^\d+$/, "idInstance состоит только из цифр"),
  apiTokenInstance: z.string().trim().min(1, "Укажите apiTokenInstance"),
  apiUrl: z.url("Некорректный apiUrl")
});

export const DEFAULT_AUTH_VALUES: AuthFormValues = {
  idInstance: "",
  apiTokenInstance: "",
  apiUrl: DEFAULT_API_URL
};
