import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { useState } from "react";

import { Button } from "../index.js";
import TextInput, { TextInputProps } from "./TextInput.js";

export default function PasswordInput(props: TextInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <TextInput
      iconAfter={
        <Button spacing="none" variant="borderless">
          {showPassword ? (
            <IconEye onClick={() => setShowPassword(false)} />
          ) : (
            <IconEyeOff onClick={() => setShowPassword(true)} />
          )}
        </Button>
      }
      type={showPassword ? "text" : "password"}
      {...props}
    />
  );
}
