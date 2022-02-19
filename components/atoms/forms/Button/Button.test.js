import { render, screen } from "@testing-library/react";
import Button from "./Button";

test("Button renders", () => {
  render(<Button label="Button" />);
  expect(screen.getByText(/button/i)).toBeTruthy();
});
