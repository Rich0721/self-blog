import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SiteHeader from "./SiteHeader";
test.each(["home", "notes"] as const)("HEADER-01/02/03: active page %s", async page => {
 const onNavigate = jest.fn(); render(<SiteHeader currentPage={page} onNavigate={onNavigate} />);
 expect(screen.getByText("Rich's Blog")).toBeVisible();
 const current = screen.getByText(page === "home" ? "關於我" : "學習筆記");
 expect(current).toHaveAttribute("aria-current", "page"); expect(current.closest("a")).toBeNull();
 const link = screen.getByRole("link", { name: page === "home" ? "學習筆記" : "關於我" });
 expect(link).toHaveAttribute("href", page === "home" ? "/notes" : "/");
 await userEvent.click(link); expect(onNavigate).toHaveBeenCalledTimes(1); expect(onNavigate).toHaveBeenCalledWith(page === "home" ? "notes" : "home");
});
test("HEADER-04: GitHub destination and new tab", () => {
 render(<SiteHeader currentPage="home" onNavigate={jest.fn()} />);
 const link = screen.getByRole("link", { name: /GitHub/ });
 expect(link).toHaveAttribute("href", "https://github.com/Rich0721"); expect(link).toHaveAttribute("target", "_blank");
 expect(link.getAttribute("rel")).toEqual(expect.stringContaining("noopener")); expect(link.getAttribute("rel")).toEqual(expect.stringContaining("noreferrer"));
 expect(link.querySelector("img")?.getAttribute("src")).toMatch(/github.png$/);
});
