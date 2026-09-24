import "axios";

declare module "axios" {
  export interface AxiosRequestConfig {
    hideErrorToast?: boolean;
  }
}
