import { render, screen } from "@testing-library/react";
import SkillList from "./SkillList";
test.each([0, 1, 5, 6])("LIST-01: renders %i skills and removes old cards", count => {
 const skills = Array.from({ length: count }, (_, i) => ({ name: `Skill ${i}`, icon: "/icon.png", tag: [] }));
 const { rerender } = render(<SkillList skills={skills} />);
 expect(screen.queryAllByRole("article")).toHaveLength(count);
 skills.forEach(skill => expect(screen.getByRole("heading", { name: skill.name })).toBeVisible());
 rerender(<SkillList skills={[]} />); expect(screen.queryAllByRole("article")).toHaveLength(0);
});
