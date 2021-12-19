import './style.css';
import { useState, useEffect } from 'react'
import NewsCard from './components/newsCard';
import Header from '../../shared/components/header/header';

function News() {
  const [news, setNews] = useState([])
  useEffect(() => {
    async function load() {
      const res = await fetch("http://localhost:3001/news/", { method: 'get' });
      const data = await res.json();
      setNews(data.news);
    }
    load();
  }, [])

  function updateNews(newsUpdate, index) {
    const temp = [...news];
    temp[index] = newsUpdate;
    setNews(temp);
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
          <input type="text" placeholder="EX: Autor ou notícia" />
          <button>Buscar</button>
        </div>
      </section>
      <section className='news-container'>
        {news.map((n, index) => (
          <NewsCard key={n.id} news={n} index={index} updateNews={updateNews} />
        ))}
      </section>
    </>

  );
}

export default News;
