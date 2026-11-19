import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
test("IMAGE-01: cancels the context menu on every homepage image", () => {
 const { container } = render(<App />);
 const images = container.querySelectorAll("img");
 expect(images).toHaveLength(7);
 images.forEach(image => {
  const event = new MouseEvent("contextmenu", { bubbles: true, cancelable: true });
  expect(image.dispatchEvent(event)).toBe(false);
  expect(event.defaultPrevented).toBe(true);
 });
});
test("IMAGE-02: preserves the context menu on non-image content", () => {
 render(<App />);
 const heading = screen.getByRole("heading", { name: "Hi, I'm Rich" });
 const event = new MouseEvent("contextmenu", { bubbles: true, cancelable: true });
 expect(heading.dispatchEvent(event)).toBe(true);
 expect(event.defaultPrevented).toBe(false);
});
beforeEach(() => { window.history.replaceState({}, "", "/"); jest.spyOn(window, "scrollTo").mockImplementation(() => {}); });
afterEach(() => { jest.restoreAllMocks(); window.history.replaceState({}, "", "/"); });
test("APP-01: navigates between home and notes", async () => {
 render(<App />); await userEvent.click(screen.getByRole("link", { name: "學習筆記" }));
 expect(window.location.pathname).toBe("/notes"); expect(screen.getByRole("heading", { name: "學習筆記" })).toBeVisible();
 expect(screen.getByText("學習筆記", { selector: "span" })).toHaveAttribute("aria-current", "page");
 await userEvent.click(screen.getByRole("link", { name: "關於我" }));
 expect(window.location.pathname).toBe("/"); expect(screen.getByRole("heading", { name: "Hi, I'm Rich" })).toBeVisible();
});
test("APP-02/03: initializes from pathname and responds to popstate", () => {
 window.history.replaceState({}, "", "/notes"); render(<App />);
 expect(screen.getByRole("heading", { name: "學習筆記" })).toBeVisible();
 act(() => { window.history.replaceState({}, "", "/"); window.dispatchEvent(new PopStateEvent("popstate")); });
 expect(screen.getByRole("heading", { name: "Hi, I'm Rich" })).toBeVisible();
 expect(screen.getByText("關於我")).toHaveAttribute("aria-current", "page");
});
