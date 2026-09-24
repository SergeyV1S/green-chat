import { useChatHistory } from "@/pages/chat/hooks/useChatHistory";
import type { ChatListItemModel } from "@/pages/chat/types";

import { ConversationHeader } from "./ConversationHeader";
import { MessageInput } from "./MessageInput";
import { MessageList } from "./MessageList";

type ConversationProps = {
  chatId: string;
  chat: ChatListItemModel | null;
};

export const Conversation = ({ chatId, chat }: ConversationProps) => {
  const {
    state: { messages, isLoading }
  } = useChatHistory(chatId);

  return (
    <div className='absolute inset-0 flex flex-col'>
      <ConversationHeader chatId={chatId} chat={chat} />
      <MessageList messages={messages} isLoading={isLoading} />
      <MessageInput />
    </div>
  );
};
