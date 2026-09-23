import { Controller } from "react-hook-form";

import { useAuth } from "@/pages/auth/hooks/useAuth";
import { Button, Field, FieldError, FieldGroup, FieldLabel, Input, Spinner } from "@/shared/ui";

export const AuthForm = () => {
  const { state, functions } = useAuth();

  return (
    <form
      onSubmit={functions.onSubmit}
      className='flex w-full max-w-md flex-col gap-8 rounded-4xl border bg-card p-8 shadow-xl shadow-primary/5'
    >
      <header className='flex flex-col items-center gap-2 text-center'>
        <h1 className='text-gradient font-heading text-4xl font-bold tracking-tight'>MAX</h1>
        <p className='text-sm text-muted-foreground'>Войдите через инстанс GREEN-API</p>
      </header>

      <FieldGroup>
        <Controller
          name='idInstance'
          control={state.form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor='idInstance'>idInstance</FieldLabel>
              <Input
                {...field}
                id='idInstance'
                inputMode='numeric'
                autoComplete='off'
                placeholder='1101000001'
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name='apiTokenInstance'
          control={state.form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor='apiTokenInstance'>apiTokenInstance</FieldLabel>
              <Input
                {...field}
                id='apiTokenInstance'
                type='password'
                autoComplete='off'
                placeholder='d75b3a66374942c5b3c019c698abc2067e151558acbd412345'
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name='apiUrl'
          control={state.form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor='apiUrl'>apiUrl</FieldLabel>
              <Input
                {...field}
                id='apiUrl'
                autoComplete='off'
                placeholder='https://api.green-api.com'
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      {state.error && (
        <p role='alert' className='text-center text-sm text-destructive'>
          {state.error}
        </p>
      )}

      <Button
        type='submit'
        size='lg'
        variant='gradient'
        disabled={state.isSubmitting}
        className='w-full text-base'
      >
        {state.isSubmitting && <Spinner />}
        Войти
      </Button>
    </form>
  );
};
