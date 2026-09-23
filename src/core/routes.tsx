import { lazy } from "react";
import { createBrowserRouter } from "react-router";

import { ChatsLayout } from "@/layouts/chats";
import { RootLayout } from "@/layouts/root";
import { PATHS } from "@/shared/constants/paths";
import { createRoute } from "@/shared/utils";

const AuthPage = lazy(() => import("@/pages/auth"));
const ChatPage = lazy(() => import("@/pages/chat"));

const AuthRoute = createRoute(PATHS.AUTH, <AuthPage />);
const ChatRoute = createRoute(PATHS.CHAT, <ChatPage />);

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      AuthRoute,
      {
        element: <ChatsLayout />,
        children: [ChatRoute]
      }
    ]
  }
]);

export { router };
