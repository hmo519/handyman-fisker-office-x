import { useState } from "react";

function Dashboard() {
  const [customers] = useState(() => {
    const saved = localStorage.getItem("hf-customers");
    return saved ? JSON.parse(saved) : [];
  });

  const [projects] = useState(() => {
    const saved = localStorage.getItem("hf-projects");
    return saved ? JSON.parse(saved) : [];
  });

  const [invoices] = useState(() => {
    const saved = localStorage.getItem("hf-invoices");
    return saved ? JSON.parse(saved) : [];
  });

  const totalRevenue = invoices.reduce(
    (sum, i) => sum + (i.total || 0),
    0
  );

  const activeProjects = projects.filter(
    (p) => p.status !== "Klaar"
  );

  const openInvoices = invoices.length;

  // 🧠 AI ANALYSE
  function getStatus() {
    if (customers.length === 0)
      return "⚠️ Geen klanten → bedrijf staat stil";

    if (projects.length === 0)
      return "📂 Geen projecten → geen werk actief";

    if (openInvoices === 0)
      return "💰 Geen facturen → geen cashflow";

    if (totalRevenue < 1000)
      return "📉 Lage omzet → focus op afronden werk";

    return "🧠 Bedrijf draait stabiel";
  }

  function getFocus() {
    if (openInvoices > 3)
      return "💰 Facturen opvolgen";

    if (activeProjects.length > 0)
      return "📂 Projecten afronden";

    return "🚀 Nieuwe klanten genereren";
  }

  function getBestCustomer() {
    if (customers.length === 0) return "Geen data";

    return customers[0].name;
  }

  return (
    <section className="panel">
      <div className="pageHeader">
        <h2>🏢 HF CEO Dashboard</h2>
        <p className="empty">
          Volledig overzicht van je bedrijf in realtime
        </p>
      </div>

      <div className="crmLayout">
        {/* LEFT */}
        <div className="customerList">
          <h3>📊 KPI</h3>

          <div className="noteItem">
            💰 €{totalRevenue.toFixed(2)}
          </div>

          <div className="noteItem">
            👤 {customers.length} klanten
          </div>

          <div className="noteItem">
            📂 {projects.length} projecten
          </div>

          <div className="noteItem">
            🧾 {invoices.length} facturen
          </div>
        </div>

        {/* RIGHT AI */}
        <div className="customerDetail">
          <h3>🧠 CEO AI Analyse</h3>

          <div className="aiCustomerNote">
            <h4>📌 Status</h4>
            <p>{getStatus()}</p>
          </div>

          <div className="aiCustomerNote">
            <h4>🎯 Focus vandaag</h4>
            <p>{getFocus()}</p>
          </div>

          <div className="aiCustomerNote">
            <h4>🏆 Beste klant</h4>
            <p>{getBestCustomer()}</p>
          </div>

          <div className="aiCustomerNote">
            <h4>🚀 AI advies</h4>
            <p>
              Dit dashboard helpt je beslissen waar je vandaag geld kunt verdienen.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
