import { render, screen, within } from "@testing-library/react";
import HomePage from "./HomePage";
test("HOME-01: renders profile and five required skills", () => {
 render(<HomePage />); expect(screen.getByRole("heading", { name: "Hi, I'm Rich" })).toBeVisible(); expect(screen.getByText("Build. Verify. Improve.")).toBeVisible();
 const expected = [["後端開發", "FastAPI", "Spring Boot"], ["前端開發", "React", "Vue3", "TypeScript"], ["資料庫管理", "PostgreSQL"], ["容器化與部署", "Docker"], ["AI Multi-Agent 協同開發", "Agents", "MCP", "Skill", "Instructions"]];
 expect(screen.getAllByRole("article")).toHaveLength(5);
 expected.forEach(([name, ...tags]) => {
 const card = screen.getByRole("heading", { name }).closest("article")!;
 tags.forEach(tag => expect(within(card).getByText(tag)).toBeVisible());
 expect(card.querySelector("p")).not.toBeEmptyDOMElement();
 });
});
