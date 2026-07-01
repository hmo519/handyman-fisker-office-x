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

  useEffect(() => {
    localStorage.setItem("hf-customers", JSON.stringify(customers));
  }, [customers]);

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  function addCustomer() {
    if (!form.name.trim()) return;

    const newCustomer = {
      id: `HF-${String(customers.length + 1).padStart(4, "0")}`,
      name: form.name,
      phone: form.phone,
      email: form.email,
      city: form.city,
      status: "Nieuwe klant",
    };

    setCustomers([...customers, newCustomer]);

    setForm({
      name: "",
      phone: "",
      email: "",
      city: "",
    });
  }

  return (
    <section className="panel">
      <div className="pageHeader">
        <div>
          <h2>👥 Klantenbeheer</h2>
          <p className="empty">
            Beheer klanten, contactgegevens en status.
          </p>
        </div>
      </div>

      <div className="customerForm">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Naam klant"
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
          placeholder="E-mail"
        />

        <input
          name="city"
          value={form.city}
          onChange={handleChange}
          placeholder="Plaats"
        />

        <button onClick={addCustomer}>
          ➕ Klant opslaan
        </button>
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
          </div>
        ))}
      </div>
    </section>
  );
}

export default Klanten;
