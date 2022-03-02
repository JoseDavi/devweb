import './style.css';
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import Login from './components/login/login';
import Register from './components/register/register';

function Home() {
  const [option, setOption] = useState(true);
  let navigate = useNavigate();

  function changeComponent() {
    setOption(!option);
  };

  function redirectToNews() {
    navigate("../news", { replace: true });
  }

  return (
    <main className='main-container'>
      <article className='container'>
        <section className='component'>
          {option? <Login /> : <Register />}
        </section>
        <section className='buttons-container'>
          <button  onClick={() => redirectToNews()}>
            <span>News</span>
          </button>
          <div className='buttons-switch'>
          <button className='login' disabled={option} onClick={() => changeComponent()}>
            <span>Login</span>
          </button>
          <button disabled={!option} onClick={() => changeComponent()}>
            <span>Cadastro</span>
          </button>
          </div>
        </section>
      </article>
    </main>
  );
}

export default Home;
