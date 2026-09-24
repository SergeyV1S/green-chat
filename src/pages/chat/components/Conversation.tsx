import { useConversation } from "../hooks/useConversation";
import type { ChatListItemModel } from "../types";
import { ConversationHeader } from "./ConversationHeader";
import { MessageInput } from "./MessageInput";
import { MessageList } from "./MessageList";

type ConversationProps = {
  chatId: string;
  chat: ChatListItemModel | null;
};

export const Conversation = ({ chatId, chat }: ConversationProps) => {
  const { state, functions } = useConversation(chatId);

  return (
    <div className='absolute inset-0 flex flex-col'>
      <ConversationHeader chatId={chatId} chat={chat} />
      <MessageList messages={state.messages} isLoading={state.isLoading} />
      <MessageInput onSend={functions.handleSend} />
    </div>
  );
};
