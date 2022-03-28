import "./style.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Profile({ news, editedNews }) {
  const [title, setTitle] = useState("");
  const [msg, setMsg] = useState("");
  const [img, setImg] = useState("");
  const [user, setUser] = useState();
  let navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("../home", { replace: true });
    }
    setUser(user);
  }, []);

  function handleTitle(t) {
    setTitle(t);
  }

  function handleMsg(m) {
    setMsg(m);
  }

  function handleImg(i) {
    setImg(i);
  }

  async function submit() {
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        msg: msg,
        img: img,
        authorId: user.id,
      }),
    };
    try {
      fetch("http://localhost:3001/news", requestOptions).then((res) => {
        if (!res.ok) {
          alert("Houve algum problema, a notícia não foi criada.");
        } else {
          alert("Notícia criada com sucesso!");
        }
      });
      setTitle("");
      setMsg("");
      setImg("");
    } catch (error) {
      console.log(error);
      alert("Houve algum problema, a notícia não foi criada.");
    }
  }

  function editClicked() {
    let where = {};

    if (title) {
      where = { ...where, title: title };
    }
    if (msg) {
      where = { ...where, msg: msg };
    }
    if (img) {
      where = { ...where, img: img };
    }
    const requestOptions = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(where),
    };

    try {
      fetch(`http://localhost:3001/news/${news.id}`, requestOptions).then(
        (res) => {
          if (!res.ok) {
            alert(
              "Houve algum problema, a notícia não foi Atualizada, Verifique os dados."
            );
          } else {
            res.json().then((data) => {
              alert("Notícia atualizada com sucesso!");
              editedNews(data);
            });
          }
        }
      );
      setTitle("");
      setMsg("");
      setImg("");
    } catch (error) {
      console.log(error);
      alert("Houve algum problema, a notícia não foi Atualizada.");
    }
  }

  return (
    <>
      <article className="continer-profile">
        {!news ? (
          <section className="user-data">
            <h3>Informações</h3>
            <form className="flex">
              <label>
                Nome:
                <span> {user ? user.name : ""}</span>
              </label>
              <label>
                E-mail:
                <span> {user ? user.email : ""}</span>
              </label>
            </form>
            {/* Para simplificação estou assumindo que qualquer usuario logado é um admin e pode acessar as denuncias */}
            <button
              className="back"
              onClick={() => navigate("../complaints", { replace: true })}
            >
              <span>Denuncias</span>
            </button>
          </section>
        ) : null}
        <section className="new-news">
          {news ? <h3>Atualizar Notícia</h3> : <h3>Criar notícia</h3>}

          <form className="flex">
            <label className="flex justify">
              Título:
              <input
                type="text"
                value={title}
                onChange={(e) => handleTitle(e.target.value)}
              />
            </label>
            <label className="flex justify">
              Mensagem:
              <input
                type="text"
                value={msg}
                onChange={(e) => handleMsg(e.target.value)}
              />
            </label>
            <label className="flex justify">
              Imagem:
              <input
                type="text"
                value={img}
                onChange={(e) => handleImg(e.target.value)}
              />
            </label>
          </form>
          <div className="actionsButtons justify">
            {news ? (
              <>
                <button onClick={() => editedNews(news)}>
                  <span>Cancelar</span>
                </button>
                <button onClick={() => editClicked()}>
                  <span>Atualizar</span>
                </button>
              </>
            ) : (
              <>
                <button
                  className="back"
                  onClick={() => navigate("../news", { replace: true })}
                >
                  <span>news</span>
                </button>
                <button className="submit" onClick={() => submit()}>
                  <span>criar</span>
                </button>
              </>
            )}
          </div>
        </section>
      </article>
    </>
  );
}

export default Profile;
