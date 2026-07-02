import {
  getBusinessData,
  getBusinessHealth,
  getDailyAdvice,
  getMainDecision,
  getRevenueForecast,
} from "../services/aiCore";

function AiAssistant() {
  const data = getBusinessData();
  const forecast = getRevenueForecast();

  return (
    <section className="panel">
      <div className="pageHeader">
        <h2>🤖 HF AI Assistent</h2>
        <p className="empty">Aangestuurd door centrale AI Core</p>
      </div>

      <div className="crmLayout">
        <div className="customerList">
          <h3>📊 AI Data</h3>

          <div className="noteItem">👤 Klanten: {data.customers.length}</div>
          <div className="noteItem">📂 Projecten: {data.projects.length}</div>
          <div className="noteItem">🧾 Facturen: {data.invoices.length}</div>
          <div className="noteItem">📅 Vandaag: {data.todayPlanning.length}</div>
          <div className="noteItem">💰 Omzet: €{data.totalRevenue.toFixed(2)}</div>
        </div>

        <div className="customerDetail">
          <h3>🧠 AI Core Analyse</h3>

          <div className="aiCustomerNote">
            <h4>📌 Business Health</h4>
            <p>{getBusinessHealth()}</p>
          </div>

          <div className="aiCustomerNote">
            <h4>🎯 Hoofdbeslissing</h4>
            <p>{getMainDecision()}</p>
          </div>

          <div className="aiCustomerNote">
            <h4>⚡ Dagadvies</h4>
            {getDailyAdvice().map((item, index) => (
              <p key={index}>👉 {item}</p>
            ))}
          </div>

          <div className="aiCustomerNote">
            <h4>📈 Omzet voorspelling</h4>
            <p>Nu: €{forecast.current.toFixed(2)}</p>
            <p>Voorzichtig: €{forecast.conservative.toFixed(2)}</p>
            <p>Groei: €{forecast.growth.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AiAssistant;
