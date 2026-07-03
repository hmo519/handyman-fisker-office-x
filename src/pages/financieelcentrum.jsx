import Card from "../components/ui/Card";

function FinancieelCentrum() {
  return (
    <section className="panel">
      <div className="pageHeader">
        <div>
          <h2>💰 Financieel Centrum</h2>
          <p className="empty">
            Overzicht van omzet, winst, BTW en cashflow.
          </p>
        </div>
      </div>

      <Card
        title="Welkom"
        subtitle="De financiële cockpit van HF Office X"
      >
        <h3>🚧 In aanbouw</h3>

        <p>
          Hier bouwen we het complete financiële systeem van
          Handyman Fisker Office X.
        </p>

        <ul>
          <li>💰 Omzet Dashboard</li>
          <li>🧾 BTW Centrum</li>
          <li>💳 Uitgaven</li>
          <li>📈 Cashflow</li>
          <li>📊 Winst & Verlies</li>
          <li>🤖 AI Financieel Adviseur</li>
        </ul>
      </Card>
    </section>
  );
}

export default FinancieelCentrum;
