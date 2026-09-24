import { useRef, useState } from "react";

import { type Credentials, delay } from "@/shared/utils";

import { getAvatar, getChatHistory, getChats, getContactInfo } from "../api";
import { CHAT_REQUEST_INTERVAL_MS, LAST_MESSAGE_COUNT } from "../constants";
import { getMessagePreview, isPersonalChat } from "../helpers";
import type { ChatListItemModel } from "../types";

type ChatUpdate = Partial<ChatListItemModel> & { id: string };

export const useChats = () => {
  const [chatsById, setChatsById] = useState<Record<string, ChatListItemModel>>({});
  const [chatsOrder, setChatsOrder] = useState<string[]>([]);
  const [isListLoading, setIsListLoading] = useState(true);

  const knownIdsRef = useRef<Set<string>>(new Set());
  const exludedChatIdsRef = useRef<Set<string>>(new Set());

  const mergeChat = (update: ChatUpdate) => {
    setChatsById((prev) => ({
      ...prev,
      [update.id]: { ...prev[update.id], ...update } as ChatListItemModel
    }));
  };

  const exludeChat = (chatId: string) => {
    exludedChatIdsRef.current.add(chatId);
    setChatsOrder((prev) => prev.filter((id) => id !== chatId));
  };

  const getLastMessage = async (chatId: string, credentials: Credentials) => {
    try {
      const history = await getChatHistory(credentials, chatId, LAST_MESSAGE_COUNT);
      const message = history[0];

      return {
        id: chatId,
        lastMessageText: getMessagePreview(message),
        lastMessageTimestamp: message?.timestamp
      };
    } catch {
      return { id: chatId };
    }
  };

  const getChatInfo = async (chatId: string, credentials: Credentials) => {
    const [contactInfoResult, avatarResult] = await Promise.allSettled([
      getContactInfo(credentials, chatId),
      getAvatar(credentials, chatId)
    ]);

    if (
      contactInfoResult.status !== "fulfilled" ||
      !isPersonalChat(contactInfoResult.value.chatType)
    ) {
      return;
    }

    const info = contactInfoResult.value;
    const avatarUrl =
      avatarResult.status === "fulfilled" ? avatarResult.value.urlAvatar : info.avatar;
    const lastMessage = await getLastMessage(chatId, credentials);
    const name = info.contactName || info.name || info.chatId;

    return {
      id: chatId,
      name,
      chatType: info.chatType,
      avatarUrl: avatarUrl || undefined,
      lastMessageText: lastMessage.lastMessageText,
      lastMessageTimestamp: lastMessage.lastMessageTimestamp
    };
  };

  const syncChats = async (shouldRefreshChatInfo: boolean, credentials: Credentials) => {
    try {
      const chats = await getChats(credentials);

      const idSet = new Set(chats.map((chat) => chat.chatId));

      setChatsById((prev) => {
        const next: Record<string, ChatListItemModel> = {};

        for (const id of idSet) {
          if (prev[id]) {
            next[id] = prev[id];
          }
        }

        return next;
      });
      knownIdsRef.current = new Set([...knownIdsRef.current].filter((id) => idSet.has(id)));
      exludedChatIdsRef.current = new Set(
        [...exludedChatIdsRef.current].filter((id) => idSet.has(id))
      );

      const displayIds = [...idSet].filter((id) => !exludedChatIdsRef.current.has(id));

      setChatsOrder(displayIds);
      setIsListLoading(false);

      const loadedIds = displayIds.filter((id) => knownIdsRef.current.has(id));

      const newIds = [...idSet].filter((id) => !knownIdsRef.current.has(id));

      for (const id of newIds) {
        knownIdsRef.current.add(id);

        const chat = await getChatInfo(id, credentials);

        if (chat) {
          mergeChat(chat);
        } else {
          exludeChat(id);
        }

        await delay(CHAT_REQUEST_INTERVAL_MS);
      }

      if (shouldRefreshChatInfo) {
        for (const id of loadedIds) {
          const update = await getLastMessage(id, credentials);

          mergeChat(update);
          await delay(CHAT_REQUEST_INTERVAL_MS);
        }
      }
    } catch {
      setIsListLoading(false);
    }
  };

  return { state: { chatsOrder, chatsById, isListLoading }, functions: { syncChats } };
};
