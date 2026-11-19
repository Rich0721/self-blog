import githubIcon from "../../asserts/icons/github.png";
import "./SiteHeader.css";

type Page = "home" | "notes";

interface SiteHeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

function SiteHeader({ currentPage, onNavigate }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <a
        className="site-header__brand"
        href="/"
        onClick={(event) => {
          event.preventDefault();
          onNavigate("home");
        }}
      >
        Rich&apos;s Blog
      </a>
      <nav className="site-header__nav" aria-label="主要導覽">
        {currentPage === "home" ? (
          <span className="site-header__current" aria-current="page">
            關於我
          </span>
        ) : (
          <a
            href="/"
            onClick={(event) => {
              event.preventDefault();
              onNavigate("home");
            }}
          >
            關於我
          </a>
        )}
        {currentPage === "notes" ? (
          <span className="site-header__current" aria-current="page">
            學習筆記
          </span>
        ) : (
          <a
            href="/notes"
            onClick={(event) => {
              event.preventDefault();
              onNavigate("notes");
            }}
          >
            學習筆記
          </a>
        )}
        <a
          className="site-header__github"
          href="https://github.com/Rich0721"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="在新分頁開啟 GitHub 個人頁面"
        >
          <img src={githubIcon} alt="" />
          <span>GitHub</span>
        </a>
      </nav>
    </header>
  );
}

export default SiteHeader;
