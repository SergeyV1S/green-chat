import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";

import axios, { type AxiosError } from "axios";

import { Toaster, toast } from "@/shared/ui";

import "./index.css";
import { router } from "./routes";

axios.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    if (!error.config?.hideErrorToast) {
      toast.add({
        title: "Произошла ошибка",
        type: "error",
        priority: "high",
        description: error.response?.data?.message || "Неизвестная ошибка"
      });
    }

    return Promise.reject(error);
  }
);

createRoot(document.getElementById("root")!).render(
  <>
    <RouterProvider router={router} />
    <Toaster timeout={2000} />
  </>
);
