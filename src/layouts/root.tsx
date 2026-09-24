import { Outlet } from "react-router";

export const RootLayout = () => (
  <div className='flex min-h-svh flex-col'>
    <Outlet />
  </div>
);
