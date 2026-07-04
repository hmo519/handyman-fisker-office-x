import { useState } from "react";
import CustomerDetail from "../components/crm/CustomerDetail";

import {
  getAllCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
  addCustomerNote,
  addCustomerTask,
  toggleCustomerTask,
  addCustomerContact,
} from "../services/customerService";

function Klanten() {
  const [customers, setCustomers] = useState(getAllCustomers());
  const [selectedCustomerId, setSelectedCustomerId] = useState(
    customers.length ? customers[0].id : null
  );

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const selectedCustomer = customers.find(
    (customer) => customer.id === selectedCustomerId
  );

  function refreshCustomers() {
    setCustomers(getAllCustomers());
  }

  function handleAddCustomer() {
    if (!name.trim()) return;

    const updated = addCustomer({
      name,
      city,
      address,
      phone,
      email,
      status: "Lead",
    });

    setCustomers(updated);
    setSelectedCustomerId(updated[updated.length - 1].id);

    setName("");
    setCity("");
    setAddress("");
    setPhone("");
    setEmail("");
  }

  function handleUpdateCustomer(customerId, updates) {
    const updated = updateCustomer(customerId, updates);
    setCustomers(updated);
  }

  function handleDeleteCustomer(customerId) {
    const updated = deleteCustomer(customerId);
    setCustomers(updated);

    if (updated.length > 0) {
      setSelectedCustomerId(updated[0].id);
    } else {
      setSelectedCustomerId(null);
    }
  }

  function handleAddNote(customerId, text) {
    addCustomerNote(customerId, text);
    refreshCustomers();
  }

  function handleAddTask(customerId, text) {
    addCustomerTask(customerId, text);
    refreshCustomers();
  }

  function handleToggleTask(customerId, taskId) {
    toggleCustomerTask(customerId, taskId);
    refreshCustomers();
  }

  function handleAddContact(customerId, contactData) {
    addCustomerContact(customerId, contactData);
    refreshCustomers();
  }

  return (
    <section className="panel">
      <div className="pageHeader">
        <div>
          <h2>👥 CRM Suite Pro</h2>
          <p className="empty">360° klantbeheer</p>
        </div>
      </div>

      <div className="customerForm">
        <input
          placeholder="Klantnaam"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Adres"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <input
          placeholder="Plaats"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <input
          placeholder="Telefoon"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={handleAddCustomer}>➕ Klant toevoegen</button>
      </div>

      <div className="crmLayout">
        <div className="customerList">
          {customers.length === 0 ? (
            <p className="empty">Nog geen klanten aanwezig.</p>
          ) : (
            customers.map((customer) => (
              <div
                key={customer.id}
                className={`customerCard ${
                  selectedCustomerId === customer.id ? "active" : ""
                }`}
                onClick={() => setSelectedCustomerId(customer.id)}
              >
                <strong>{customer.name}</strong>
                <p>{customer.city}</p>
                <small>{customer.status}</small>
              </div>
            ))
          )}
        </div>

        <CustomerDetail
          customer={selectedCustomer}
          onUpdateCustomer={handleUpdateCustomer}
          onDeleteCustomer={handleDeleteCustomer}
          onAddNote={handleAddNote}
          onAddTask={handleAddTask}
          onToggleTask={handleToggleTask}
          onAddContact={handleAddContact}
        />
      </div>
    </section>
  );
}

export default Klanten;
