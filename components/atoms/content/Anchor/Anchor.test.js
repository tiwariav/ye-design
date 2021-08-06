import { render } from "@testing-library/react";
import React from "react";
import Anchor from "./Anchor";

test("Anchor renders", () => {
  const { queryByText } = render(<Anchor label="Anchor" />);
  expect(queryByText(/anchor/i)).toBeTruthy();
});
