import { useState } from "react";

function DagAdvies() {
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

  function getTodayActions() {
    const actions = [];

    // 📅 planning check
    if (todayPlanning.length === 0) {
      actions.push("📅 Plan minimaal 2–3 klussen voor vandaag");
    }

    // 💰 geld laten liggen
    if (invoices.length > 0) {
      actions.push("💰 Check en verstuur openstaande facturen");
    }

    // 📂 lege projecten
    if (emptyProjects.length > 0) {
      actions.push(
        `📂 Werk ${emptyProjects.length} projecten bij met taken`
      );
    }

    // 📈 groei
    if (totalRevenue < 1500) {
      actions.push("📈 Focus op afronden en factureren voor groei");
    }

    // 👤 klanten
    if (customers.length < 3) {
      actions.push("👤 Voeg meer klanten toe voor stabiele groei");
    }

    if (actions.length === 0) {
      actions.push("✅ Alles loopt goed — optimaliseer efficiency");
    }

    return actions;
  }

  function getFocus() {
    if (todayPlanning.length === 0) return "Start met planning maken";
    if (emptyProjects.length > 0) return "Werk projecten bij";
    if (invoices.length > 5) return "Facturen opvolgen";
    return "Uitvoeren van geplande werkdag";
  }

  return (
    <section className="panel">
      <div className="pageHeader">
        <h2>📊 HF Dag Advies AI</h2>
        <p className="empty">Wat moet je vandaag doen?</p>
      </div>

      <div className="crmLayout">
        {/* OVERVIEW */}
        <div className="customerList">
          <h3>📊 Status</h3>

          <div className="noteItem">👤 Klanten: {customers.length}</div>
          <div className="noteItem">📂 Projecten: {projects.length}</div>
          <div className="noteItem">🧾 Facturen: {invoices.length}</div>
          <div className="noteItem">📅 Vandaag: {todayPlanning.length}</div>
        </div>

        {/* AI BRAIN */}
        <div className="customerDetail">
          <h3>🧠 AI Dagadvies</h3>

          <div className="aiCustomerNote">
            <h4>🎯 Focus vandaag</h4>
            <p>{getFocus()}</p>
          </div>

          <div className="aiCustomerNote">
            <h4>⚡ Actiepunten</h4>
            {getTodayActions().map((a, i) => (
              <p key={i}>👉 {a}</p>
            ))}
          </div>

          <div className="aiCustomerNote">
            <h4>📈 AI analyse</h4>
            <p>
              Je systeem analyseert je bedrijf per dag en bepaalt waar je
              focus moet liggen voor maximale efficiëntie.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DagAdvies;
