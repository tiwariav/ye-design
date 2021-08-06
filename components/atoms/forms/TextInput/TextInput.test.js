import { render } from "@testing-library/react";
import React from "react";
import TextInput from "./TextInput";

test("TextInput renders", () => {
  const { queryByText } = render(<TextInput />);
  expect(queryByText(/textinput/i)).toBeTruthy();
});
