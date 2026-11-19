import { render, screen } from "@testing-library/react";
import Introduction from "./Introduction";
test("INTRO-01/02: renders and updates every profile field", () => {
 const data = { name: "Rich", description: "Profile", catchphrase: "Build", avatar: "/first.jpg" };
 const { rerender } = render(<Introduction data={data} />);
 expect(screen.getByRole("heading", { name: "Rich" })).toBeVisible();
 expect(screen.getByText("Profile")).toBeVisible(); expect(screen.getByText("Build")).toBeVisible();
 expect(screen.getByRole("img", { name: "Rich 的個人照片" })).toHaveAttribute("src", "/first.jpg");
 rerender(<Introduction data={{ name: "New", description: "Updated", catchphrase: "Verify", avatar: "/next.jpg" }} />);
 for (const text of ["New", "Updated", "Verify"]) expect(screen.getByText(text)).toBeVisible();
 for (const text of ["Rich", "Profile", "Build"]) expect(screen.queryByText(text)).not.toBeInTheDocument();
 expect(screen.getByRole("img")).toHaveAttribute("src", "/next.jpg");
});
