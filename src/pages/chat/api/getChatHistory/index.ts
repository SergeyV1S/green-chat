import axios from "axios";

import type { ChatMessage } from "@/pages/chat/types";
import type { Credentials } from "@/shared/utils";
import { buildRequestUrl } from "@/shared/utils";

export const getChatHistory = async (credentials: Credentials, chatId: string, count = 1) => {
  const { data } = await axios.post<ChatMessage[]>(buildRequestUrl(credentials, "getChatHistory"), {
    chatId,
    count
  });

  return data;
};
