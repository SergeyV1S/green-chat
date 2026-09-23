export type Chat = {
  id: string;
  name?: string;
  archive?: boolean;
  notSpam?: boolean;
  ephemeralExpiration?: number;
  ephemeralSettingTimestamp?: number;
};

export type Chats = Chat[];
