import "./style.css";

function ComplaintsCard({ complaints, reload }) {
  async function aceitar() {
    const requestOptions = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    try {
      fetch(
        `http://localhost:3001/complaints/approve/${complaints.id}`,
        requestOptions
      ).then((res) => {
        if (!res.ok) {
          alert("Houve algum problema, a denuncia não aprovada.");
        } else {
          alert("Denuncia aprovada com sucesso!");
          reload();
        }
      });
    } catch (error) {
      console.log(error);
      alert("Houve algum problema, a denuncia não foi criada.");
    }
  }

  async function negar() {
    const requestOptions = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    try {
      fetch(
        `http://localhost:3001/complaints/${complaints.id}`,
        requestOptions
      ).then((res) => {
        if (!res.ok) {
          alert("Houve algum problema, a denuncia não negada.");
        } else {
          alert("Denuncia negada com sucesso!");
          reload();
        }
      });
    } catch (error) {
      console.log(error);
      alert("Houve algum problema, a denuncia não foi criada.");
    }
  }

  return (
    <article>
      <section className="complaint justify" style={{ "text-align": "left" }}>
        <p>Mensagem da denuncia: {complaints.msg}</p>
        <p>Texto denunciado: {complaints.text}</p>
        <div className="actionsButtons justify">
          <div className="assignment">
            <button onClick={() => aceitar()}>
              <span>Aceitar</span>
            </button>
            <button onClick={() => negar()}>
              <span>Negar</span>
            </button>
          </div>
        </div>
      </section>
    </article>
  );
}

export default ComplaintsCard;
