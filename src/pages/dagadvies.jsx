import {
  getBusinessData,
  getBusinessHealth,
  getDailyAdvice,
  getMainDecision,
  getRevenueForecast,
} from "../services/aiCore";

function DagAdvies() {
  const data = getBusinessData();
  const forecast = getRevenueForecast();

  return (
    <section className="panel">
      <div className="pageHeader">
        <h2>📊 Dag Advies</h2>
        <p className="empty">Dagelijkse bedrijfsfocus vanuit AI Core</p>
      </div>

      <div className="crmLayout">
        <div className="customerList">
          <h3>📅 Vandaag</h3>

          <div className="noteItem">📅 Afspraken: {data.todayPlanning.length}</div>
          <div className="noteItem">📂 Projecten: {data.projects.length}</div>
          <div className="noteItem">📂 Projecten zonder taken: {data.emptyProjects.length}</div>
          <div className="noteItem">💰 Omzet: €{data.totalRevenue.toFixed(2)}</div>
        </div>

        <div className="customerDetail">
          <h3>🧠 AI Dagadvies</h3>

          <div className="aiCustomerNote">
            <h4>🎯 Focus vandaag</h4>
            <p>{getMainDecision()}</p>
          </div>

          <div className="aiCustomerNote">
            <h4>⚡ Actiepunten</h4>
            {getDailyAdvice().map((item, index) => (
              <p key={index}>👉 {item}</p>
            ))}
          </div>

          <div className="aiCustomerNote">
            <h4>📌 Business Health</h4>
            <p>{getBusinessHealth()}</p>
          </div>

          <div className="aiCustomerNote">
            <h4>📈 Verwachting</h4>
            <p>Voorzichtig: €{forecast.conservative.toFixed(2)}</p>
            <p>Groei: €{forecast.growth.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DagAdvies;