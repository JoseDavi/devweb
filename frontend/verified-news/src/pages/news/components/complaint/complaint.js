import "./style.css";
import { useState, useEffect } from "react";

function Complaint({ news, text, closeModal }) {
  const [msg, setMsg] = useState("");

  useEffect(() => {}, []);

  async function submit() {
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newsId: news.id,
        msg: msg,
        text: text,
        authorId: news.authorId,
      }),
    };
    try {
      fetch("http://localhost:3001/complaints", requestOptions).then((res) => {
        if (!res.ok) {
          alert("Houve algum problema, a denuncia não foi criada.");
        } else {
          alert("Denuncia criada com sucesso!");
          closeModal();
        }
      });
      setMsg("");
    } catch (error) {
      console.log(error);
      alert("Houve algum problema, a denuncia não foi criada.");
    }
  }

  return (
    <>
      <article className="continer-complaint">
        <section className="complaint">
          <h3>Denunciar Notícia</h3>

          <form className="flex">
            <label className="flex justify">
              Título:
              <span>{news.title}</span>
            </label>
            <label className="flex justify">
              Texto:
              <span>{text}</span>
            </label>
            <label className="flex justify">
              Mensagem:
              <input
                type="text"
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
              />
            </label>
          </form>
          <div className="actionsButtons">
            <button className="back" onClick={() => closeModal()}>
              <span>Cancelar</span>
            </button>
            <button className="submit" onClick={() => submit()}>
              <span>Denunciar</span>
            </button>
          </div>
        </section>
      </article>
    </>
  );
}

export default Complaint;
