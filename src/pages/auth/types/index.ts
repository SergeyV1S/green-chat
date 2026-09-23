import type { z } from "zod";

import type { authSchema } from "@/pages/auth/constants";

export type AuthFormValues = z.infer<typeof authSchema>;

export type AccountSettings = {
  wid: string;
  countryInstance: string;
  typeAccount: string;
  webhookUrl: string;
  webhookUrlToken: string;
  delaySendMessagesMilliseconds: number;
  markIncomingMessagesReaded: string;
  markIncomingMessagesReadedOnReply: string;
  outgoingWebhook: string;
  outgoingMessageWebhook: string;
  outgoingAPIMessageWebhook: string;
  incomingWebhook: string;
  stateWebhook: string;
  keepOnlineStatus: string;
};
