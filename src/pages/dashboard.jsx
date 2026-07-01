import dashboardData from "../data/dashboardData";

function Dashboard() {
  return (
    <div className="smart-dashboard">
      <section className="stats">
        <div className="stat blue">
          <span>📅 Klussen vandaag</span>
          <h2>{dashboardData.jobsToday}</h2>
          <p>Volgende klus om {dashboardData.today[0].time}</p>
        </div>

        <div className="stat green">
          <span>👥 Klanten</span>
          <h2>{dashboardData.customers}</h2>
          <p>2 nieuwe deze week</p>
        </div>

        <div className="stat orange">
          <span>📋 Offertes</span>
          <h2>{dashboardData.quotesOpen}</h2>
          <p>Openstaand</p>
        </div>

        <div className="stat purple">
          <span>🧾 Facturen</span>
          <h2>{dashboardData.invoicesOpen}</h2>
          <p>Openstaand</p>
        </div>
      </section>

      <section className="grid">
        <div className="panel">
          <h3>📅 Agenda vandaag</h3>

          {dashboardData.today.map((job) => (
            <div className="listItem" key={job.time}>
              <strong>{job.time} - {job.title}</strong>
              <span>{job.customer}</span>
            </div>
          ))}
        </div>

        <div className="panel">
          <h3>⚠️ Prioriteiten</h3>

          {dashboardData.alerts.map((alert) => (
            <div className="listItem" key={alert.title}>
              <strong>{alert.title}</strong>
              <span>{alert.description}</span>
            </div>
          ))}
        </div>

        <div className="panel ai">
          <h3>🤖 HF AI Assistent</h3>
          <p>
            Goedemorgen Christian. Vandaag heb je {dashboardData.jobsToday} klussen.
            Neem kit, pvc-lijm en een 32 mm bocht mee voor de eerste afspraak.
          </p>
          <button>Maak dagplanning</button>
        </div>

        <div className="panel money">
          <h3>💰 Omzet deze maand</h3>
          <h2>€ {dashboardData.revenue}</h2>
          <p>Doel deze maand: € 5.000</p>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
