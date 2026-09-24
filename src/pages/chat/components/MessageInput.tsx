import { ArrowUpIcon, PaperclipIcon, StickerIcon } from "@phosphor-icons/react";

import { Button, Input } from "@/shared/ui";

import { useMessageInput } from "../hooks/useMessageInput";

type MessageInputProps = {
  onSend: (text: string) => Promise<void>;
};

export const MessageInput = ({ onSend }: MessageInputProps) => {
  const { state, functions } = useMessageInput(onSend);

  return (
    <form onSubmit={functions.handleSubmit} className='px-4 pb-4'>
      <div className='flex items-center gap-1 rounded-3xl border bg-card px-2 py-1.5 shadow-sm'>
        <Button
          type='button'
          variant='ghost'
          size='icon'
          aria-label='Прикрепить'
          className='rounded-full text-muted-foreground'
        >
          <PaperclipIcon size={20} />
        </Button>

        <Input
          value={state.value}
          onChange={(event) => functions.setValue(event.target.value)}
          placeholder='Сообщение'
          className='h-9 flex-1 border-transparent bg-transparent shadow-none focus-visible:ring-0'
        />

        <Button
          type='button'
          variant='ghost'
          size='icon'
          aria-label='Стикеры'
          className='rounded-full text-muted-foreground'
        >
          <StickerIcon size={20} />
        </Button>

        <Button
          type='submit'
          size='icon'
          aria-label='Отправить'
          disabled={!state.value.trim() || state.isSending}
          className='rounded-full'
        >
          <ArrowUpIcon size={20} weight='bold' />
        </Button>
      </div>
    </form>
  );
};
