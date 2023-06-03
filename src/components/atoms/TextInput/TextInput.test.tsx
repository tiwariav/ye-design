import { render, screen } from "@testing-library/react";
import TextInput from "./TextInput.js";

test("TextInput renders", () => {
  render(<TextInput label="Test Label" />);
  expect(screen.getByText("Test Label")).toBeTruthy();
});
