import './style.css';
import { useState } from 'react'
import { useNavigate } from "react-router-dom";

function Login() {

  let navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  
  function handleEmail(e) {
    setEmail(e);
  }

  function handleSenha(p) {
    setPassword(p);
  }

  async function login() {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email, password: password })
    };
    try {
      const res = await fetch('http://localhost:3001/auth/', requestOptions);
      const data = await res.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("../news", { replace: true });
      window.location.reload(false);
    } catch (error){
      console.log("Error: ", error)
    }
    
  }
  return (
    <>
    <section className='content'>
    <form className='flex'>
        <label className='flex'>
          E-mail:
          <input type="text" value={email} onChange={(e) => handleEmail(e.target.value)} />
        </label>
        <label className='flex'>
          Senha:
          <input type="password" value={password} onChange={(e) => handleSenha(e.target.value)} />
        </label>
      </form>
      <button className='submit' onClick={() => login()}>
        <span>Entrar</span>
      </button>
    </section>
    </>
  );
}

export default Login;
