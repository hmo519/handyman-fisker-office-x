import { useEffect, useState } from "react";

function Klanten() {
  const [customers, setCustomers] = useState(() => {
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

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    localStorage.setItem("hf-customers", JSON.stringify(customers));
  }, [customers]);

  function addCustomer() {
    if (!name) return;

    const newCustomer = {
      id: `CUST-${Date.now()}`,
      name,
      city,
    };

    setCustomers([...customers, newCustomer]);

    setName("");
    setCity("");
  }

  function getProjects(customerId) {
    return projects.filter((p) => p.customerId === customerId);
  }

  function getInvoices(projectId) {
    return invoices.filter((i) => i.projectId === projectId);
  }

  return (
    <section className="panel">
      <div className="pageHeader">
        <h2>👤 CRM Flow System</h2>
        <p className="empty">
          Klanten → Projecten → Facturen gekoppeld
        </p>
      </div>

      {/* ADD CUSTOMER */}
      <div className="customerForm">
        <input
          placeholder="Naam"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Stad"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button onClick={addCustomer}>➕ Klant toevoegen</button>
      </div>

      <div className="crmLayout">
        {/* LIST */}
        <div className="customerList">
          {customers.map((c) => (
            <div
              key={c.id}
              className="customerCard"
              onClick={() => setSelectedCustomer(c)}
            >
              <strong>{c.name}</strong>
              <p>{c.city}</p>
            </div>
          ))}
        </div>

        {/* DETAIL */}
        <div className="customerDetail">
          {selectedCustomer ? (
            <>
              <h3>👤 {selectedCustomer.name}</h3>

              {/* PROJECTS */}
              <h4>📂 Projecten</h4>
              {getProjects(selectedCustomer.id).map((p) => (
                <div key={p.id} className="noteItem">
                  📌 {p.title}

                  {/* INVOICES */}
                  {getInvoices(p.id).map((i) => (
                    <p key={i.id}>🧾 €{i.total}</p>
                  ))}
                </div>
              ))}

              {getProjects(selectedCustomer.id).length === 0 && (
                <p className="empty">Geen projecten</p>
              )}
            </>
          ) : (
            <p className="empty">Selecteer een klant</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Klanten;
