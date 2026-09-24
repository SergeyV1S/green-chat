import { z } from "zod";

import { normalizePhone } from "./helpers";

export const POLL_INTERVAL_MS = 15000;
export const HISTORY_REFRESH_EVERY = 3;
export const LAST_MESSAGE_COUNT = 1;
export const CHAT_REQUEST_INTERVAL_MS = 900;
export const CHAT_HISTORY_COUNT = 100;
export const RECEIVE_TIMEOUT_SECONDS = 5;
export const RECEIVE_ERROR_DELAY_MS = 5000;

export const addContactSchema = z.object({
  phone: z
    .string()
    .trim()
    .refine((value) => {
      const digits = normalizePhone(value);

      return digits.length === 11 || digits.length === 12;
    }, "Введите номер: 11 или 12 цифр")
});
