import { useState } from "react";

function AiAssistant() {
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

  // 🔥 ANALYSE DATA
  const totalRevenue = invoices.reduce(
    (sum, i) => sum + (i.total || 0),
    0
  );

  const emptyProjects = projects.filter(
    (p) => !p.tasks || p.tasks.length === 0
  );

  const openInvoices = invoices.length;

  // 🤖 AUTOPILOT ACTIONS
  function generateActions() {
    const actions = [];

    // 1. lege dag
    if (todayPlanning.length === 0) {
      actions.push("📅 Maak planning voor vandaag");
    }

    // 2. open facturen
    if (openInvoices > 0) {
      actions.push("💰 Verstuur openstaande facturen");
    }

    // 3. lege projecten
    if (emptyProjects.length > 0) {
      actions.push(
        `📂 Voeg taken toe aan ${emptyProjects.length} projecten`
      );
    }

    // 4. lage omzet
    if (totalRevenue < 1500) {
      actions.push("📈 Focus op afronden projecten voor meer omzet");
    }

    // 5. geen klanten
    if (customers.length === 0) {
      actions.push("👤 Voeg nieuwe klanten toe");
    }

    return actions;
  }

  const actions = generateActions();

  // 🎯 PRIORITY ENGINE
  function getPriority() {
    if (todayPlanning.length === 0) {
      return "Start met je planning voor vandaag";
    }

    if (openInvoices > 3) {
      return "Verstuur facturen om cashflow te verbeteren";
    }

    if (emptyProjects.length > 0) {
      return "Werk je projecten bij met taken";
    }

    return "Systeem draait goed – optimaliseer werkflow";
  }

  return (
    <section className="panel">
      <div className="pageHeader">
        <h2>🚀 HF Autopilot V2</h2>
        <p className="empty">
          Zelfsturende bedrijfsassistent
        </p>
      </div>

      <div className="crmLayout">
        {/* STATUS */}
        <div className="customerList">
          <h3>📊 Systeem status</h3>

          <div className="noteItem">
            💰 €{totalRevenue.toFixed(2)}
          </div>

          <div className="noteItem">
            📂 Projecten: {projects.length}
          </div>

          <div className="noteItem">
            🧾 Facturen: {invoices.length}
          </div>

          <div className="noteItem">
            📅 Vandaag: {todayPlanning.length}
          </div>
        </div>

        {/* AUTOPILOT CORE */}
        <div className="customerDetail">
          <h3>🤖 Autopilot Engine</h3>

          <div className="aiCustomerNote">
            <h4>⚡ Prioriteit</h4>
            <p>{getPriority()}</p>
          </div>

          <div className="aiCustomerNote">
            <h4>📌 Acties</h4>
            {actions.map((a, i) => (
              <p key={i}>👉 {a}</p>
            ))}
          </div>

          <div className="aiCustomerNote">
            <h4>🧠 Status</h4>
            <p>
              HF AI is nu in AUTOPILOT modus. Het systeem genereert acties
              automatisch op basis van bedrijfsdata.
            </p>
          </div>

          <div className="aiCustomerNote">
            <h4>🚀 Volgende stap</h4>
            <p>
              Volgende upgrade: automatische uitvoering van acties (planning
              vullen, facturen maken, klanten opvolgen).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AiAssistant;
