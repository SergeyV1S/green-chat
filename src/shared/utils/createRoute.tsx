import { Suspense } from "react";
import type { RouteObject } from "react-router";

import { Spinner } from "../ui";

export const createRoute = (
  path: string,
  element: RouteObject["element"],
  options?: RouteObject
): RouteObject => ({
  path,
  element: <Suspense fallback={<Spinner />}>{element}</Suspense>,
  errorElement: <div className=''>Error</div>,
  ...options
});
