import './style.css';
import { useState, useEffect } from 'react'
import NewsCard from './components/newsCard';
import Header from '../../shared/components/header/header';
import Pagination from '../../shared/components/pagination/pagination';

function News() {
  const [news, setNews] = useState([])
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [page, setpage] = useState(1);
  const [pages, setpages] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    async function load() {
      const res = await fetch(`http://localhost:3001/news?page=${page}&pageSize=${pageSize}`, { method: 'get' });
      const data = await res.json();
      setNews(data.news.rows);
      setpages(data.news.pages);
    }
    load();
  }, [page])

  function updateNews(newsUpdate, index) {
    const temp = [...news];
    temp[index] = newsUpdate;
    setNews(temp);
  }

  async function filter() {
    const res = await fetch(`http://localhost:3001/news?page=${page}&pageSize=${pageSize}&authorName=${name}&msg=${msg}`, { method: 'get' });
    const data = await res.json();
    setNews(data.news.rows);
    setpages(data.news.pages);
  }

  function updatePage(page) {
    setpage(page);
  }

  return (
    <>
      <section className='header'>
        <Header />
      </section>
      <section className='title'>
        <h1>Notícias verificadas</h1>
      </section>
      <section className='filter'>
        <h2>Notícias:</h2>
        <div>
          <input type="text" placeholder="Nome do autor" onChange={event => setName(event.target.value)}/>
          <input type="text" placeholder="Conteudo da noticia" onChange={event => setMsg(event.target.value)}/>
          <button onClick={() => filter()}>Buscar</button>
        </div>
      </section>
      <section className='news-container'>
        {news.map((n, index) => (
          <NewsCard key={n.id} news={n} index={index} updateNews={updateNews} />
        ))}
      </section>
      <section className='pagination'>
          <Pagination numberOfPages={pages} updatePage={updatePage}/>
      </section>
    </>

  );
}

export default News;
