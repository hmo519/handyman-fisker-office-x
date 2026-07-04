import { useEffect, useState } from "react";
import Card from "../ui/Card";
import Button from "../ui/Button";

function CustomerProfile({ customer, onUpdateCustomer }) {
  const [editing, setEditing] = useState(false);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (customer) {
      setName(customer.name || "");
      setAddress(customer.address || "");
      setCity(customer.city || "");
      setPhone(customer.phone || "");
      setEmail(customer.email || "");
    }
  }, [customer]);

  if (!customer) {
    return (
      <Card title="👥 Klantdossier" subtitle="Selecteer een klant">
        <p>Nog geen klant geselecteerd.</p>
      </Card>
    );
  }

  function saveChanges() {
    onUpdateCustomer(customer.id, {
      name,
      address,
      city,
      phone,
      email,
    });

    setEditing(false);
  }

  return (
    <Card
      title={customer.name}
      subtitle={customer.status}
      actions={
        <Button type="secondary" onClick={() => setEditing(!editing)}>
          {editing ? "Annuleren" : "✏️ Klant bewerken"}
        </Button>
      }
    >
      {editing ? (
        <>
          <input
            placeholder="Naam"
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

          <Button type="success" onClick={saveChanges}>
            💾 Opslaan
          </Button>
        </>
      ) : (
        <>
          <p>
            <strong>Adres:</strong>
            <br />
            {customer.address || "-"}
          </p>

          <p>
            <strong>Plaats:</strong>
            <br />
            {customer.city || "-"}
          </p>

          <p>
            <strong>Telefoon:</strong>
            <br />
            {customer.phone || "-"}
          </p>

          <p>
            <strong>Email:</strong>
            <br />
            {customer.email || "-"}
          </p>

          <p>
            <strong>Aangemaakt:</strong>
            <br />
            {customer.createdAt || "-"}
          </p>
        </>
      )}
    </Card>
  );
}

export default CustomerProfile;
