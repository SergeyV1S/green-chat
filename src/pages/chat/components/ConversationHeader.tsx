import { ArrowLeftIcon, MagnifyingGlassIcon } from "@phosphor-icons/react";
import { cn } from "cn";

import { getAvatarClassName, getInitials } from "@/pages/chat/helpers";
import type { ChatListItemModel } from "@/pages/chat/types";
import { useHash } from "@/shared/hooks";
import { Button } from "@/shared/ui";

type ConversationHeaderProps = {
  chatId: string;
  chat: ChatListItemModel | null;
};

export const ConversationHeader = ({ chatId, chat }: ConversationHeaderProps) => {
  const { clearHash } = useHash();

  const name = chat?.name ?? chatId;
  const avatarUrl = chat?.avatarUrl;

  return (
    <header className='flex items-center gap-3 border-b bg-card px-3 py-2'>
      <Button
        variant='ghost'
        size='icon'
        aria-label='Назад'
        className='rounded-full'
        onClick={clearHash}
      >
        <ArrowLeftIcon size={20} />
      </Button>

      <span
        className={cn(
          "flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full text-sm font-semibold text-white",
          !avatarUrl && getAvatarClassName(chatId)
        )}
      >
        {avatarUrl ? (
          <img src={avatarUrl} alt={name} className='size-full object-cover' />
        ) : (
          getInitials(name)
        )}
      </span>

      <div className='flex min-w-0 flex-col'>
        <span className='truncate font-semibold text-foreground'>{name}</span>
        <span className='truncate text-xs text-muted-foreground'>был(а) в сети недавно</span>
      </div>

      <Button variant='ghost' size='icon' aria-label='Поиск' className='ml-auto rounded-full'>
        <MagnifyingGlassIcon size={20} />
      </Button>
    </header>
  );
};
