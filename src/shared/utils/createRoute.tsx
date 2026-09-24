import { Suspense } from "react";
import type { RouteObject } from "react-router";

import { PageLoader, RouteError } from "../ui";

export const createRoute = (
  path: string,
  element: RouteObject["element"],
  options?: RouteObject
): RouteObject => ({
  path,
  element: <Suspense fallback={<PageLoader />}>{element}</Suspense>,
  errorElement: <RouteError />,
  ...options
});
