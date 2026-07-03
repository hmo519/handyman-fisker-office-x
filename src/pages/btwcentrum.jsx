import Card from "../components/ui/Card";
import StatCard from "../components/ui/StatCard";
import { getVatByQuarter } from "../services/vatService";

function BtwCentrum() {
  const quarters = getVatByQuarter();

  return (
    <section className="panel">
      <div className="pageHeader">
        <div>
          <h2>🧾 BTW Centrum</h2>
          <p className="empty">BTW-overzicht per kwartaal</p>
        </div>
      </div>

      <div className="stats">
        {quarters.map((item) => (
          <StatCard
            key={item.quarter}
            icon="🧾"
            title={`Q${item.quarter} ${item.year}`}
            value={`€${item.vat.toFixed(2)}`}
            subtitle={item.status}
          />
        ))}
      </div>

      <div className="crmLayout">
        {quarters.map((item) => (
          <Card
            key={item.quarter}
            title={`Q${item.quarter} ${item.year}`}
            subtitle="BTW aangifte overzicht"
          >
            <p>Omzet excl. BTW: €{item.subtotal.toFixed(2)}</p>
            <p>BTW ontvangen: €{item.vat.toFixed(2)}</p>
            <p>Omzet incl. BTW: €{item.total.toFixed(2)}</p>
            <p>Aantal facturen: {item.invoices.length}</p>
            <p>Status: {item.status}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default BtwCentrum;
