import { useState } from "react";

function AiActions() {
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

  // 🤖 AI ACTION ENGINE
  function runAIExecution() {
    let newPlanning = [...planning];
    let newInvoices = [...invoices];
    let newProjects = [...projects];

    // 📅 AUTO PLANNING FIX
    const todayPlan = newPlanning.filter(p => p.date === today);

    if (todayPlan.length === 0 && projects.length > 0) {
      newPlanning = projects.slice(0, 3).map((p, i) => ({
        id: `AI-PLAN-${Date.now()}-${i}`,
        projectId: p.id,
        date: today,
        time: `${8 + i * 2}:00`,
      }));
    }

    // 🧾 AUTO FACTUREN
    newProjects.forEach((p) => {
      const taskCount = p.tasks ? p.tasks.length : 0;

      if (taskCount > 0) {
        const exists = newInvoices.find(i => i.projectId === p.id);

        if (!exists) {
          newInvoices.push({
            id: `AI-INV-${Date.now()}-${p.id}`,
            projectId: p.id,
            projectName: p.title,
            total: taskCount * 50,
            date: new Date().toLocaleDateString("nl-NL"),
          });
        }
      }
    });

    setPlanning(newPlanning);
    setInvoices(newInvoices);

    localStorage.setItem("hf-planning", JSON.stringify(newPlanning));
    localStorage.setItem("hf-invoices", JSON.stringify(newInvoices));

    alert("🚀 AI EXECUTION COMPLETED: planning + facturen aangemaakt");
  }

  return (
    <section className="panel">
      <div className="pageHeader">
        <h2>⚡ HF AI Action Executor</h2>
        <p className="empty">
          AI voert nu automatisch bedrijfsacties uit
        </p>
      </div>

      <div className="crmLayout">

        {/* STATUS */}
        <div className="customerList">
          <h3>📊 System Status</h3>

          <div className="noteItem">📂 Projecten</div>
          <div className="noteItem">🧾 Facturen</div>
          <div className="noteItem">📅 Planning</div>
        </div>

        {/* EXECUTION */}
        <div className="customerDetail">

          <h3>🤖 AI Execution Core</h3>

          <div className="aiCustomerNote">
            <h4>🚀 Run AI Business Engine</h4>

            <button
              onClick={runAIExecution}
              style={{
                padding: "14px 18px",
                background: "#ef4444",
                color: "white",
                border: "none",
                borderRadius: "12px",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              ⚡ EXECUTE AI ACTIONS
            </button>
          </div>

          <div className="aiCustomerNote">
            <h4>🧠 Wat doet dit?</h4>
            <ul>
              <li>📅 maakt planning automatisch</li>
              <li>🧾 genereert facturen</li>
              <li>📂 analyseert projecten</li>
              <li>⚡ voert business logica uit</li>
            </ul>
          </div>

          <div className="aiCustomerNote">
            <h4>⚠️ Status</h4>
            <p>
              Dit is de eerste versie van een AI die acties kan uitvoeren in je bedrijf.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

export default AiActions;
