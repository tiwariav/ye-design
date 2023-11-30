import { useEffect } from "react";
import {
  FieldValues,
  FormProvider,
  Path,
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
  errors?: Record<"root" | `root.${string}` | Path<TFieldValues>, string>;
  onInvalid?: SubmitErrorHandler<TFieldValues>;
  onValid?: SubmitHandler<TFieldValues>;
}

export type ResolverFieldValues<TResolver extends Resolver> =
  TResolver extends Resolver<infer T> ? T : unknown;

export default function HookForm<TFieldValues extends FieldValues>({
  children,
  className,
  criteriaMode = "all",
  errors,
  mode = "onBlur",
  onInvalid,
  onValid,
  ...props
}: HookFormProps<TFieldValues>) {
  const methods = useForm({ criteriaMode, mode, ...props });

  useEffect(() => {
    if (errors) {
      for (const [key, value] of Object.entries(errors)) {
        methods.setError(key as Path<TFieldValues>, {
          message: value,
          type: "manual",
        });
      }
    }
  }, [errors, methods]);

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
