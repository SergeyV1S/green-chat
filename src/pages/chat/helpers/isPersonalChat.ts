import type { ContactChatType } from "../types";

const PERSONAL_CHAT_TYPES: ContactChatType[] = ["user", "bot"];

export const isPersonalChat = (chatType: ContactChatType) => PERSONAL_CHAT_TYPES.includes(chatType);
