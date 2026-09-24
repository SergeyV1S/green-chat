import axios from "axios";

import type { Credentials } from "@/shared/utils";
import { buildRequestUrl } from "@/shared/utils";

import type { NotificationBody } from "../../types";

type ReceiveNotification = {
  receiptId: number;
  body: NotificationBody;
};

export const receiveNotification = async (credentials: Credentials, receiveTimeout: number) => {
  const { data } = await axios.get<ReceiveNotification | null>(
    buildRequestUrl(credentials, "receiveNotification"),
    { params: { receiveTimeout }, hideErrorToast: true }
  );

  return data;
};
