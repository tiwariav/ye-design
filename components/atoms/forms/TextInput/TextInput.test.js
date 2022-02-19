import { render, screen } from "@testing-library/react";
import TextInput from "./TextInput";

test("TextInput renders", () => {
  render(<TextInput />);
  expect(screen.getByText(/textinput/i)).toBeTruthy();
});
