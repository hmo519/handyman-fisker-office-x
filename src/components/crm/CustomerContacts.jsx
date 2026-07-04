import { useState } from "react";
import Card from "../ui/Card";
import Button from "../ui/Button";

function CustomerContacts({ customer, onAddContact }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  if (!customer) {
    return (
      <Card title="📇 Contactpersonen" subtitle="Selecteer een klant">
        <p>Geen klant geselecteerd.</p>
      </Card>
    );
  }

  function handleAdd() {
    if (!name.trim()) return;

    onAddContact(customer.id, {
      name,
      phone,
      email,
    });

    setName("");
    setPhone("");
    setEmail("");
  }

  return (
    <Card
      title="📇 Contactpersonen"
      subtitle="Contacten binnen dit bedrijf"
    >
      <input
        placeholder="Naam"
        value={name}
        onChange={(e) => setName(e.target.value)}
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

      <Button type="primary" onClick={handleAdd}>
        Contact toevoegen
      </Button>

      {(customer.contacts || []).length === 0 ? (
        <p className="empty">Nog geen contactpersonen.</p>
      ) : (
        customer.contacts.map((contact) => (
          <div className="noteItem" key={contact.id}>
            <strong>{contact.name}</strong>

            <p>📞 {contact.phone || "-"}</p>

            <p>✉️ {contact.email || "-"}</p>
          </div>
        ))
      )}
    </Card>
  );
}

export default CustomerContacts;
