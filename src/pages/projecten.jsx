import { useEffect, useState } from "react";

function Planning() {
  const [projects] = useState(() => {
    const saved = localStorage.getItem("hf-projects");
    return saved ? JSON.parse(saved) : [];
  });

  const [customers] = useState(() => {
    const saved = localStorage.getItem("hf-customers");
    return saved ? JSON.parse(saved) : [];
  });

  const [planning, setPlanning] = useState(() => {
    const saved = localStorage.getItem("hf-planning");
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedProject, setSelectedProject] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [workMode, setWorkMode] = useState(false);

  useEffect(() => {
    localStorage.setItem("hf-planning", JSON.stringify(planning));
  }, [planning]);

  function addPlanning() {
    if (!selectedProject || !date || !time) return;

    const newItem = {
      id: `PLN-${Date.now()}`,
      projectId: selectedProject,
      date,
      time,
    };

    setPlanning([...planning, newItem]);

    setSelectedProject("");
    setDate("");
    setTime("");
  }

  function getProject(id) {
    return projects.find((p) => p.id === id);
  }

  function getCustomer(customerId) {
    return customers.find((c) => c.id === customerId);
  }

  const today = new Date().toISOString().split("T")[0];

  const todayRoute = planning
    .filter((p) => p.date === today)
    .sort((a, b) => a.time.localeCompare(b.time));

  return (
    <section className="panel">
      <div className="pageHeader">
        <h2>🚀 Werkdag Cockpit</h2>
        <p className="empty">Alles wat je vandaag moet doen in één scherm</p>
      </div>

      {/* INPUT */}
      <div className="customerForm">
        <select
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
        >
          <option value="">-- Kies project --</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.title}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <button onClick={addPlanning}>➕ Inplannen</button>
      </div>

      {/* START DAG KNOP */}
      {todayRoute.length > 0 && (
        <button
          onClick={() => setWorkMode(!workMode)}
          style={{
            marginTop: "20px",
            padding: "14px 18px",
            background: workMode ? "#ef4444" : "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "12px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          🚀 {workMode ? "Stop werkdag" : "Start werkdag"}
        </button>
      )}

      <div className="crmLayout">
        {/* ROUTE */}
        <div className="customerList">
          <h3>📍 Werkdag route</h3>

          {todayRoute.length === 0 ? (
            <p className="empty">Geen afspraken vandaag</p>
          ) : (
            todayRoute.map((item, index) => {
              const project = getProject(item.projectId);
              const customer = project
                ? getCustomer(project.customerId)
                : null;

              const isActive = workMode && index === 0;

              return (
                <div
                  key={item.id}
                  className="customerCard"
                  style={{
                    border: isActive ? "2px solid #22c55e" : "",
                    transform: isActive ? "scale(1.02)" : "scale(1)",
                    transition: "0.2s",
                  }}
                >
                  <div>
                    <strong>
                      {isActive ? "👉 NU: " : ""}
                      {item.time}
                    </strong>

                    <p>{project?.title}</p>

                    <p style={{ fontSize: "12px", opacity: 0.7 }}>
                      👤 {customer?.name}
                    </p>

                    <p style={{ fontSize: "12px", opacity: 0.7 }}>
                      📍 {customer?.address || customer?.city}
                    </p>
                  </div>

                  {workMode && isActive && (
                    <div className="aiCustomerNote">
                      <p>⚡ Huidige klus actief</p>
                      <p>Vergeet materiaal check niet</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* OVERVIEW */}
        <div className="customerDetail">
          <h3>📆 Overzicht</h3>

          {planning.length === 0 ? (
            <p className="empty">Nog geen planning</p>
          ) : (
            planning.map((item) => {
              const project = getProject(item.projectId);
              const customer = project
                ? getCustomer(project.customerId)
                : null;

              return (
                <div key={item.id} className="noteItem">
                  <strong>
                    {item.date} • {item.time}
                  </strong>

                  <p>{project?.title}</p>

                  <p style={{ fontSize: "12px", opacity: 0.7 }}>
                    👤 {customer?.name}
                  </p>

                  <p style={{ fontSize: "12px", opacity: 0.7 }}>
                    📍 {customer?.address || customer?.city}
                  </p>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}

export default Planning;
