import { Fragment, useEffect, useRef } from "react";

import { formatDateSeparator } from "@/pages/chat/helpers";
import type { ChatMessage } from "@/pages/chat/types";
import { Spinner } from "@/shared/ui";

import { MessageBubble } from "./MessageBubble";

type MessageListProps = {
  messages: ChatMessage[];
  isLoading: boolean;
};

export const MessageList = ({ messages, isLoading }: MessageListProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const sortedMessages = [...messages].sort((a, b) => a.timestamp - b.timestamp);

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  if (isLoading) {
    return (
      <div className='flex flex-1 items-center justify-center'>
        <Spinner className='size-6 text-white' />
      </div>
    );
  }

  return (
    <div ref={containerRef} className='flex flex-1 flex-col gap-2 overflow-y-auto px-4 py-4'>
      {sortedMessages.map((message, index) => {
        const previous = sortedMessages[index - 1];
        const showDate =
          !previous ||
          new Date(previous.timestamp * 1000).toDateString() !==
            new Date(message.timestamp * 1000).toDateString();

        return (
          <Fragment key={message.idMessage}>
            {showDate && (
              <span className='mx-auto w-fit rounded-full bg-black/15 px-3 py-0.5 text-xs font-medium text-white'>
                {formatDateSeparator(message.timestamp)}
              </span>
            )}
            <MessageBubble message={message} />
          </Fragment>
        );
      })}
    </div>
  );
};
