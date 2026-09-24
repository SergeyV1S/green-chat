import backgroundPattern from "@/assets/background-pattern.svg";
import { useHash } from "@/shared/hooks";

import { useChatsContext } from "../context";
import { Conversation } from "./Conversation";

export const ChatArea = () => {
  const { hashValue: selectedChatId } = useHash();
  const { state } = useChatsContext();

  const selectedChat = state.items.find((item) => item.id === selectedChatId)?.chat ?? null;

  return (
    <main className='relative flex-1 overflow-hidden bg-(image:--gradient-chat)'>
      <div
        aria-hidden
        className='pointer-events-none absolute inset-0 opacity-50'
        style={{
          backgroundColor: "var(--pattern-color)",
          maskImage: `url(${backgroundPattern})`,
          WebkitMaskImage: `url(${backgroundPattern})`,
          maskRepeat: "repeat",
          WebkitMaskRepeat: "repeat",
          maskSize: "280px",
          WebkitMaskSize: "280px"
        }}
      />

      {selectedChatId && (
        <Conversation key={selectedChatId} chatId={selectedChatId} chat={selectedChat} />
      )}
    </main>
  );
};
