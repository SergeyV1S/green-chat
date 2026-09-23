import { lazy } from "react";
import { Link, createBrowserRouter } from "react-router";

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
      {
        path: "/",
        element: (
          <div className='space-x-11'>
            <Link to={PATHS.AUTH}>AUTH</Link>
            <Link to={PATHS.CHAT}>CHAT</Link>
          </div>
        )
      },
      AuthRoute,
      ChatRoute
    ]
  }
]);

export { router };
