import axios from "axios";

import type { AccountSettings } from "@/pages/auth/types";
import type { Credentials } from "@/shared/utils";
import { buildRequestUrl } from "@/shared/utils";

export const getAccountSettings = async (credentials: Credentials) => {
  const { data } = await axios.get<AccountSettings>(buildRequestUrl(credentials, "getSettings"));

  return data;
};
