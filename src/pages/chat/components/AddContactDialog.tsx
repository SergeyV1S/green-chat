import { Controller } from "react-hook-form";

import { useAddContact } from "@/pages/chat/hooks/useAddContact";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Field,
  FieldError,
  FieldLabel,
  Input,
  Spinner
} from "@/shared/ui";

type AddContactDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const AddContactDialog = ({ open, onOpenChange }: AddContactDialogProps) => {
  const { state, functions } = useAddContact({ onSuccess: () => onOpenChange(false) });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-sm'>
        <form onSubmit={functions.onSubmit} className='flex flex-col gap-5'>
          <DialogTitle>Найти по номеру</DialogTitle>

          <Controller
            name='phone'
            control={state.form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='phone'>Номер телефона</FieldLabel>
                <Input
                  {...field}
                  id='phone'
                  inputMode='tel'
                  autoComplete='off'
                  placeholder='+79991234567'
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {state.error && (
            <p role='alert' className='text-sm text-destructive'>
              {state.error}
            </p>
          )}

          <Button type='submit' disabled={state.isSubmitting} className='w-full'>
            {state.isSubmitting && <Spinner />}
            Найти
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
