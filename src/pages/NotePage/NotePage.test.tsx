import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NotePage from "./NotePage";
import type { Note } from "../../types/note";

let mockNotes: Note[];
jest.mock("./notes", () => ({ get notes() { return mockNotes; } }));

function makeNotes(count: number): Note[] {
  return Array.from({ length: count }, (_, index) => ({
    title: `筆記 ${index + 1}`,
    categoryImage: "python",
    hashTags: ["#後端"],
    summary: "實作心得",
    link: `https://www.notion.so/${String(index + 1).padStart(32, "0")}`,
  }));
}

beforeEach(() => { mockNotes = []; });

test("NOTES-DATA-01: adding or removing a note updates the list in source order", () => {
  const [first, second] = makeNotes(2);
  mockNotes = [first];
  const { rerender } = render(<NotePage />);
  expect(screen.getByRole("link", { name: first.title })).toBeVisible();

  mockNotes = [first, second];
  rerender(<NotePage />);
  expect(screen.getAllByRole("link").map((link) => link.getAttribute("href")))
    .toEqual([first.link, second.link]);

  mockNotes = [second];
  rerender(<NotePage />);
  expect(screen.queryByRole("link", { name: first.title })).toBeNull();
  expect(screen.getByRole("link", { name: second.title })).toBeVisible();
});

test("NOTES-DATA-01: filtering keeps only matching cards when notes share a link", async () => {
  const user = userEvent.setup();
  const [first, second, third] = makeNotes(3);
  mockNotes = [first, { ...second, link: first.link }, third];
  render(<NotePage />);
  expect(screen.getByRole("link", { name: first.title })).toHaveAttribute("href", first.link);
  expect(screen.getByRole("link", { name: second.title })).toHaveAttribute("href", first.link);

  const search = screen.getByRole("searchbox");
  await user.type(search, "3");
  expect(screen.getAllByRole("link")).toHaveLength(1);
  expect(screen.getByRole("link", { name: third.title })).toBeVisible();
  await user.clear(search);
  expect(screen.getAllByRole("link")).toHaveLength(3);
});

test.each<[string, string[]]>([
  ["  GENERic  ", ["Generic types"]],
  ["ESTin", ["測試筆記"]],
  ["ypEscr", ["分類索引"]],
  ["   ", ["Generic types", "測試筆記", "分類索引"]],
  ["實作心得", []],
])("NOTES-SEARCH-01: query %j selects the matching notes", async (query, titles) => {
  const user = userEvent.setup();
  const [byTitle, byTag, byCategory] = makeNotes(3);
  mockNotes = [
    { ...byTitle, title: "Generic types" },
    { ...byTag, title: "測試筆記", hashTags: ["#範例", "#Testing"] },
    { ...byCategory, title: "分類索引", categoryImage: "typescript" },
  ];
  render(<NotePage />);
  const search = screen.getByRole("searchbox", { name: "搜尋筆記" });

  await user.type(search, query);
  expect(screen.queryAllByRole("heading", { level: 2 }).map((heading) => heading.textContent))
    .toEqual(titles);

  await user.clear(search);
  expect(screen.getAllByRole("link")).toHaveLength(3);
});

test("NOTES-EMPTY-01: an empty collection and an unmatched search have distinct messages", async () => {
  const user = userEvent.setup();
  const { rerender } = render(<NotePage />);
  expect(screen.getByRole("heading", { name: "學習筆記" })).toBeInTheDocument();
  expect(screen.getByText("目前尚無筆記。")).toBeVisible();
  expect(screen.queryByRole("link")).toBeNull();
  expect(screen.queryByRole("navigation")).toBeNull();

  mockNotes = makeNotes(1);
  rerender(<NotePage />);
  await user.type(screen.getByRole("searchbox"), "xyz");
  expect(screen.getByText("查無符合的筆記。")).toBeVisible();
  expect(screen.queryByText("目前尚無筆記。")).toBeNull();
  expect(screen.queryByRole("link")).toBeNull();
  expect(screen.queryByRole("navigation")).toBeNull();
});

test.each([[20, 1], [21, 2], [41, 3]])(
  "NOTES-PAGE-01: %i notes span %i pages in source order",
  async (count, totalPages) => {
    const user = userEvent.setup();
    mockNotes = makeNotes(count);
    render(<NotePage />);
    const previous = screen.getByRole("button", { name: "上一頁" });
    const next = screen.getByRole("button", { name: "下一頁" });
    expect(previous).toBeDisabled();
    for (let page = 1; page <= totalPages; page++) {
      expect(screen.getByText(`${page} / ${totalPages}`)).toBeVisible();
      const expectedNotes = mockNotes.slice((page - 1) * 20, page * 20);
      expect(screen.getAllByRole("link").map((link) => link.getAttribute("href")))
        .toEqual(expectedNotes.map((note) => note.link));
      if (page < totalPages) await user.click(next);
    }
    expect(next).toBeDisabled();
    if (totalPages > 1) {
      await user.click(previous);
      expect(screen.getByText(`${totalPages - 1} / ${totalPages}`)).toBeVisible();
      expect(screen.getByRole("link", { name: `筆記 ${20 * (totalPages - 2) + 1}` })).toBeVisible();
    }
  },
);

test("NOTES-PAGE-02: a new query returns to the filtered first page", async () => {
  const user = userEvent.setup();
  mockNotes = makeNotes(41).map((note, index) => ({
    ...note, categoryImage: index % 2 === 0 ? "agent" : "python",
  }));
  render(<NotePage />);
  await user.click(screen.getByRole("button", { name: "下一頁" }));
  expect(screen.getByText("2 / 3")).toBeVisible();

  await user.type(screen.getByRole("searchbox"), "agent");
  expect(screen.getByText("1 / 2")).toBeVisible();
  expect(screen.getAllByRole("link")).toHaveLength(20);
  expect(screen.getByRole("link", { name: "筆記 1" })).toBeVisible();
  expect(screen.queryByRole("link", { name: "筆記 2" })).toBeNull();
  expect(screen.getByRole("button", { name: "上一頁" })).toBeDisabled();
  await user.click(screen.getByRole("button", { name: "下一頁" }));
  expect(screen.getByRole("link", { name: "筆記 41" })).toBeVisible();
  expect(screen.getByRole("button", { name: "下一頁" })).toBeDisabled();
});
