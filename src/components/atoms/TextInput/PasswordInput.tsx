import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { useState } from "react";

import TextInput from "./TextInput.js";

export default function PasswordInput({ ...props }) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <TextInput
      iconAfter={
        showPassword ? (
          <IconEye onClick={() => setShowPassword(false)} />
        ) : (
          <IconEyeOff onClick={() => setShowPassword(true)} />
        )
      }
      type={showPassword ? "text" : "password"}
      {...props}
    />
  );
}
