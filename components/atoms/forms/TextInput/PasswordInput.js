import clsx from "clsx";
import { ReactElement } from "react";
import { TextInput } from "ye-ui/components/atoms/forms";
import styles from "./basicTextInput.module.css";

export default function PasswordInput({ ...props }) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <TextInput
      type="password"
      iconAfter={showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
      {...props}
    />
  );
}
