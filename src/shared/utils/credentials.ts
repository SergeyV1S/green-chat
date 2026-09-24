export type Credentials = {
  idInstance: string;
  apiTokenInstance: string;
  apiUrl: string;
};

const STORAGE_KEY = "green-api-credentials";

export const saveCredentials = (credentials: Credentials) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(credentials));
};

export const getCredentials = () => {
  const credentials = localStorage.getItem(STORAGE_KEY);

  if (!credentials) {
    return null;
  }

  try {
    return JSON.parse(credentials) as Credentials;
  } catch {
    return null;
  }
};

export const clearCredentials = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export const buildRequestUrl = (
  { apiUrl, idInstance, apiTokenInstance }: Credentials,
  method: string
) => `${apiUrl}/waInstance${idInstance}/${method}/${apiTokenInstance}`;
