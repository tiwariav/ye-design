import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import TextInput from "./TextInput.js";

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
