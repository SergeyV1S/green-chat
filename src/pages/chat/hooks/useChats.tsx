import { useRef, useState } from "react";

import { type Credentials, delay } from "@/shared/utils";

import {
  deleteNotification,
  getAvatar,
  getChatHistory,
  getChats,
  getContactInfo,
  receiveNotification
} from "../api";
import {
  CHAT_REQUEST_INTERVAL_MS,
  LAST_MESSAGE_COUNT,
  RECEIVE_ERROR_DELAY_MS,
  RECEIVE_TIMEOUT_SECONDS
} from "../constants";
import { getMessagePreview, isPersonalChat, notificationToMessage } from "../helpers";
import type { ChatListItemModel, ChatMessage, NotificationBody } from "../types";

type ChatUpdate = Partial<ChatListItemModel> & { id: string };

export const useChats = () => {
  const [chatsById, setChatsById] = useState<Record<string, ChatListItemModel>>({});
  const [chatsOrder, setChatsOrder] = useState<string[]>([]);
  const [isListLoading, setIsListLoading] = useState(true);
  const [liveMessagesByChatId, setLiveMessagesByChatId] = useState<Record<string, ChatMessage[]>>(
    {}
  );

  const knownIdsRef = useRef<Set<string>>(new Set());
  const exludedChatIdsRef = useRef<Set<string>>(new Set());

  const mergeChat = (update: ChatUpdate) => {
    setChatsById((prev) => {
      const chat = { ...prev[update.id], ...update };

      return {
        ...prev,
        [update.id]: chat
      };
    });
  };

  const appendLiveMessage = (chatId: string, message: ChatMessage) => {
    setLiveMessagesByChatId((prev) => {
      const chatMessages = prev[chatId] ?? [];

      return {
        ...prev,
        [chatId]: [...chatMessages, message]
      };
    });
  };

  const addChat = async (chatId: string, credentials: Credentials) => {
    knownIdsRef.current.add(chatId);
    setChatsOrder((prev) => (prev.includes(chatId) ? prev : [chatId, ...prev]));

    try {
      const info = await getContactInfo(credentials, chatId);
      const name = info.contactName || info.name || info.chatId;

      setChatsById((prev) => {
        const chat: ChatListItemModel = {
          ...prev[chatId],
          id: chatId,
          name,
          chatType: info.chatType,
          avatarUrl: info.avatar || prev[chatId]?.avatarUrl
        };

        return {
          ...prev,
          [chatId]: chat
        };
      });
    } catch {
      setChatsById((prev) => {
        const chat: ChatListItemModel = {
          ...prev[chatId],
          id: chatId,
          name: chatId,
          chatType: "user"
        };

        return {
          ...prev,
          [chatId]: chat
        };
      });
    }
  };

  const exludeChat = (chatId: string) => {
    exludedChatIdsRef.current.add(chatId);
    setChatsOrder((prev) => prev.filter((id) => id !== chatId));
  };

  const getLastMessage = async (chatId: string, credentials: Credentials) => {
    try {
      const history = await getChatHistory(credentials, chatId, LAST_MESSAGE_COUNT, true);
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
      const existingKnownIds = [...knownIdsRef.current].filter((id) => idSet.has(id));
      const existingExludedIds = [...exludedChatIdsRef.current].filter((id) => idSet.has(id));

      knownIdsRef.current = new Set(existingKnownIds);
      exludedChatIdsRef.current = new Set(existingExludedIds);

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

  const handleNotification = (body: NotificationBody) => {
    const result = notificationToMessage(body);

    if (!result) {
      return;
    }

    const { chatId, message } = result;

    appendLiveMessage(chatId, message);
    mergeChat({
      id: chatId,
      lastMessageText: getMessagePreview(message),
      lastMessageTimestamp: message.timestamp
    });
  };

  const startReceiving = (credentials: Credentials) => {
    let stopped = false;

    const loop = async () => {
      while (!stopped) {
        try {
          const notification = await receiveNotification(credentials, RECEIVE_TIMEOUT_SECONDS);

          if (stopped) {
            break;
          }

          if (notification) {
            handleNotification(notification.body);
            await deleteNotification(credentials, notification.receiptId);
          }
        } catch {
          await delay(RECEIVE_ERROR_DELAY_MS);
        }
      }
    };

    loop();

    return () => {
      stopped = true;
    };
  };

  return {
    state: { chatsOrder, chatsById, isListLoading, liveMessagesByChatId },
    functions: { syncChats, appendLiveMessage, startReceiving, addChat }
  };
};
