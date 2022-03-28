import "./style.css";
import { useState, useEffect } from "react";
import Profile from "../../../profile/profile";
import Complaint from "../complaint/complaint";

function NewsCard({ news, index, updateNews }) {
  const [user, setUser] = useState();
  const [edit, setEdit] = useState(false);
  const [complaint, setComplaint] = useState(false);
  const [text, setText] = useState();

  useEffect(() => {
    let user = undefined;
    if (localStorage.getItem("user")) {
      user = JSON.parse(localStorage.getItem("user"));
      setUser(user);
    }
  }, []);

  async function opinion(type) {
    if (type === "dislike" || type === "like") {
      const res = await fetch(`http://localhost:3001/news/${news.id}/${type}`, {
        method: "PATCH",
      });
      const data = await res.json();
      updateNews(data.news, index);
    } else return;
  }
  function editedNews(data) {
    if (data === news) {
      setEdit(false);
    } else {
      updateNews(data.news, index);
      setEdit(false);
    }
  }
  function closeModal() {
    setComplaint(false);
  }

  return (
    <article>
      <section className="image">
        <img width="100%" src={news.img} alt="News" />
      </section>
      <section className="news">
        <h3>{news.title}</h3>
        <p>{news.msg}</p>
        <span>Autor: {news.author.name}</span>
        <div className="actionsButtons">
          <div className="assignment">
            <button id="like" onClick={() => opinion("like")}>
              <img
                alt="like"
                src="https://www.clipartmax.com/png/full/19-190478_your-guide-to-microsoft-office-facebook-like-png.png"
                width="20px"
                height="20px"
              />
              <span>{news.like}</span>
            </button>
            <button id="dislike" onClick={() => opinion("dislike")}>
              <img
                alt="dislike"
                src="https://www.clipartmax.com/png/full/119-1198454_the-right-to-freedom-of-expression-on-facebook-dislike-facebook-png.png"
                width="20px"
                height="20px"
              />
              <span>{news.dislike}</span>
            </button>
          </div>
          <div>
            {(user ? user.id === news.authorId : false) ? (
              <button onClick={() => setEdit(true)}>Editar</button>
            ) : null}
            <button
              id="complaint"
              onClick={() => {
                setComplaint(true);
                setText(news.msg);
              }}
            >
              Denunciar
            </button>
          </div>
        </div>
        {edit ? <Profile news={news} editedNews={editedNews} /> : null}
        {complaint ? (
          <Complaint news={news} text={text} closeModal={closeModal} />
        ) : null}
      </section>
    </article>
  );
}

export default NewsCard;
