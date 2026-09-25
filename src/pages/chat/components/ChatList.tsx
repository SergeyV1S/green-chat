import { cn } from "cn";

import { useHash } from "@/shared/hooks";
import { Input, MessageGroup, Spinner } from "@/shared/ui";

import { useChatsContext } from "../context";
import { ChatListItem, ChatListItemSkeleton, NewChatPopover } from "./";

export const ChatList = () => {
  const { state } = useChatsContext();
  const { hashValue: selectedChatId } = useHash();

  return (
    <aside
      className={cn(
        "flex w-full shrink-0 flex-col bg-card min-[925px]:w-72 min-[925px]:border-r lg:w-98",
        selectedChatId && "max-[925px]:hidden"
      )}
    >
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
