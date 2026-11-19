import { useEffect, useState } from "react";
import HomePage from "./pages/HomePage/HomePage";
import NotePage from "./pages/NotePage/NotePage";
import SiteHeader from "./components/SiteHeader/SiteHeader";
import "./App.css";

type Page = "home" | "notes";

function getPageFromPath(pathname: string): Page {
  return pathname === "/notes" ? "notes" : "home";
}

function App() {
  const [page, setPage] = useState<Page>(() =>
    getPageFromPath(window.location.pathname),
  );

  useEffect(() => {
    const handlePopState = () => setPage(getPageFromPath(window.location.pathname));
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigateTo = (nextPage: Page) => {
    const nextPath = nextPage === "notes" ? "/notes" : "/";
    if (window.location.pathname !== nextPath) {
      window.history.pushState({}, "", nextPath);
    }
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <SiteHeader currentPage={page} onNavigate={navigateTo} />
      {page === "notes" ? <NotePage /> : <HomePage />}
    </>
  );
}

export default App;
