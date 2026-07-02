import { useState } from "react";

function Simulation() {
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

  const baseRevenue = invoices.reduce(
    (s, i) => s + (i.total || 0),
    0
  );

  // 🧠 SIMULATIE ENGINE
  function simulateGrowth() {
    const growthFactor = 1.25;
    return baseRevenue * growthFactor;
  }

  function simulateNoAction() {
    const declineFactor = 0.85;
    return baseRevenue * declineFactor;
  }

  function simulateMoreClients() {
    return baseRevenue + customers.length * 150;
  }

  function getRiskLevel() {
    if (projects.length === 0) return "⚠️ HOOG RISICO";
    if (invoices.length === 0) return "⚠️ CASHFLOW RISICO";
    if (customers.length < 3) return "📉 GROEI RISICO";
    return "🟢 STABIEL";
  }

  return (
    <section className="panel">
      <div className="pageHeader">
        <h2>📊 HF Business Simulation</h2>
        <p className="empty">
          Wat gebeurt er met je bedrijf in verschillende scenario’s?
        </p>
      </div>

      <div className="crmLayout">
        {/* STATUS */}
        <div className="customerList">
          <h3>📊 Huidige data</h3>

          <div className="noteItem">
            👤 {customers.length} klanten
          </div>

          <div className="noteItem">
            📂 {projects.length} projecten
          </div>

          <div className="noteItem">
            🧾 {invoices.length} facturen
          </div>

          <div className="noteItem">
            💰 €{baseRevenue.toFixed(2)}
          </div>
        </div>

        {/* SIMULATION */}
        <div className="customerDetail">
          <h3>🧠 AI Simulatie</h3>

          <div className="aiCustomerNote">
            <h4>📈 Groei scenario</h4>
            <p>€{simulateGrowth().toFixed(2)}</p>
          </div>

          <div className="aiCustomerNote">
            <h4>📉 Geen actie scenario</h4>
            <p>€{simulateNoAction().toFixed(2)}</p>
          </div>

          <div className="aiCustomerNote">
            <h4>🚀 Meer klanten scenario</h4>
            <p>€{simulateMoreClients().toFixed(2)}</p>
          </div>

          <div className="aiCustomerNote">
            <h4>⚠️ Risico analyse</h4>
            <p>{getRiskLevel()}</p>
          </div>

          <div className="aiCustomerNote">
            <h4>🧠 AI conclusie</h4>
            <p>
              Dit systeem voorspelt de impact van jouw beslissingen op je bedrijf.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Simulation;
