import { memo } from "react";
import {
  FormProvider,
  SubmitHandler,
  UseFormProps,
  useForm,
} from "react-hook-form";

interface HookFormProps<TFieldValues> extends UseFormProps<TFieldValues> {
  children: React.ReactNode;
  onSubmit?: SubmitHandler<TFieldValues>;
}

function HookForm<TFieldValues>({
  children,
  criteriaMode = "all",
  mode = "onBlur",
  onSubmit,
  ...props
}: HookFormProps<TFieldValues>) {
  const methods = useForm({ criteriaMode, mode, ...props });
  return (
    <FormProvider {...methods}>
      <form onSubmit={() => methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
}

export default memo(HookForm);
