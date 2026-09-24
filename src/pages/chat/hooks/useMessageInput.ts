import { type FormEvent, useState } from "react";

export const useMessageInput = (onSend: (text: string) => Promise<void>) => {
  const [value, setValue] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const text = value.trim();

    if (!text || isSending) {
      return;
    }

    setValue("");
    setIsSending(true);

    try {
      await onSend(text);
    } catch {
      setValue(text);
    } finally {
      setIsSending(false);
    }
  };

  return { state: { value, isSending }, functions: { handleSubmit, setValue } };
};
