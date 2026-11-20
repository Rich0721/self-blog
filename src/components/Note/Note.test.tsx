import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Note from "./Note";
import type { Note as NoteData } from "../../types/note";

const note: NoteData = {
  categoryImage: "typescript",
  title: "泛型入門",
  hashTags: ["#泛型", "#型別"],
  summary: "以泛型描述資料集合。",
  link: "https://www.notion.so/11111111111111111111111111111111",
};

test("NOTE-CARD-01: the whole card is a keyboard-accessible link to its note", async () => {
  const user = userEvent.setup();
  render(<Note note={note} />);

  const link = screen.getByRole("link", { name: note.title });
  expect(screen.getAllByRole("link")).toHaveLength(1);
  expect(link).toHaveAttribute("href", note.link);
  expect(link).toHaveAttribute("target", "_blank");
  expect(link).toHaveAttribute("rel", expect.stringMatching(/\bnoopener\b/));
  expect(link).toHaveAttribute("rel", expect.stringMatching(/\bnoreferrer\b/));
  const card = within(link);
  expect(card.getByRole("img", { name: note.categoryImage })).toBeVisible();
  expect(card.getByRole("heading", { name: note.title })).toBeVisible();
  expect(link).toHaveTextContent("#泛型 #型別");
  expect(card.getByText(note.summary)).toBeVisible();
  await user.tab();
  expect(link).toHaveFocus();
});

test.each([
  ["typescript", "typescript.png"],
  ["python", "python.png"],
  ["agent", "software-agent.png"],
])("NOTE-CARD-01: %s uses the %s asset", (categoryImage, filename) => {
  render(<Note note={{ ...note, categoryImage }} />);

  const image = screen.getByRole("img", { name: categoryImage });
  expect(image.getAttribute("src")?.split(/[\\/]/).pop()).toBe(filename);
});

test("NOTE-CARD-01: an unknown category preserves the note without a broken image", () => {
  render(<Note note={{ ...note, categoryImage: "unknown" }} />);

  const link = screen.getByRole("link", { name: note.title });
  expect(link.querySelector("img")).toBeNull();
  expect(within(link).getByText(note.summary)).toBeVisible();
  expect(link).toHaveAttribute("href", note.link);
});
