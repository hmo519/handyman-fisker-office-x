function Dashboard() {
  return (
    <div className="smart-dashboard">
      <section className="stats">
        <div className="stat blue">
          <span>📅 Klussen vandaag</span>
          <h2>2</h2>
          <p>Volgende om 09:00</p>
        </div>

        <div className="stat green">
          <span>👥 Klanten</span>
          <h2>4</h2>
          <p>2 nieuwe deze week</p>
        </div>

        <div className="stat orange">
          <span>📋 Offertes</span>
          <h2>3</h2>
          <p>Openstaand</p>
        </div>

        <div className="stat purple">
          <span>🧾 Facturen</span>
          <h2>1</h2>
          <p>Te laat betaald</p>
        </div>
      </section>

      <section className="grid">
        <div className="panel">
          <h3>📅 Agenda vandaag</h3>
          <p className="empty">09:00 - Badkamer lekkage bij Fam. Jansen</p>
          <p className="empty">13:30 - Schutting plaatsen bij De Vries</p>
        </div>

        <div className="panel">
          <h3>⚠️ Prioriteiten</h3>
          <p className="empty">Offerte badkamer renovatie nog niet verstuurd</p>
          <p className="empty">Factuur €420 staat 14 dagen open</p>
        </div>

        <div className="panel ai">
          <h3>🤖 HF AI Assistent</h3>
          <p>
            Goedemorgen Christian. Vandaag heb je 2 klussen. Neem kit,
            pvc-lijm en een 32 mm bocht mee voor de eerste afspraak.
          </p>
          <button>Maak dagplanning</button>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
