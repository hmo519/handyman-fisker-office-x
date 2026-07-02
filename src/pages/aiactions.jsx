import { useState } from "react";

function AiActions() {
  const [projects] = useState(() => {
    const saved = localStorage.getItem("hf-projects");
    return saved ? JSON.parse(saved) : [];
  });

  const [invoices, setInvoices] = useState(() => {
    const saved = localStorage.getItem("hf-invoices");
    return saved ? JSON.parse(saved) : [];
  });

  const [planning, setPlanning] = useState(() => {
    const saved = localStorage.getItem("hf-planning");
    return saved ? JSON.parse(saved) : [];
  });

  const today = new Date().toISOString().split("T")[0];

  function createAutoInvoice(project) {
    const taskCount = project.tasks ? project.tasks.length : 0;

    if (taskCount === 0) return;

    const price = 45;
    const total = taskCount * price;

    const newInvoice = {
      id: `AUTO-${Date.now()}`,
      projectId: project.id,
      projectName: project.title,
      tasks: taskCount,
      total,
      date: new Date().toLocaleDateString("nl-NL"),
    };

    setInvoices([...invoices, newInvoice]);
    localStorage.setItem(
      "hf-invoices",
      JSON.stringify([...invoices, newInvoice])
    );
  }

  function autoFillToday() {
    const empty = planning.filter((p) => p.date === today);

    if (empty.length > 0) return;

    const newPlan = projects.slice(0, 3).map((p, i) => ({
      id: `AUTO-PLN-${Date.now()}-${i}`,
      projectId: p.id,
      date: today,
      time: `${8 + i * 2}:00`,
    }));

    setPlanning(newPlan);
    localStorage.setItem("hf-planning", JSON.stringify(newPlan));
  }

  function autoRunSystem() {
    // 1. auto planning vullen
    autoFillToday();

    // 2. auto facturen genereren
    projects.forEach((p) => {
      if (p.tasks && p.tasks.length > 0) {
        const already = invoices.find((i) => i.projectId === p.id);
        if (!already) {
          createAutoInvoice(p);
        }
      }
    });
  }

  return (
    <section className="panel">
      <div className="pageHeader">
        <h2>⚡ HF AI Auto Engine</h2>
        <p className="empty">
          Systeem dat automatisch acties uitvoert
        </p>
      </div>

      <div className="crmLayout">
        {/* STATUS */}
        <div className="customerList">
          <h3>📊 System check</h3>

          <div className="noteItem">
            📂 Projecten: {projects.length}
          </div>

          <div className="noteItem">
            🧾 Facturen: {invoices.length}
          </div>

          <div className="noteItem">
            📅 Planning: {planning.length}
          </div>
        </div>

        {/* ENGINE */}
        <div className="customerDetail">
          <h3>⚡ Auto Actions</h3>

          <div className="aiCustomerNote">
            <h4>🤖 Automatische acties</h4>

            <button
              onClick={autoRunSystem}
              style={{
                padding: "12px 16px",
                background: "#22c55e",
                color: "white",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              🚀 Start Auto Engine
            </button>
          </div>

          <div className="aiCustomerNote">
            <h4>⚙️ Wat gebeurt er?</h4>
            <ul>
              <li>📅 Planning wordt automatisch gevuld</li>
              <li>🧾 Facturen worden gegenereerd</
              li>
              <li>📂 Werk wordt gecontroleerd</li>
            </ul>
          </div>

          <div className="aiCustomerNote">
            <h4>🧠 Status</h4>
            <p>
              HF AI V4 kan nu zelfstandig bedrijfsprocessen uitvoeren.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AiActions;
