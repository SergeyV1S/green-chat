import { cn } from "cn";

import { getMessagePreview } from "@/pages/chat/helpers";
import type { ChatMessage } from "@/pages/chat/types";
import { Message } from "@/shared/ui";
import { toHoursAndMinutes } from "@/shared/utils";

type MessageBubbleProps = {
  message: ChatMessage;
};

export const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isOutgoingMessage = message.type === "outgoing";
  const text = getMessagePreview(message);
  const time = toHoursAndMinutes(message.timestamp);

  return (
    <Message align={isOutgoingMessage ? "end" : "start"}>
      <div
        className={cn(
          "flex max-w-[70%] flex-col gap-0.5 rounded-2xl px-3 py-2 shadow-sm",
          isOutgoingMessage ? "bg-primary text-primary-foreground" : "bg-card text-foreground"
        )}
      >
        <span className='text-sm whitespace-pre-wrap'>{text}</span>
        {time && (
          <span
            className={cn(
              "self-end text-[10px] leading-none",
              isOutgoingMessage ? "text-primary-foreground/70" : "text-muted-foreground"
            )}
          >
            {time}
          </span>
        )}
      </div>
    </Message>
  );
};
