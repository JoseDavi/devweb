import './style.css';
import { useState } from 'react'

function Pagination({numberOfPages, updatePage}) {
  const [page, setPage] = useState(1);

  function decrease() {
    if (page-1 >= 1) {
      setPage(page-1)
      updatePage(page-1)
   }
  }

  function increase() {
    if (page+1 <= numberOfPages) {
      setPage(page+1)
      updatePage(page+1)
   }
  }

  return (
    <>
      <article>
        <section className='buttons'>
          <button id='left' onClick={() => decrease()}>
            <span>left</span>
          </button>
          <span>Pagina: {page}</span>
          <button id='right' onClick={() => increase()}>
            <span>Rigth</span>
          </button>
        </section>
      </article>
    </>

  );
}

export default Pagination;