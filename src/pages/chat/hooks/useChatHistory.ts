import { useEffect, useState } from "react";

import { getCredentials } from "@/shared/utils";

import { getChatHistory } from "../api";
import { CHAT_HISTORY_COUNT } from "../constants";
import type { ChatMessage } from "../types";

export const useChatHistory = (chatId: string) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const credentials = getCredentials()!;

    let cancelled = false;

    getChatHistory(credentials, chatId, CHAT_HISTORY_COUNT)
      .then((data) => {
        if (!cancelled) {
          setMessages(data);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setMessages([]);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [chatId]);

  return { state: { messages, isLoading } };
};
