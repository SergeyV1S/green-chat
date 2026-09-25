import { getCredentials } from "@/shared/utils";

import { sendMessage } from "../api";
import { useChatsContext } from "../context";
import { mergeMessages } from "../helpers";
import { useChatHistory } from "./useChatHistory";

export const useConversation = (chatId: string) => {
  const {
    state: { messages: history, isLoading }
  } = useChatHistory(chatId);
  const {
    state: { liveMessagesByChatId },
    functions: { appendLiveMessage }
  } = useChatsContext();

  const messages = mergeMessages(history, liveMessagesByChatId[chatId] ?? []);

  const handleSend = async (text: string) => {
    const credentials = getCredentials()!;

    const { idMessage } = await sendMessage(credentials, chatId, text);

    appendLiveMessage(chatId, {
      type: "outgoing",
      idMessage,
      timestamp: Math.floor(Date.now() / 1000),
      typeMessage: "textMessage",
      textMessage: text
    });
  };

  return {
    state: { isLoading, messages },
    functions: { handleSend }
  };
};
