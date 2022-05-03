import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

export function renderWithUser(element) {
  return {
    user: userEvent.setup(),
    ...render(element),
  };
}
