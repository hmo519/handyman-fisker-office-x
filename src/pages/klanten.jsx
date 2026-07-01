import { useEffect, useState } from "react";
import customersData from "../data/customersData";

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

  useEffect(() => {
    localStorage.setItem("hf-customers", JSON.stringify(customers));
  }, [customers]);

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  function resetForm() {
    setForm({
      name: "",
      phone: "",
      email: "",
      city: "",
    });

    setEditingId(null);
  }

  function saveCustomer() {
    if (!form.name.trim()) return;

    if (editingId) {
      const updatedCustomers = customers.map((customer) =>
        customer.id === editingId
          ? {
              ...customer,
              name: form.name,
              phone: form.phone,
              email: form.email,
              city: form.city,
            }
          : customer
      );

      setCustomers(updatedCustomers);
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
    };

    setCustomers([...customers, newCustomer]);
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

  return (
    <section className="panel">
      <div className="pageHeader">
        <div>
          <h2>👥 Klantenbeheer</h2>
          <p className="empty">
            Klanten toevoegen, bewerken en beheren.
          </p>
        </div>
      </div>

      <div className="customerForm">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Naam"
        />

        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Telefoon"
        />

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
        />

        <input
          name="city"
          value={form.city}
          onChange={handleChange}
          placeholder="Plaats"
        />

        <button onClick={saveCustomer}>
          {editingId ? "💾 Wijzigingen opslaan" : "➕ Klant toevoegen"}
        </button>

        {editingId && (
          <button onClick={resetForm}>
            ❌ Annuleren
          </button>
        )}
      </div>

      <div className="customerList">
        {customers.map((customer) => (
          <div className="customerCard" key={customer.id}>
            <div>
              <strong>{customer.name}</strong>
              <p>
                {customer.id} • {customer.city}
              </p>
            </div>

            <div>
              <span>{customer.phone}</span>
              <p>{customer.email}</p>
            </div>

            <span className="statusBadge">
              {customer.status}
            </span>

            <button onClick={() => editCustomer(customer)}>
              ✏️ Bewerken
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Klanten;
