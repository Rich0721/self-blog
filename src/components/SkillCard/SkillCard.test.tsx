import { render, screen } from "@testing-library/react";
import SkillCard from "./SkillCard";
test("SKILL-01: renders skill data", () => {
 const { container } = render(<SkillCard skill={{ name: "Backend", icon: "/backend.png", tag: ["FastAPI"], description: "APIs" }} />);
 expect(screen.getByRole("heading", { name: "Backend" })).toBeVisible();
 expect(container.querySelector("img")).toHaveAttribute("src", "/backend.png");
 expect(screen.getByText("APIs")).toBeVisible(); expect(screen.getByRole("listitem")).toHaveTextContent("FastAPI");
});
test.each([[], ["A"], ["A", "B"]])("SKILL-02/03: optional description and tags %j", (...tags) => {
 const { container } = render(<SkillCard skill={{ name: "Skill", icon: "/icon.png", tag: tags }} />);
 expect(screen.queryAllByRole("listitem")).toHaveLength(tags.length);
 tags.forEach(tag => expect(screen.getByText(tag)).toBeVisible());
 expect(container.querySelector("p")).toBeNull();
});
