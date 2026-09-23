export type Chat = {
  chatId: string;
  name?: string;
  archive?: boolean;
  notSpam?: boolean;
  ephemeralExpiration?: number;
  ephemeralSettingTimestamp?: number;
};

export type ContactChatType = "user" | "group" | "channel" | "bot";

export type ContactInfo = {
  avatar: string;
  name: string;
  contactName: string;
  chatId: string;
  chatType: ContactChatType;
  lastSeen: number | null;
  phoneNumber: number;
  phoneNumberTimestamp: number;
};

export type ChatMessageDirection = "incoming" | "outgoing";

export type ChatMessage = {
  type: ChatMessageDirection;
  idMessage: string;
  timestamp: number;
  typeMessage: string;
  textMessage?: string;
  caption?: string;
  extendedTextMessage?: {
    text?: string;
    title?: string;
    description?: string;
  };
};

export type ChatListItemModel = {
  id: string;
  name: string;
  chatType: ContactChatType;
  avatarUrl?: string;
  lastMessageText?: string;
  lastMessageTimestamp?: number;
};

export type ChatListEntry = {
  id: string;
  chat: ChatListItemModel | null;
};
