import React, { useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router";

import { PATHS } from "@/shared/constants/paths";
import { getCredentials } from "@/shared/utils";

import { HISTORY_REFRESH_EVERY, POLL_INTERVAL_MS } from "../constants";
import { useChats } from "../hooks/useChats";
import type { ChatListEntry } from "../types";

type ChatsState = {
  items: ChatListEntry[];
  isListLoading: boolean;
};

type ChatsContextValue = {
  state: ChatsState;
};

export const ChatsContext = React.createContext<ChatsContextValue | null>(null);

export const ChatsProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const {
    state: { chatsOrder, chatsById, isListLoading },
    functions
  } = useChats();

  const pollCountRef = useRef(0);

  useEffect(() => {
    const credentials = getCredentials();

    if (!credentials) {
      navigate(`/${PATHS.AUTH}`, { replace: true });
      return;
    }

    functions.syncChats(true, credentials);

    const interval = setInterval(() => {
      pollCountRef.current += 1;

      const shouldRefreshChatInfo = pollCountRef.current % HISTORY_REFRESH_EVERY === 0;

      functions.syncChats(shouldRefreshChatInfo, credentials);
    }, POLL_INTERVAL_MS);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const value = useMemo<ChatsContextValue>(
    () => ({
      state: {
        items: chatsOrder.map((id) => ({ id, chat: chatsById[id] ?? null })),
        isListLoading
      }
    }),
    [chatsOrder, chatsById, isListLoading]
  );

  return <ChatsContext.Provider value={value}>{children}</ChatsContext.Provider>;
};
