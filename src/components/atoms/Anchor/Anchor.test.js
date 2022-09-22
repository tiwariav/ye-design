import { render, screen } from "@testing-library/react";
import Anchor from "./Anchor.js";

test("Anchor renders", () => {
  render(<Anchor label="Anchor" />);
  expect(screen.getByText(/anchor/i)).toBeTruthy();
});
