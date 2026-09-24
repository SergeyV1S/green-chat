import axios from "axios";

import type { Credentials } from "@/shared/utils";
import { buildRequestUrl } from "@/shared/utils";

type AvatarResponse = {
  urlAvatar: string;
};

export const getAvatar = async (credentials: Credentials, chatId: string) => {
  const { data } = await axios.post<AvatarResponse>(
    buildRequestUrl(credentials, "getAvatar"),
    { chatId },
    { hideErrorToast: true }
  );

  return data;
};
