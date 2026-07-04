import Card from "../ui/Card";
import { getProjects } from "../../services/storage";
import { getInvoices } from "../../services/storage";

function CustomerFinance({ customer }) {
  if (!customer) {
    return (
      <Card title="💰 Klantwaarde" subtitle="Selecteer een klant">
        <p>Geen klant geselecteerd.</p>
      </Card>
    );
  }

  const projects = getProjects().filter(
    (project) => project.customerId === customer.id
  );

  const invoices = getInvoices().filter((invoice) =>
    projects.some((project) => project.id === invoice.projectId)
  );

  const revenue = invoices.reduce(
    (sum, invoice) => sum + (invoice.total || 0),
    0
  );

  return (
    <Card title="💰 Klantwaarde" subtitle="Projecten, facturen en omzet">
      <p>📂 Projecten: {projects.length}</p>
      <p>🧾 Facturen: {invoices.length}</p>
      <p>
        <strong>💰 Totale omzet: €{revenue.toFixed(2)}</strong>
      </p>

      {projects.length === 0 ? (
        <p className="empty">Geen projecten gekoppeld.</p>
      ) : (
        projects.map((project) => (
          <div className="noteItem" key={project.id}>
            <strong>{project.title}</strong>
            <p>Status: {project.status}</p>
          </div>
        ))
      )}
    </Card>
  );
}

export default CustomerFinance;
