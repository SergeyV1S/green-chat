import { useEffect } from "react";
import { useNavigate } from "react-router";

import { getChats } from "@/pages/chat/api/getChats";
import { PATHS } from "@/shared/constants/paths";
import { getCredentials } from "@/shared/utils";

const ChatPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const credentials = getCredentials();

    if (!credentials) {
      navigate(`/${PATHS.AUTH}`, { replace: true });
      return;
    }

    getChats(credentials).catch(() => {});
  }, []);

  return "Chat";
};

export default ChatPage;
