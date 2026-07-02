import { useEffect, useState } from "react";

function Projecten() {
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem("hf-projects");
    return saved ? JSON.parse(saved) : [];
  });

  const [customers] = useState(() => {
    const saved = localStorage.getItem("hf-customers");
    return saved ? JSON.parse(saved) : [];
  });

  const [title, setTitle] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");

  useEffect(() => {
    localStorage.setItem("hf-projects", JSON.stringify(projects));
  }, [projects]);

  function addProject() {
    if (!title || !selectedCustomer) return;

    const newProject = {
      id: `PROJ-${Date.now()}`,
      title,
      customerId: selectedCustomer,
      status: "Nieuw",
      tasks: [],
    };

    setProjects([...projects, newProject]);

    setTitle("");
  }

  function addTask(projectId, taskText) {
    if (!taskText) return;

    const updated = projects.map((p) => {
      if (p.id !== projectId) return p;

      return {
        ...p,
        tasks: [...(p.tasks || []), taskText],
      };
    });

    setProjects(updated);
  }

  function getCustomerName(id) {
    const c = customers.find((c) => c.id === id);
    return c ? c.name : "Onbekend";
  }

  // 🧠 AI ANALYSE FUNCTIES
  function getProjectInsight(project) {
    if (!project.tasks || project.tasks.length === 0) {
      return "⚠️ Geen taken → project ligt stil";
    }

    if (project.tasks.length < 3) {
      return "📌 Weinig werk → uitbreiden mogelijk";
    }

    if (project.status === "Klaar") {
      return "💰 Klaar voor facturatie";
    }

    return "🚀 Actief project";
  }

  function getPriority(project) {
    if (!project.tasks || project.tasks.length === 0) {
      return "⚠️ DIRECT ACTIE NODIG";
    }

    if (project.status === "Nieuw") {
      return "📌 Start werk";
    }

    if (project.status === "Bezig") {
      return "🚀 Ga verder met uitvoering";
    }

    return "✅ Afgerond";
  }

  return (
    <section className="panel">
      <div className="pageHeader">
        <h2>🧠 HF Project AI Brain</h2>
        <p className="empty">
          Elk project krijgt nu slimme AI analyse
        </p>
      </div>

      {/* CREATE PROJECT */}
      <div className="customerForm">
        <input
          placeholder="Project naam"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select
          value={selectedCustomer}
          onChange={(e) => setSelectedCustomer(e.target.value)}
        >
          <option value="">Selecteer klant</option>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <button onClick={addProject}>➕ Project toevoegen</button>
      </div>

      <div className="crmLayout">
        {/* LIST */}
        <div className="customerList">
          {projects.map((p) => (
            <div key={p.id} className="customerCard">
              <strong>{p.title}</strong>

              <p>👤 {getCustomerName(p.customerId)}</p>
              <p>📊 {p.status}</p>

              <p style={{ fontSize: "12px", opacity: 0.7 }}>
                {getProjectInsight(p)}
              </p>
            </div>
          ))}
        </div>

        {/* DETAIL AI */}
        <div className="customerDetail">
          {projects.map((p) => (
            <div key={p.id} className="noteItem">
              <h4>📌 {p.title}</h4>

              <p>👤 {getCustomerName(p.customerId)}</p>

              <div className="aiCustomerNote">
                <h4>🧠 AI Prioriteit</h4>
                <p>{getPriority(p)}</p>
              </div>

              <div className="aiCustomerNote">
                <h4>📊 AI Analyse</h4>
                <p>{getProjectInsight(p)}</p>
              </div>

              {/* TASK INPUT */}
              <input
                placeholder="Nieuwe taak toevoegen"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addTask(p.id, e.target.value);
                    e.target.value = "";
                  }
                }}
              />

              <ul>
                {(p.tasks || []).map((t, i) => (
                  <li key={i}>✔ {t}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projecten;
