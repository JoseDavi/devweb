import "./style.css";
import { useState, useEffect, useContext } from "react";
import NewsCard from "./components/newsCard";
import Pagination from "../../shared/components/pagination/pagination";
import { LanguageContext } from "../../shared/utils/contexts/LanguageContext";

function News() {
  const [news, setNews] = useState([]);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [page, setpage] = useState(1);
  const [pages, setpages] = useState(1);
  const pageSize = 10;

  let languageContext = useContext(LanguageContext);

  useEffect(() => {
    async function load() {
      const res = await fetch(
        `http://localhost:3001/news?page=${page}&pageSize=${pageSize}`,
        { method: "get" }
      );
      const data = await res.json();
      setNews(data.news.rows);
      setpages(data.news.pages);
    }
    load();
  }, [page]);

  function updateNews(newsUpdate, index) {
    const temp = [...news];
    temp[index] = newsUpdate;
    setNews(temp);
  }

  async function filter() {
    const res = await fetch(
      `http://localhost:3001/news?authorName=${name}&msg=${msg}`,
      { method: "get" }
    );
    const data = await res.json();
    setNews(data.news);
  }

  function updatePage(page) {
    setpage(page);
  }

  return (
    <>
      <section className="title">
        {languageContext.language === "pt" ? (
          <h1>Notícias verificadas</h1>
        ) : (
          <h1>Verified news</h1>
        )}
      </section>
      <section className="filter">
        {languageContext.language === "pt" ? (
          <h2>Notícias:</h2>
        ) : (
          <h2>News:</h2>
        )}
        <div>
          <input
            type="text"
            placeholder={
              languageContext.language === "pt"
                ? "Nome do autor"
                : "Author name"
            }
            onChange={(event) => setName(event.target.value)}
          />
          <input
            type="text"
            placeholder={
              languageContext.language === "pt"
                ? "Conteudo da noticia"
                : "Content of news"
            }
            onChange={(event) => setMsg(event.target.value)}
          />
          <button onClick={() => filter()}>
            {languageContext.language === "pt" ? "Buscar" : "Search"}
          </button>
        </div>
      </section>
      <section className="news-container">
        {news.map((n, index) => (
          <NewsCard key={n.id} news={n} index={index} updateNews={updateNews} />
        ))}
      </section>
      <section className="pagination">
        <Pagination numberOfPages={pages} updatePage={updatePage} />
      </section>
    </>
  );
}

export default News;
