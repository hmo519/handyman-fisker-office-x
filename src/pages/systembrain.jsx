import {
  getBusinessData,
  getBusinessHealth,
  getMainDecision,
  getRevenueForecast,
} from "../services/aiCore";

function SystemBrain() {
  const data = getBusinessData();
  const forecast = getRevenueForecast();

  return (
    <section className="panel">
      <div className="pageHeader">
        <h2>🧠 System Brain</h2>
        <p className="empty">Centrale AI analyse van HF Office X</p>
      </div>

      <div className="crmLayout">
        <div className="customerList">
          <h3>📊 Systeemdata</h3>

          <div className="noteItem">👤 Klanten: {data.customers.length}</div>
          <div className="noteItem">📂 Projecten: {data.projects.length}</div>
          <div className="noteItem">🧾 Facturen: {data.invoices.length}</div>
          <div className="noteItem">📅 Planning: {data.planning.length}</div>
          <div className="noteItem">💰 Omzet: €{data.totalRevenue.toFixed(2)}</div>
        </div>

        <div className="customerDetail">
          <h3>🤖 Centrale AI</h3>

          <div className="aiCustomerNote">
            <h4>🧠 Business Health</h4>
            <p>{getBusinessHealth()}</p>
          </div>

          <div className="aiCustomerNote">
            <h4>🎯 Volgende beste actie</h4>
            <p>{getMainDecision()}</p>
          </div>

          <div className="aiCustomerNote">
            <h4>📈 Omzet verwachting</h4>
            <p>Huidig: €{forecast.current.toFixed(2)}</p>
            <p>Voorzichtig: €{forecast.conservative.toFixed(2)}</p>
            <p>Groei: €{forecast.growth.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SystemBrain;
