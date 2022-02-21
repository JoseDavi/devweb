import './style.css';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function Header() {

  const [user, setUser] = useState();
  let navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, [])

  function logout() {
    localStorage.clear();
    setUser(null)
  }

  return (
    <>
      <section className='header'>
        <span className='margin'>{user? user.name : ""}</span>
        <button className='profileButton margin' onClick={() => navigate("../profile", { replace: true })}>
          <img src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg" alt="userImage" />
        </button>
        <button className='margin' onClick={() => logout()}>sair</button>
      </section>
    </>

  );
}

export default Header;
