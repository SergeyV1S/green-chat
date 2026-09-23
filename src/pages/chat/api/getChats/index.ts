import axios from "axios";

import type { Chats } from "@/pages/chat/types";
import type { Credentials } from "@/shared/utils";
import { buildRequestUrl } from "@/shared/utils";

/**
 * GetChats — список всех чатов аккаунта.
 * REST-метод GREEN-API: getChats.
 */
export const getChats = async (credentials: Credentials): Promise<Chats> => {
  const { data } = await axios.get<Chats>(buildRequestUrl(credentials, "getChats"));

  return data;
};
