import { useState } from "react";

function SystemBrain() {
  const [projects] = useState(() => {
    const saved = localStorage.getItem("hf-projects");
    return saved ? JSON.parse(saved) : [];
  });

  const [customers] = useState(() => {
    const saved = localStorage.getItem("hf-customers");
    return saved ? JSON.parse(saved) : [];
  });

  const [invoices] = useState(() => {
    const saved = localStorage.getItem("hf-invoices");
    return saved ? JSON.parse(saved) : [];
  });

  const revenue = invoices.reduce((s, i) => s + (i.total || 0), 0);

  return (
    <section className="panel">
      <div className="pageHeader">
        <h2>🧠 System Brain</h2>
        <p className="empty">AI bedrijfsanalyse</p>
      </div>

      <div className="crmLayout">
        <div className="customerList">
          <h3>📊 Data</h3>

          <div className="noteItem">
            👤 Klanten: {customers.length}
          </div>

          <div className="noteItem">
            📂 Projecten: {projects.length}
          </div>

          <div className="noteItem">
            💰 Omzet: €{revenue.toFixed(2)}
          </div>
        </div>

        <div className="customerDetail">
          <h3>🧠 AI Analyse</h3>

          <div className="aiCustomerNote">
            <p>
              {revenue > 1000
                ? "Bedrijf groeit goed 🚀"
                : "Focus op omzet en nieuwe klanten"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SystemBrain;
