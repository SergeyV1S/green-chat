import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import { zodResolver } from "@hookform/resolvers/zod";

import { getAccountSettings } from "@/pages/auth/api/getAccountSettings";
import { DEFAULT_AUTH_VALUES, authSchema } from "@/pages/auth/constants";
import type { AuthFormValues } from "@/pages/auth/types";
import { PATHS } from "@/shared/constants/paths";
import { saveCredentials } from "@/shared/utils";

import { getErrorMessage } from "../helpers";

export const useAuth = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: DEFAULT_AUTH_VALUES
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setError(null);

    try {
      await getAccountSettings(values);
      saveCredentials(values);
      navigate(`/${PATHS.CHAT}`, { replace: true });
    } catch (submitError) {
      setError(getErrorMessage(submitError));
    }
  });

  return {
    state: {
      form,
      error,
      isSubmitting: form.formState.isSubmitting
    },
    functions: {
      onSubmit
    }
  };
};
