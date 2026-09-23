import axios from "axios";

import type { ContactInfo } from "@/pages/chat/types";
import type { Credentials } from "@/shared/utils";
import { buildRequestUrl } from "@/shared/utils";

export const getContactInfo = async (credentials: Credentials, chatId: string) => {
  const { data } = await axios.post<ContactInfo>(buildRequestUrl(credentials, "getContactInfo"), {
    chatId
  });

  return data;
};
