import axios from "axios";

import type { Credentials } from "@/shared/utils";
import { buildRequestUrl } from "@/shared/utils";

type SendMessageResponse = {
  idMessage: string;
};

export const sendMessage = async (
  credentials: Credentials,
  chatId: string,
  message: string,
  hideErrorToast = false
) => {
  const { data } = await axios.post<SendMessageResponse>(
    buildRequestUrl(credentials, "sendMessage"),
    { chatId, message },
    { hideErrorToast }
  );

  return data;
};
