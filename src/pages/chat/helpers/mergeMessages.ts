import type { ChatMessage } from "../types";

export const mergeMessages = (...lists: ChatMessage[][]): ChatMessage[] => {
  const messages = new Map<string, ChatMessage>();

  for (const list of lists) {
    for (const message of list) {
      messages.set(message.idMessage, message);
    }
  }

  return [...messages.values()].sort((a, b) => a.timestamp - b.timestamp);
};
