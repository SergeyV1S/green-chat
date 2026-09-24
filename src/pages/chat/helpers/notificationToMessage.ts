import type { ChatMessage, NotificationBody } from "../types";

const MESSAGE_WEBHOOKS = new Set([
  "incomingMessageReceived",
  "outgoingMessageReceived",
  "outgoingAPIMessageReceived"
]);

type NotificationMessage = {
  chatId: string;
  message: ChatMessage;
};

export const notificationToMessage = (body: NotificationBody): NotificationMessage | null => {
  if (!MESSAGE_WEBHOOKS.has(body.typeWebhook) || !body.senderData || !body.messageData) {
    return null;
  }

  const { messageData, senderData } = body;
  const textMessage =
    messageData.textMessageData?.textMessage ?? messageData.extendedTextMessageData?.text;

  return {
    chatId: senderData.chatId,
    message: {
      type: body.typeWebhook === "incomingMessageReceived" ? "incoming" : "outgoing",
      idMessage: body.idMessage,
      timestamp: body.timestamp,
      typeMessage: messageData.typeMessage,
      textMessage
    }
  };
};
