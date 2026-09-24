import axios from "axios";

import type { Credentials } from "@/shared/utils";
import { buildRequestUrl } from "@/shared/utils";

type DeleteNotificationResponse = {
  result: boolean;
  reason: string;
};

export const deleteNotification = async (credentials: Credentials, receiptId: number) => {
  const { data } = await axios.delete<DeleteNotificationResponse>(
    `${buildRequestUrl(credentials, "deleteNotification")}/${receiptId}`,
    { hideErrorToast: true }
  );

  return data;
};
