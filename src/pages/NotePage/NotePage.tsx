import { useState } from "react";
import Note from "../../components/Note/Note";
import { notes } from "./notes";
import "./NotePage.css";

const PAGE_SIZE = 20;

function NotePage() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const keyword = query.trim().toLowerCase();
  // 清單隨部署固定；保留原始位置以區分共用連結的筆記。
  const entries = Array.from(notes.entries());
  const matches = keyword
    ? entries.filter(([, note]) =>
        [note.title, note.categoryImage, ...note.hashTags].some((value) =>
          value.toLowerCase().includes(keyword),
        ),
      )
    : entries;
  const totalPages = Math.ceil(matches.length / PAGE_SIZE);
  const currentPage = Math.max(1, Math.min(page, totalPages));
  const offset = (currentPage - 1) * PAGE_SIZE;
  const visibleNotes = matches.slice(offset, offset + PAGE_SIZE);

  function handleSearch(value: string) {
    setQuery(value);
    setPage(1);
  }

  return (
    <main className="note-page">
      <h1 className="note-page__title">學習筆記</h1>
      <div className="note-page__toolbar">
        <input
          type="search"
          aria-label="搜尋筆記"
          placeholder="搜尋標題或標籤"
          value={query}
          onChange={(event) => handleSearch(event.target.value)}
        />
      </div>
      {visibleNotes.length > 0 ? (
        <>
          <ul className="note-page__grid" aria-label="筆記列表">
            {visibleNotes.map(([sourceIndex, note]) => (
              <li key={sourceIndex}>
                <Note note={note} />
              </li>
            ))}
          </ul>
          <nav className="note-page__pagination" aria-label="筆記分頁">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setPage(currentPage - 1)}
            >
              上一頁
            </button>
            <span aria-live="polite">{currentPage} / {totalPages}</span>
            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setPage(currentPage + 1)}
            >
              下一頁
            </button>
          </nav>
        </>
      ) : (
        <p className="note-page__empty" role="status">
          {notes.length === 0 ? "目前尚無筆記。" : "查無符合的筆記。"}
        </p>
      )}
    </main>
  );
}

export default NotePage;
