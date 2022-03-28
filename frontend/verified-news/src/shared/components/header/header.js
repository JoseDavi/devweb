import "./style.css";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "../../utils/contexts/LanguageContext";

function Header() {
  const [user, setUser] = useState();
  let navigate = useNavigate();
  let languageContext = useContext(LanguageContext);

  useEffect(() => {
    let user = undefined;
    if (localStorage.getItem("user")) {
      user = JSON.parse(localStorage.getItem("user"));
    }
    setUser(user);
  }, []);

  function logout() {
    localStorage.clear();
    setUser(null);
    navigate("../news", { replace: true });
  }

  return (
    <>
      <section className="switch-language">
        <span>
          {languageContext.language === "pt" ? "Idioma: " : "Language: "}
        </span>
        <select
          value={languageContext.language}
          onChange={(e) => {
            languageContext.setLanguage(e.target.value);
          }}
        >
          <option value="pt">pt-br</option>
          <option value="en">en</option>
        </select>
      </section>
      <section className="header">
        <span className="margin">{user ? user.name : ""}</span>
        <button
          className="profileButton margin"
          onClick={() => navigate("../profile", { replace: true })}
        >
          <img
            src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
            alt="userImage"
          />
        </button>
        <button className="margin" onClick={() => logout()}>
          sair
        </button>
      </section>
    </>
  );
}

export default Header;
