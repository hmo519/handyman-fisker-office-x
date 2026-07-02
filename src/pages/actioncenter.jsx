import { useState } from "react";

function ActionCenter() {
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

  const [planning] = useState(() => {
    const saved = localStorage.getItem("hf-planning");
    return saved ? JSON.parse(saved) : [];
  });

  const today = new Date().toISOString().split("T")[0];

  const todayPlanning = planning.filter((p) => p.date === today);
  const emptyProjects = projects.filter(
    (p) => !p.tasks || p.tasks.length === 0
  );

  const totalRevenue = invoices.reduce(
    (sum, i) => sum + (i.total || 0),
    0
  );

  function generateActions() {
    const actions = [];

    if (todayPlanning.length === 0) {
      actions.push("📅 Maak planning voor vandaag");
    }

    if (emptyProjects.length > 0) {
      actions.push(`📂 Werk ${emptyProjects.length} projecten bij`);
    }

    if (invoices.length > 0) {
      actions.push("💰 Verstuur openstaande facturen");
    }

    if (totalRevenue < 1500) {
      actions.push("📈 Focus op omzet verhogen");
    }

    if (customers.length < 3) {
      actions.push("👤 Voeg nieuwe klanten toe");
    }

    if (actions.length === 0) {
      actions.push("✅ Alles loopt goed");
    }

    return actions;
  }

  function runAllActions() {
    alert("🚀 AI voert acties uit (simulatie)");
  }

  return (
    <section className="panel">
      <div className="pageHeader">
        <h2>⚡ HF Action Center</h2>
        <p className="empty">
          1 centrale plek voor alle AI acties
        </p>
      </div>

      <div className="crmLayout">
        {/* STATUS */}
        <div className="customerList">
          <h3>📊 Status</h3>

          <div className="noteItem">👤 {customers.length}</div>
          <div className="noteItem">📂 {projects.length}</div>
          <div className="noteItem">🧾 {invoices.length}</div>
          <div className="noteItem">📅 {todayPlanning.length}</div>
        </div>

        {/* ACTIONS */}
        <div className="customerDetail">
          <h3>⚡ AI Acties</h3>

          {generateActions().map((a, i) => (
            <div key={i} className="aiCustomerNote">
              👉 {a}
            </div>
          ))}

          <button
            onClick={runAllActions}
            style={{
              padding: "14px",
              background: "#22c55e",
              color: "white",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              fontWeight: "bold",
              marginTop: "10px",
            }}
          >
            🚀 RUN ALL ACTIONS
          </button>

          <div className="aiCustomerNote">
            <h4>🧠 AI Status</h4>
            <p>
              Dit is de centrale controle laag van je hele bedrijfssysteem.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ActionCenter;
