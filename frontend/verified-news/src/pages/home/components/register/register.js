import './style.css';
import { useState } from 'react'
import { useNavigate } from "react-router-dom";

function Register() {

  let navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  
  function handleName(n) {
    setName(n);
  }

  function handleEmail(e) {
    setEmail(e);
  }

  function handleSenha(p) {
    setPassword(p);
  }

  async function register(){
    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: name, email: email, password: password, reporter: true })
    };
    try {
      const res = await fetch('http://localhost:3001/users', requestOptions);
      const data = await res.json();
      localStorage.setItem("userId", data.user.id);
      localStorage.setItem("token", data.token);
      navigate("../news", { replace: true });
    } catch {
      console.log("error")
    }
  }

  return (
    <>
    <section className='content'>
      <form className='flex'>
        <label className='flex'>
          Name:
          <input type="text" value={name} onChange={(e) => handleName(e.target.value)} />
        </label>
        <label className='flex'>
          E-mail:
          <input type="text" value={email} onChange={(e) => handleEmail(e.target.value)} />
        </label>
        <label className='flex'>
          Senha:
          <input type="password" value={password} onChange={(e) => handleSenha(e.target.value)} />
        </label>
      </form>
      <button className='submit' onClick={()=>register()}>
        <span>Register</span>
      </button>
    </section>
    </>
  );
}

export default Register;
