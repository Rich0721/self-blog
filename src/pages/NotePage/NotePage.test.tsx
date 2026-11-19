import { render, screen } from "@testing-library/react";
import NotePage from "./NotePage";
test("NOTE-01: renders notes placeholder", () => {
 render(<NotePage />); expect(screen.getByRole("heading", { name: "學習筆記" })).toBeVisible(); expect(screen.getByText("筆記內容將於日後新增。")).toBeVisible();
});
