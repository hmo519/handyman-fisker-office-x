import { useAppState } from "../context/AppState.jsx";
import StatCard from "../components/ui/StatCard";

function Dashboard() {
  const { dashboard, notifications, runAI, refresh } = useAppState();

  const data = dashboard.data;
  const forecast = dashboard.forecast;
  const ceoMessage = dashboard.ceoMessage;
  const ceoSummary = dashboard.ceoSummary;

  return (
    <section className="panel">
      <div className="pageHeader">
        <div>
          <h2>🏢 HF COMMAND CENTER</h2>
          <p className="empty">Aangestuurd door centrale AppState</p>
        </div>

        <div className="detailActions">
          <button onClick={refresh}>🔄 Vernieuwen</button>
          <button onClick={runAI}>🤖 Run AI</button>
        </div>
      </div>

      <div className="stats">
        <StatCard
          icon="💰"
          title="Omzet"
          value={`€${data.totalRevenue.toFixed(2)}`}
          subtitle={`Groei: €${forecast.growth.toFixed(2)}`}
        />

        <StatCard
          icon="👥"
          title="Klanten"
          value={data.customers.length}
          subtitle="CRM Database"
        />

        <StatCard
          icon="📂"
          title="Projecten"
          value={data.projects.length}
          subtitle={`${data.emptyProjects.length} zonder taken`}
        />

        <StatCard
          icon="🧾"
          title="Facturen"
          value={data.invoices.length}
          subtitle="Automatisch gekoppeld"
        />
      </div>

      <div className="crmLayout">
        <div className="customerList">
          <h3>🤖 AI CEO Bericht</h3>

          <div className="aiCustomerNote">
            <h4>{ceoMessage.title}</h4>
            <p>{ceoMessage.message}</p>
            <p>
              <strong>Prioriteit:</strong> {ceoMessage.priority}
            </p>
          </div>

          <h3>📅 Planning vandaag</h3>

          {data.todayPlanning.length === 0 ? (
            <p className="empty">Geen planning vandaag</p>
          ) : (
            data.todayPlanning.map((item) => (
              <div className="noteItem" key={item.id}>
                <strong>{item.time}</strong>
                <p>Project ID: {item.projectId}</p>
              </div>
            ))
          )}

          <h3>🔔 Laatste meldingen</h3>

          {notifications.length === 0 ? (
            <p className="empty">Geen meldingen</p>
          ) : (
            notifications.slice(0, 3).map((notification) => (
              <div className="noteItem" key={notification.id}>
                <strong>{notification.type}</strong>
                <p>{notification.message}</p>
              </div>
            ))
          )}
        </div>

        <div className="customerDetail">
          <h3>🧠 AI CEO Control Panel</h3>

          <div className="aiCustomerNote">
            <h4>📌 Bedrijfsgezondheid</h4>
            <p>{dashboard.businessHealth}</p>
          </div>

          <div className="aiCustomerNote">
            <h4>📋 CEO Samenvatting</h4>
            {ceoSummary.map((line, index) => (
              <p key={index}>• {line}</p>
            ))}
          </div>

          <div className="aiCustomerNote">
            <h4>⚡ Dagadvies</h4>
            {dashboard.dailyAdvice.map((item, index) => (
              <p key={index}>👉 {item}</p>
            ))}
          </div>

          <div className="aiCustomerNote">
            <h4>📈 Omzet voorspelling</h4>
            <p>Huidig: €{forecast.current.toFixed(2)}</p>
            <p>Voorzichtig: €{forecast.conservative.toFixed(2)}</p>
            <p>Groei: €{forecast.growth.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
