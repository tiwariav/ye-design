import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons";
import { TextInput } from "ye-ui/components/atoms/forms";

export default function PasswordInput({ ...props }) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <TextInput
      type="password"
      iconAfter={
        showPassword ? (
          <AiFillEye onClick={() => setShowPassword(false)} />
        ) : (
          <AiFillEyeInvisible onClick={() => setShowPassword(true)} />
        )
      }
      {...props}
    />
  );
}
