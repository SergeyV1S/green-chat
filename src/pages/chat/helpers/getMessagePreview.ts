import type { ChatMessage } from "@/pages/chat/types";

const TYPE_LABELS: Record<string, string> = {
  imageMessage: "Фото",
  videoMessage: "Видео",
  documentMessage: "Документ",
  audioMessage: "Голосовое",
  stickerMessage: "Стикер",
  pollMessage: "Опрос",
  reactionMessage: "Реакция"
};

export const getMessagePreview = (message?: ChatMessage) => {
  if (!message) {
    return;
  }

  const { textMessage, caption, typeMessage, extendedTextMessage } = message;

  const text = textMessage || extendedTextMessage?.text || caption;

  return text || TYPE_LABELS[typeMessage];
};
