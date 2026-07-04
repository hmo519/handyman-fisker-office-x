import { useState } from "react";
import Card from "../ui/Card";
import Button from "../ui/Button";

function CustomerNotes({ customer, onAddNote }) {
  const [note, setNote] = useState("");

  if (!customer) {
    return (
      <Card title="📝 Notities" subtitle="Selecteer een klant">
        <p>Geen klant geselecteerd.</p>
      </Card>
    );
  }

  function handleAddNote() {
    if (!note.trim()) return;

    onAddNote(customer.id, note);
    setNote("");
  }

  return (
    <Card title="📝 Notities" subtitle="Klanthistorie en afspraken">
      <div className="noteInput">
        <input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Nieuwe notitie..."
        />

        <Button type="primary" onClick={handleAddNote}>
          Toevoegen
        </Button>
      </div>

      {(customer.notes || []).length === 0 ? (
        <p className="empty">Nog geen notities.</p>
      ) : (
        (customer.notes || []).map((item) => (
          <div className="noteItem" key={item.id}>
            <strong>{item.date}</strong>
            <p>{item.text}</p>
          </div>
        ))
      )}
    </Card>
  );
}

export default CustomerNotes;
