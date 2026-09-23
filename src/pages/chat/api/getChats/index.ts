import axios from "axios";

import type { Chat } from "@/pages/chat/types";
import type { Credentials } from "@/shared/utils";
import { buildRequestUrl } from "@/shared/utils";

export const getChats = async (credentials: Credentials) => {
  const { data } = await axios.get<Chat[]>(buildRequestUrl(credentials, "getChats"));

  return data;
};
