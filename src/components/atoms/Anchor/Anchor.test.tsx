import { render, screen } from "@testing-library/react";
import Anchor from "./Anchor.js";

test("Anchor renders", () => {
  render(<Anchor>Anchor</Anchor>);
  expect(screen.getByText(/anchor/i)).toBeTruthy();
});
