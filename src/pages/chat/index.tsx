import { ChatArea, ChatList } from "@/pages/chat/components";
import { ChatsProvider } from "@/pages/chat/context";

const ChatPage = () => (
  <ChatsProvider>
    <ChatList />
    <ChatArea />
  </ChatsProvider>
);

export default ChatPage;
