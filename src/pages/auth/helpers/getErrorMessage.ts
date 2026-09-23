import axios from "axios";

export const getErrorMessage = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;

    if (status === 401 || status === 403) {
      return "Неверный idInstance или apiTokenInstance";
    }

    if (status === 466) {
      return "Инстанс не оплачен или не авторизован";
    }

    return "Не удалось подключиться. Проверьте api url и попробуйте снова";
  }

  return "Что-то пошло не так. Попробуйте ещё раз";
};
