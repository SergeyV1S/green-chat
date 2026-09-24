import { useContext } from "react";

import { ChatsContext } from "@/pages/chat/context";

export const useChatsContext = () => {
  const context = useContext(ChatsContext);

  if (!context) {
    throw new Error("useChats must be used within ChatsProvider");
  }

  return context;
};
