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
  className?: string;
  onInvalid?: SubmitErrorHandler<TFieldValues>;
  onValid?: SubmitHandler<TFieldValues>;
}

export type ResolverFieldValues<TResolver extends Resolver> =
  TResolver extends Resolver<infer T> ? T : unknown;

export default function HookForm<TFieldValues extends FieldValues>({
  children,
  className,
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
        className={className}
        onSubmit={
          onValid ? methods.handleSubmit(onValid, onInvalid) : undefined
        }
      >
        {children}
      </form>
    </FormProvider>
  );
}
