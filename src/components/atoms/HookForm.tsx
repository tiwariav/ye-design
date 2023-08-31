import {
  FieldValues,
  FormProvider,
  Resolver,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormProps,
  useForm,
} from "react-hook-form";

export interface HookFormProps<TFieldValues extends FieldValues>
  extends UseFormProps<TFieldValues> {
  children: React.ReactNode;
  onInvalid?: SubmitErrorHandler<TFieldValues>;
  onValid?: SubmitHandler<TFieldValues>;
}

export type ResolverFieldValues<TResolver extends Resolver> =
  TResolver extends Resolver<infer T> ? T : unknown;

export default function HookForm<TFieldValues extends FieldValues>({
  children,
  criteriaMode = "all",
  mode = "onBlur",
  onInvalid,
  onValid,
  ...props
}: HookFormProps<TFieldValues>) {
  const methods = useForm({ criteriaMode, mode, ...props });
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={
          onValid
            ? (event) => {
                void methods.handleSubmit(onValid, onInvalid)(event);
              }
            : undefined
        }
      >
        {children}
      </form>
    </FormProvider>
  );
}
