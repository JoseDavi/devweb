import './style.css';

function Header() {

  function logout() {
    localStorage.setItem("userId", null);
    localStorage.setItem("token", null);
  }

  return (
    <>
      <section className='header'>
        <span>José Davi</span>
        <img src="https://avatars.githubusercontent.com/u/40031432?v=4" alt="userImage" />
        <button onClick={() => logout()}>sair</button>
      </section>
    </>

  );
}

export default Header;
