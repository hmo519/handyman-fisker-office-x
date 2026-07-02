import { useState } from "react";

function BusinessAutopilot() {
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

  function runBusinessDay() {
    let newPlanning = [...planning];
    let newInvoices = [...invoices];

    // 📅 planning
    const todayPlan = newPlanning.filter(p => p.date === today);

    if (todayPlan.length === 0) {
      newPlanning = projects.slice(0, 3).map((p, i) => ({
        id: `AUTO-${Date.now()}-${i}`,
        projectId: p.id,
        date: today,
        time: `${8 + i * 2}:00`,
      }));
    }

    // 🧾 facturen
    projects.forEach((p) => {
      const taskCount = p.tasks ? p.tasks.length : 0;

      if (taskCount > 0) {
        const exists = newInvoices.find(i => i.projectId === p.id);

        if (!exists) {
          newInvoices.push({
            id: `INV-${Date.now()}-${p.id}`,
            projectId: p.id,
            projectName: p.title,
            total: taskCount * 45,
            date: new Date().toLocaleDateString("nl-NL"),
          });
        }
      }
    });

    setPlanning(newPlanning);
    setInvoices(newInvoices);

    localStorage.setItem("hf-planning", JSON.stringify(newPlanning));
    localStorage.setItem("hf-invoices", JSON.stringify(newInvoices));

    alert("🚀 Business dag uitgevoerd");
  }

  return (
    <section className="panel">
      <h2>🚀 Business Autopilot</h2>

      <button
        onClick={runBusinessDay}
        style={{
          padding: "14px",
          background: "green",
          color: "white",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer"
        }}
      >
        RUN BUSINESS DAY
      </button>
    </section>
  );
}

export default BusinessAutopilot;
