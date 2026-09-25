import { type MiddlewareFunction, redirect } from "react-router";

import { PATHS } from "@/shared/constants/paths";
import { getCredentials } from "@/shared/utils";

export const authMiddleware: MiddlewareFunction = ({ request }) => {
  const url = new URL(request.url);
  const pathname = url.pathname.slice(1);

  const credentials = getCredentials();

  if (!credentials && pathname !== PATHS.AUTH) {
    throw redirect(`/${PATHS.AUTH}`);
  }

  if (credentials && pathname === PATHS.AUTH) {
    throw redirect(`/${PATHS.CHAT}`);
  }
};
