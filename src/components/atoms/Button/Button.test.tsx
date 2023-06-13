import { render, screen } from "@testing-library/react";

import Button from "./Button.js";

test("Button renders", () => {
  render(<Button label="Button" />);
  expect(screen.getByText(/button/i)).toBeTruthy();
});
