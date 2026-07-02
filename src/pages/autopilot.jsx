import { useState } from "react";

function Autopilot() {
  const [projects, setProjects] = useState(() => {
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

  function runAutopilot() {
    // 1. AUTO PLANNING
    if (planning.filter(p => p.date === today).length === 0) {
      const newPlan = projects.slice(0, 3).map((p, i) => ({
        id: `AUTO-PLN-${Date.now()}-${i}`,
        projectId: p.id,
        date: today,
        time: `${8 + i * 2}:00`,
      }));

      setPlanning(newPlan);
      localStorage.setItem("hf-planning", JSON.stringify(newPlan));
    }

    // 2. AUTO FACTUREN
    const newInvoices = [...invoices];

    projects.forEach((p) => {
      const taskCount = p.tasks ? p.tasks.length : 0;

      if (taskCount > 0) {
        const exists = newInvoices.find(i => i.projectId === p.id);

        if (!exists) {
          const total = taskCount * 45;

          newInvoices.push({
            id: `AUTO-${Date.now()}-${p.id}`,
            projectId: p.id,
            projectName: p.title,
            total,
            date: new Date().toLocaleDateString("nl-NL"),
          });
        }
      }
    });

    setInvoices(newInvoices);
    localStorage.setItem("hf-invoices", JSON.stringify(newInvoices));

    alert("🚀 Autopilot uitgevoerd: planning + facturen geoptimaliseerd");
  }

  return (
    <section className="panel">
      <div className="pageHeader">
        <h2>🚀 HF Full Autopilot</h2>
        <p className="empty">
          1 klik = volledige bedrijfsoptimalisatie
        </p>
      </div>

      <div className="crmLayout">
        {/* STATUS */}
        <div className="customerList">
          <h3>📊 Systeem status</h3>

          <div className="noteItem">📂 Projecten: {projects.length}</div>
          <div className="noteItem">🧾 Facturen: {invoices.length}</div>
          <div className="noteItem">📅 Planning: {planning.length}</div>
        </div>

        {/* CONTROL PANEL */}
        <div className="customerDetail">
          <h3>⚡ Autopilot Control</h3>

          <div className="aiCustomerNote">
            <h4>🤖 Start systeem</h4>

            <button
              onClick={runAutopilot}
              style={{
                padding: "14px 18px",
                background: "#22c55e",
                color: "white",
                border: "none",
                borderRadius: "12px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              🚀 START AUTOPILOT
            </button>
          </div>

          <div className="aiCustomerNote">
            <h4>⚙️ Wat gebeurt er?</h4>
            <ul>
              <li>📅 Planning wordt automatisch aangemaakt</li>
              <li>🧾 Facturen worden gegenereerd</li>
              <li>📂 Projecten worden geanalyseerd</li>
            </ul>
          </div>

          <div className="aiCustomerNote">
            <h4>🧠 Status</h4>
            <p>
              HF AI Full Autopilot kan nu zelfstandig bedrijfsprocessen uitvoeren.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Autopilot;
