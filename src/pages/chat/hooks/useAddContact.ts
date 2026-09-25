import { useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";

import { useHash } from "@/shared/hooks";
import { getCredentials } from "@/shared/utils";

import { checkAccount, sendMessage } from "../api";
import { addContactSchema } from "../constants";
import { useChatsContext } from "../context";
import { normalizePhone } from "../helpers";

type AddContactValues = z.infer<typeof addContactSchema>;

type UseAddContactParams = {
  onSuccess: () => void;
};

export const useAddContact = ({ onSuccess }: UseAddContactParams) => {
  const { setHash } = useHash();
  const {
    functions: { addChat }
  } = useChatsContext();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<AddContactValues>({
    resolver: zodResolver(addContactSchema),
    defaultValues: { phone: "+7" }
  });

  const onSubmit = form.handleSubmit(async ({ phone }) => {
    setError(null);

    const credentials = getCredentials()!;

    try {
      const result = await checkAccount(credentials, Number(normalizePhone(phone)));

      if ("status" in result) {
        setError("Сервис недоступен, попробуйте позже");
        return;
      }

      if (!result.exist) {
        setError("Номер не найден в MAX");
        return;
      }

      await sendMessage(credentials, result.chatId, "", true).catch(() => {});
      await addChat(result.chatId, credentials);

      setHash(result.chatId);

      form.reset();

      onSuccess();
    } catch {
      setError("Не удалось выполнить поиск");
    }
  });

  return {
    state: { form, error, isSubmitting: form.formState.isSubmitting },
    functions: { onSubmit }
  };
};
