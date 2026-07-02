import { useAppState } from "../context/AppState";
import AICeoWidget from "../components/dashboard/AICeoWidget";
import KPIGrid from "../components/dashboard/KPIGrid";
import BusinessHealthWidget from "../components/dashboard/BusinessHealthWidget";
import QuickActionsWidget from "../components/dashboard/QuickActionsWidget";
import RevenueChartWidget from "../components/dashboard/RevenueChartWidget";

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
          <h2>🏢 HF COMMAND CENTER 3.0</h2>
          <p className="empty">Professionele AI cockpit voor je bedrijf</p>
        </div>
      </div>

      <AICeoWidget
        title={ceoMessage.title}
        message={ceoMessage.message}
        priority={ceoMessage.priority}
        onRefresh={refresh}
        onRunAI={runAI}
      />

      <KPIGrid data={data} forecast={forecast} />

      <div className="crmLayout">
        <div className="customerList">
          <BusinessHealthWidget
            health={dashboard.businessHealth}
            data={data}
          />

          <QuickActionsWidget />

          <h3>📅 Planning vandaag</h3>

          {data.todayPlanning.length === 0 ? (
            <p className="empty">Geen planning vandaag</p>
          ) : (
            data.todayPlanning.map((item) => (
              <div key={item.id} className="noteItem">
                <strong>{item.time}</strong>
                <p>Project: {item.projectId}</p>
              </div>
            ))
          )}
        </div>

        <div className="customerDetail">
          <RevenueChartWidget />

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

          <h3>🔔 Laatste meldingen</h3>

          {notifications.length === 0 ? (
            <p className="empty">Geen meldingen</p>
          ) : (
            notifications.slice(0, 3).map((notification) => (
              <div key={notification.id} className="noteItem">
                <strong>{notification.type}</strong>
                <p>{notification.message}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
