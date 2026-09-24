import { Input, MessageGroup, Spinner } from "@/shared/ui";

import { useChatsContext } from "../context";
import { ChatListItem, ChatListItemSkeleton, NewChatPopover } from "./";

export const ChatList = () => {
  const { state } = useChatsContext();

  return (
    <aside className='flex w-105 shrink-0 flex-col border-r bg-card'>
      <header className='flex items-center justify-between px-5 pt-5 pb-3'>
        <h1 className='text-2xl font-bold text-foreground'>Чаты</h1>
        <NewChatPopover />
      </header>

      <div className='px-5 pb-3'>
        <Input placeholder='Найти' className='h-10 rounded-2xl border-transparent bg-muted' />
      </div>

      {state.isListLoading ? (
        <div className='flex flex-1 items-center justify-center'>
          <Spinner className='size-6 text-muted-foreground' />
        </div>
      ) : (
        <MessageGroup className='gap-1 overflow-y-auto px-3 py-2'>
          {state.items.map(({ id, chat }) =>
            chat ? <ChatListItem key={id} chat={chat} /> : <ChatListItemSkeleton key={id} />
          )}
        </MessageGroup>
      )}
    </aside>
  );
};
