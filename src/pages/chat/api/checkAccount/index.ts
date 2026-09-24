import axios from "axios";

import type { Credentials } from "@/shared/utils";
import { buildRequestUrl } from "@/shared/utils";

type CheckAccountResponse =
  { exist: boolean; chatId: string; fromCache: boolean } | { status: false; reason: string };

export const checkAccount = async (credentials: Credentials, phoneNumber: number) => {
  const { data } = await axios.post<CheckAccountResponse>(
    buildRequestUrl(credentials, "checkAccount"),
    { phoneNumber }
  );

  return data;
};
