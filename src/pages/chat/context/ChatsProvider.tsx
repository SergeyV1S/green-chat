import React, { useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router";

import { PATHS } from "@/shared/constants/paths";
import { type Credentials, getCredentials } from "@/shared/utils";

import { HISTORY_REFRESH_EVERY, POLL_INTERVAL_MS } from "../constants";
import { useChats } from "../hooks/useChats";
import type { ChatListEntry, ChatMessage } from "../types";

type ChatsState = {
  items: ChatListEntry[];
  isListLoading: boolean;
  liveMessagesByChatId: Record<string, ChatMessage[]>;
};

type ChatsContextValue = {
  state: ChatsState;
  functions: {
    appendLiveMessage: (chatId: string, message: ChatMessage) => void;
    addChat: (chatId: string, credentials: Credentials) => Promise<void>;
  };
};

export const ChatsContext = React.createContext<ChatsContextValue | null>(null);

export const ChatsProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const {
    state: { chatsOrder, chatsById, isListLoading, liveMessagesByChatId },
    functions: { addChat, appendLiveMessage, startReceiving, syncChats }
  } = useChats();

  const pollCountRef = useRef(0);

  useEffect(() => {
    const credentials = getCredentials();

    if (!credentials) {
      navigate(`/${PATHS.AUTH}`, { replace: true });
      return;
    }

    syncChats(true, credentials);

    const stopReceiving = startReceiving(credentials);

    const interval = setInterval(() => {
      pollCountRef.current += 1;

      const shouldRefreshChatInfo = pollCountRef.current % HISTORY_REFRESH_EVERY === 0;

      syncChats(shouldRefreshChatInfo, credentials);
    }, POLL_INTERVAL_MS);

    return () => {
      clearInterval(interval);
      stopReceiving();
    };
  }, []);

  const value = useMemo<ChatsContextValue>(
    () => ({
      state: {
        items: chatsOrder.map((id) => ({ id, chat: chatsById[id] ?? null })),
        isListLoading,
        liveMessagesByChatId
      },
      functions: {
        appendLiveMessage,
        addChat
      }
    }),
    [chatsOrder, chatsById, isListLoading, liveMessagesByChatId, appendLiveMessage, addChat]
  );

  return <ChatsContext.Provider value={value}>{children}</ChatsContext.Provider>;
};
