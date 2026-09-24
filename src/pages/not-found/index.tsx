import { Link } from "react-router";

import { PATHS } from "@/shared/constants/paths";
import { buttonVariants } from "@/shared/ui";

const NotFoundPage = () => (
  <div className='flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-4 text-center'>
    <div className='flex flex-col items-center gap-2'>
      <h1 className='text-gradient font-heading text-7xl font-bold'>404</h1>
      <p className='text-lg font-medium text-foreground'>Страница не найдена</p>
      <p className='max-w-sm text-sm text-muted-foreground'>
        Возможно, страница удалена или еще в разработке.
      </p>
    </div>

    <Link to={PATHS.CHAT} className={buttonVariants({ variant: "gradient", size: "lg" })}>
      На главную
    </Link>
  </div>
);

export default NotFoundPage;
