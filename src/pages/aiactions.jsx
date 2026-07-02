import { useState } from "react";
import { getInvoices, getPlanning, getProjects } from "../services/storage";
import { addAutoPlanning } from "../services/planningService";
import { createInvoicesFromProjects } from "../services/invoiceService";
import { addNotification } from "../services/notificationService";

function AiActions() {
  const [projects] = useState(() => getProjects());
  const [invoices, setInvoices] = useState(() => getInvoices());
  const [planning, setPlanning] = useState(() => getPlanning());

  const [lastRun, setLastRun] = useState(() => {
    return localStorage.getItem("hf-ai-last-run") || "Nog nooit";
  });

  function runAutonomousAI() {
    const updatedPlanning = addAutoPlanning(projects);
    const updatedInvoices = createInvoicesFromProjects(projects);

    setPlanning(updatedPlanning);
    setInvoices(updatedInvoices);

    const today = new Date().toISOString().split("T")[0];
    localStorage.setItem("hf-ai-last-run", today);
    setLastRun(today);

    addNotification(
      "AI CEO",
      "AI heeft planning gecontroleerd en facturen automatisch verwerkt."
    );

    alert("🤖 AI CEO heeft je bedrijfsdag geoptimaliseerd.");
  }

  return (
    <section className="panel">
      <div className="pageHeader">
        <h2>🤖 HF AI CEO Mode</h2>
        <p className="empty">Aangestuurd via centrale services</p>
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
              Deze versie gebruikt Planning Service, Invoice Service en
              Notification Service.
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
        </div>
      </div>
    </section>
  );
}

export default AiActions;
