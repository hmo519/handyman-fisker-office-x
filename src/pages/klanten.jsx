import { useEffect, useState } from "react";
import customersData from "../data/customersdata";

function Klanten() {
  const [customers, setCustomers] = useState(() => {
    const savedCustomers = localStorage.getItem("hf-customers");
    return savedCustomers ? JSON.parse(savedCustomers) : customersData;
  });

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [noteText, setNoteText] = useState("");
  const [projectTitle, setProjectTitle] = useState("");

  useEffect(() => {
    localStorage.setItem("hf-customers", JSON.stringify(customers));
  }, [customers]);

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function resetForm() {
    setForm({ name: "", phone: "", email: "", city: "" });
    setEditingId(null);
  }

  function saveCustomer() {
    if (!form.name.trim()) return;

    if (editingId) {
      const updatedCustomers = customers.map((customer) =>
        customer.id === editingId ? { ...customer, ...form } : customer
      );

      setCustomers(updatedCustomers);
      setSelectedCustomer(updatedCustomers.find((c) => c.id === editingId));
      resetForm();
      return;
    }

    const newCustomer = {
      id: `HF-${String(customers.length + 1).padStart(4, "0")}`,
      name: form.name,
      phone: form.phone,
      email: form.email,
      city: form.city,
      status: "Nieuwe klant",
      notes: [],
      projects: [],
    };

    setCustomers([...customers, newCustomer]);
    setSelectedCustomer(newCustomer);
    resetForm();
  }

  function editCustomer(customer) {
    setEditingId(customer.id);
    setForm({
      name: customer.name,
      phone: customer.phone,
      email: customer.email,
      city: customer.city,
    });
  }

  function deleteCustomer(id) {
    if (!window.confirm("Weet je zeker dat je deze klant wilt verwijderen?")) return;

    const updatedCustomers = customers.filter((customer) => customer.id !== id);
    setCustomers(updatedCustomers);

    if (selectedCustomer?.id === id) setSelectedCustomer(null);
    if (editingId === id) resetForm();
  }

  function addNote() {
    if (!selectedCustomer || !noteText.trim()) return;

    const newNote = {
      id: Date.now(),
      text: noteText,
      date: new Date().toLocaleDateString("nl-NL"),
    };

    const updatedCustomers = customers.map((customer) =>
      customer.id === selectedCustomer.id
        ? { ...customer, notes: [...(customer.notes || []), newNote] }
        : customer
    );

    setCustomers(updatedCustomers);
    setSelectedCustomer(updatedCustomers.find((c) => c.id === selectedCustomer.id));
    setNoteText("");
  }

  function addProject() {
    if (!selectedCustomer || !projectTitle.trim()) return;

    const newProject = {
      id: `PRJ-${Date.now()}`,
      title: projectTitle,
      status: "Nieuw project",
      createdAt: new Date().toLocaleDateString("nl-NL"),
    };

    const updatedCustomers = customers.map((customer) =>
      customer.id === selectedCustomer.id
        ? { ...customer, projects: [...(customer.projects || []), newProject] }
        : customer
    );

    setCustomers(updatedCustomers);
    setSelectedCustomer(updatedCustomers.find((c) => c.id === selectedCustomer.id));
    setProjectTitle("");
  }

  const filteredCustomers = customers.filter((customer) => {
    const searchText = search.toLowerCase();

    return (
      customer.id.toLowerCase().includes(searchText) ||
      customer.name.toLowerCase().includes(searchText) ||
      customer.phone.toLowerCase().includes(searchText) ||
      customer.email.toLowerCase().includes(searchText) ||
      customer.city.toLowerCase().includes(searchText)
    );
  });

  return (
    <section className="panel">
      <div className="pageHeader">
        <div>
          <h2>👥 Klantenbeheer</h2>
          <p className="empty">Klanten, notities en projecten beheren.</p>
        </div>
      </div>

      <input
        className="searchInput"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="🔍 Zoek klant..."
      />

      <div className="customerForm">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Naam" />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Telefoon" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
        <input name="city" value={form.city} onChange={handleChange} placeholder="Plaats" />

        <button onClick={saveCustomer}>
          {editingId ? "💾 Wijzigingen opslaan" : "➕ Klant toevoegen"}
        </button>

        {editingId && <button onClick={resetForm}>❌ Annuleren</button>}
      </div>

      <div className="crmLayout">
        <div className="customerList">
          {filteredCustomers.map((customer) => (
            <div
              className={selectedCustomer?.id === customer.id ? "customerCard selected" : "customerCard"}
              key={customer.id}
              onClick={() => setSelectedCustomer(customer)}
            >
              <div>
                <strong>{customer.name}</strong>
                <p>{customer.id} • {customer.city}</p>
              </div>
              <span className="statusBadge">{customer.status}</span>
            </div>
          ))}
        </div>

        <div className="customerDetail">
          {selectedCustomer ? (
            <>
              <div className="detailHeader">
                <div>
                  <h3>👤 {selectedCustomer.name}</h3>
                  <p className="empty">{selectedCustomer.id}</p>
                </div>
                <span className="statusBadge">{selectedCustomer.status}</span>
              </div>

              <div className="detailGrid">
                <div><strong>📞 Telefoon</strong><p>{selectedCustomer.phone || "Niet ingevuld"}</p></div>
                <div><strong>📧 Email</strong><p>{selectedCustomer.email || "Niet ingevuld"}</p></div>
                <div><strong>📍 Plaats</strong><p>{selectedCustomer.city || "Niet ingevuld"}</p></div>
                <div><strong>📂 Projecten</strong><p>{(selectedCustomer.projects || []).length}</p></div>
              </div>

              <div className="detailActions">
                <a href={`tel:${selectedCustomer.phone}`}>📞 Bellen</a>
                <a href={`mailto:${selectedCustomer.email}`}>📧 Mailen</a>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedCustomer.city)}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  📍 Route
                </a>
                <button onClick={() => editCustomer(selectedCustomer)}>✏️ Bewerken</button>
                <button onClick={() => deleteCustomer(selectedCustomer.id)}>🗑️ Verwijderen</button>
              </div>

              <div className="projectBox">
                <h4>📂 Projecten</h4>
                <div className="noteInput">
                  <input
                    value={projectTitle}
                    onChange={(event) => setProjectTitle(event.target.value)}
                    placeholder="Nieuw project..."
                  />
                  <button onClick={addProject}>Project opslaan</button>
                </div>

                {(selectedCustomer.projects || []).map((project) => (
                  <div className="projectItem" key={project.id}>
                    <div>
                      <strong>{project.title}</strong>
                      <p>{project.id} • {project.createdAt}</p>
                    </div>
                    <span className="statusBadge">{project.status}</span>
                  </div>
                ))}
              </div>

              <div className="noteBox">
                <h4>📝 Notities</h4>
                <div className="noteInput">
                  <input
                    value={noteText}
                    onChange={(event) => setNoteText(event.target.value)}
                    placeholder="Nieuwe notitie..."
                  />
                  <button onClick={addNote}>Opslaan</button>
                </div>

                {(selectedCustomer.notes || []).map((note) => (
                  <div className="noteItem" key={note.id}>
                    <strong>{note.date}</strong>
                    <p>{note.text}</p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="empty">Klik links op een klant om het klantdossier te openen.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Klanten;
