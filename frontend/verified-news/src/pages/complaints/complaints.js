import "./style.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ComplaintsCard from "./components/complaintsCard/complaintsCard";

function Complaints() {
  const [complaints, setComplaints] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const res = await fetch(`http://localhost:3001/complaints`, {
      method: "get",
    });
    const data = await res.json();
    setComplaints(data.complaints);
  }
  return (
    <>
      <article>
        <section className="complaint">
          <h2>Denuncias</h2>
          <section className="news-container">
            {complaints.map((c) => (
              <ComplaintsCard key={c.id} complaints={c} reload={load} />
            ))}
          </section>
          <div className="actionsButtons justify">
            <button
              className="back"
              onClick={() => navigate("../news", { replace: true })}
            >
              <span>news</span>
            </button>
          </div>
        </section>
      </article>
    </>
  );
}

export default Complaints;
