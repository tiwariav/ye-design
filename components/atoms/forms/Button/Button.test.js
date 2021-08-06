import { render } from "@testing-library/react";
import React from "react";
import Button from "./Button";

test("Button renders", () => {
  const { queryByText } = render(<Button label="Button" />);
  expect(queryByText(/button/i)).toBeTruthy();
});
