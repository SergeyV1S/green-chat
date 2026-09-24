import { cn } from "cn";

import * as formatTime from "@/shared/utils";
import { useHash } from "@/shared/hooks";
import { Message, MessageAvatar, MessageContent } from "@/shared/ui";

import { getAvatarClassName, getInitials } from "../helpers";
import type { ChatListItemModel } from "../types";

type ChatListItemProps = {
  chat: ChatListItemModel;
};

export const ChatListItem = ({ chat }: ChatListItemProps) => {
  const { id, name, avatarUrl, lastMessageText, lastMessageTimestamp } = chat;
  const { hashValue: selectedChatId, setHash: selectChat } = useHash();

  const time = formatTime.toHoursAndMinutes(lastMessageTimestamp);
  const avatar = getAvatarClassName(id);
  const isActive = selectedChatId === id;

  return (
    <button
      type='button'
      aria-label={name}
      onClick={() => selectChat(id)}
      className={cn(
        "w-full cursor-pointer rounded-2xl px-2 py-1.5 text-left transition-colors hover:bg-muted",
        isActive && "bg-muted"
      )}
    >
      <Message>
        <MessageAvatar
          className={cn(
            "size-12 self-center text-base font-semibold text-white",
            !avatarUrl && avatar
          )}
        >
          {avatarUrl ? (
            <img src={avatarUrl} alt={name} className='size-full object-cover' />
          ) : (
            getInitials(name)
          )}
        </MessageAvatar>

        <MessageContent className='justify-center gap-0.5'>
          <span className='flex items-center gap-1'>
            <span className='truncate text-sm font-semibold text-foreground'>{name}</span>
            {time && <span className='ml-auto shrink-0 text-xs text-muted-foreground'>{time}</span>}
          </span>

          <span className='truncate text-sm text-muted-foreground'>
            {lastMessageText ? lastMessageText : "Напишите что нибудь!"}
          </span>
        </MessageContent>
      </Message>
    </button>
  );
};
