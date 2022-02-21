import './style.css';
import Header from '../../shared/components/header/header';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function Profile() {

  const [title, setTitle] = useState('');
  const [msg, setMsg] = useState('');
  const [img, setImg] = useState('')
  const [user, setUser] = useState();
  let navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("../home", { replace: true });
    }
    setUser(user);
  }, [])

  function handleTitle(t){
    setTitle(t);
  }

  function handleMsg(m){
    setMsg(m);
  }

  function handleImg(i){
    setImg(i);
  }

  async function submit() {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: title, msg: msg, img: img, authorId: user.id })
    };
    try {
      await fetch('http://localhost:3001/news', requestOptions);
      setTitle("");
      setMsg("");
      setImg("");
    } catch (error){
      console.log(error);
    }
  }

  return (
    <>
      <section className='header'>
        <Header />
      </section>
      <article className='continer-profile'>
      <section className='user-data'>
        <h3>Informações</h3>
        <form className='flex'>
          <label>
            Nome:
            <span> {user? user.name : ""}</span>
          </label>
          <label>
            E-mail:
            <span> {user? user.email : ""}</span>
          </label>
        </form>
      </section>
      <section className='new-news'>
        <h3>Criar notícia</h3>
        <form className='flex'>
          <label className='flex justify'>
            Título:
            <input type="text" value={title} onChange={(e) => handleTitle(e.target.value)} />
          </label>
          <label className='flex justify'>
            Mensagem:
            <input type="text" value={msg} onChange={(e) => handleMsg(e.target.value)} />
          </label>
          <label className='flex justify'>
            Imagem:
            <input type="text" value={img} onChange={(e) => handleImg(e.target.value)} />
          </label>
        </form>
        <button className='submit' onClick={()=>submit()}>
          <span>criar</span>
        </button>
      </section>
      </article>
    </>

  );
}

export default Profile;
