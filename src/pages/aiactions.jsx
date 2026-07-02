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

  const [lastRun, setLastRun] = useState(() => {
    return localStorage.getItem("hf-ai-last-run") || "Nog nooit";
  });

  const today = new Date().toISOString().split("T")[0];

  function runAutonomousAI() {
    let newPlanning = [...planning];
    let newInvoices = [...invoices];

    const todayPlanning = newPlanning.filter((p) => p.date === today);

    if (todayPlanning.length === 0 && projects.length > 0) {
      const autoPlanning = projects.slice(0, 3).map((project, index) => ({
        id: `AI-PLAN-${Date.now()}-${index}`,
        projectId: project.id,
        date: today,
        time: `${8 + index * 2}:00`,
      }));

      newPlanning = [...newPlanning, ...autoPlanning];
    }

    projects.forEach((project) => {
      const taskCount = project.tasks ? project.tasks.length : 0;
      const invoiceExists = newInvoices.some(
        (invoice) => invoice.projectId === project.id
      );

      if (taskCount > 0 && !invoiceExists) {
        const subtotal = taskCount * 50;
        const tax = subtotal * 0.21;
        const total = subtotal + tax;

        newInvoices.push({
          id: `AI-INV-${Date.now()}-${project.id}`,
          projectId: project.id,
          projectName: project.title,
          tasks: taskCount,
          subtotal,
          tax,
          total,
          date: new Date().toLocaleDateString("nl-NL"),
          status: "AI gegenereerd",
        });
      }
    });

    setPlanning(newPlanning);
    setInvoices(newInvoices);

    localStorage.setItem("hf-planning", JSON.stringify(newPlanning));
    localStorage.setItem("hf-invoices", JSON.stringify(newInvoices));
    localStorage.setItem("hf-ai-last-run", today);

    setLastRun(today);

    alert("🤖 AI CEO heeft je bedrijfsdag geoptimaliseerd.");
  }

  return (
    <section className="panel">
      <div className="pageHeader">
        <h2>🤖 HF AI CEO Mode</h2>
        <p className="empty">
          De AI voert zelfstandig veilige bedrijfsacties uit.
        </p>
      </div>

      <div className="crmLayout">
        <div className="customerList">
          <h3>📊 AI Status</h3>

          <div className="noteItem">📂 Projecten: {projects.length}</div>
          <div className="noteItem">📅 Planning: {planning.length}</div>
          <div className="noteItem">🧾 Facturen: {invoices.length}</div>
          <div className="noteItem">🕒 Laatste run: {lastRun}</div>
        </div>

        <div className="customerDetail">
          <h3>⚡ Autonomous Control</h3>

          <div className="aiCustomerNote">
            <h4>🚀 Run AI CEO</h4>
            <p>
              Deze knop laat de AI veilig planning aanvullen en facturen
              klaarzetten zonder dubbele facturen te maken.
            </p>

            <button
              onClick={runAutonomousAI}
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
              🤖 RUN AI CEO MODE
            </button>
          </div>

          <div className="aiCustomerNote">
            <h4>🧠 Wat doet de AI?</h4>
            <ul>
              <li>📅 Maakt planning als vandaag leeg is</li>
              <li>🧾 Maakt facturen voor projecten met taken</li>
              <li>🛡️ Voorkomt dubbele facturen per project</li>
              <li>💾 Slaat alles automatisch op</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AiActions;